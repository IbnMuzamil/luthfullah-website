import { NextRequest, NextResponse } from 'next/server';
import { createHmac } from 'crypto';
import { orders } from '@/lib/db';
import { createAdminWhatsAppLink } from '@/lib/whatsapp';

export async function POST(request: NextRequest) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json({ error: 'Paystack secret key is not configured' }, { status: 500 });
  }

  const signature = request.headers.get('x-paystack-signature');
  const bodyText = await request.text();

  if (!signature) {
    return NextResponse.json({ error: 'Missing Paystack signature header' }, { status: 400 });
  }

  const hash = createHmac('sha512', secretKey).update(bodyText).digest('hex');
  if (hash !== signature) {
    return NextResponse.json({ error: 'Invalid Paystack signature' }, { status: 400 });
  }

  let payload: any;
  try {
    payload = JSON.parse(bodyText);
  } catch (error) {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const event = payload.event;
  const data = payload.data;

  if (event === 'charge.success' && data?.status === 'success') {
    const orderId = data?.metadata?.orderId;
    if (orderId) {
      const order = orders.getById(orderId);
      if (order) {
        const updatedOrder = orders.update(orderId, {
          status: 'paid',
          paymentIntentId: data?.reference,
          paidAt: new Date().toISOString(),
          whatsappLink: createAdminWhatsAppLink({
            id: order.id,
            status: 'paid',
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
