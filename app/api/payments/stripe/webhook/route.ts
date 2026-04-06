import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { orders } from '@/lib/db';
import { createAdminWhatsAppLink } from '@/lib/whatsapp';

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json({ error: 'Stripe webhook secret is not configured' }, { status: 500 });
  }

  const sig = request.headers.get('stripe-signature');
  if (!sig) {
    return NextResponse.json({ error: 'Missing Stripe signature header' }, { status: 400 });
  }

  const payload = await request.text();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2022-11-15' });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
  } catch (error: any) {
    return NextResponse.json({ error: `Webhook signature verification failed: ${error.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata as { orderId?: string } | null;
    const orderId = metadata?.orderId;

    if (orderId) {
      const order = orders.getById(orderId);
      if (order) {
        const updatedOrder = orders.update(orderId, {
          status: session.payment_status === 'paid' ? 'paid' : 'pending',
          paymentIntentId: session.payment_intent,
          paidAt: new Date().toISOString(),
          whatsappLink: createAdminWhatsAppLink({
            id: order.id,
            status: session.payment_status === 'paid' ? 'paid' : 'pending',
            customer: order.customer,
            totalCost: order.totalCost,
          }),
        });
        return NextResponse.json({ received: true, order: updatedOrder });
      }
    }
  }

  return NextResponse.json({ received: true });
}
