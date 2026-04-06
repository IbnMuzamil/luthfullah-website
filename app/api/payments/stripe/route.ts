import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { orders } from '@/lib/db';
import { createAdminWhatsAppLink } from '@/lib/whatsapp';

export async function POST(request: NextRequest) {
  let order: any = null;

  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json({ error: 'Stripe secret key is not configured' }, { status: 500 });
    }

    const body = await request.json();
    const { locale, customer, items, totalCost, returnUrl, cancelUrl, currency = 'USD' } = body;

    if (!locale || !customer || !items || !items.length || !totalCost || !returnUrl || !cancelUrl) {
      return NextResponse.json({ error: 'Missing required payment fields' }, { status: 400 });
    }

    const stripeClient = new Stripe(secretKey, { apiVersion: '2022-11-15' });

    order = orders.create({
      locale,
      customer,
      items,
      totalCost,
      currency,
      paymentMethod: 'stripe',
      status: 'pending',
    });

    const lineItems = items.map((item: any) => ({
      price_data: {
        currency,
        product_data: {
          name: item.title,
          description: item.location,
        },
        unit_amount: Math.max(100, Math.round((typeof item.cost === 'string' ? parseFloat(item.cost) : item.cost) * 100)),
      },
      quantity: item.quantity || 1,
    }));

    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      customer_email: customer.email,
      metadata: {
        orderId: order.id,
        locale,
      },
      success_url: `${returnUrl}?orderId=${order.id}`,
      cancel_url: cancelUrl,
    });

    orders.update(order.id, {
      paymentSessionId: session.id,
      paymentUrl: session.url,
      whatsappLink: createAdminWhatsAppLink({
        id: order.id,
        status: order.status,
        customer,
        totalCost,
      }),
    });

    return NextResponse.json({ url: session.url, orderId: order.id });
  } catch (error: any) {
    if (order?.id) {
      try {
        orders.update(order.id, { status: 'failed', error: error.message || 'Failed to create Stripe session' });
      } catch {
        // ignore update failure
      }
    }
    return NextResponse.json({ error: error.message || 'Failed to create Stripe session' }, { status: 500 });
  }
}
