import { NextRequest, NextResponse } from 'next/server';
import { orders } from '@/lib/db';
import { createAdminWhatsAppLink } from '@/lib/whatsapp';

export async function POST(request: NextRequest) {
  try {
    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json({ error: 'Paystack secret key is not configured' }, { status: 500 });
    }

    const body = await request.json();
  const { locale, customer, items, totalCost, returnUrl, cancelUrl, currency = 'USD' } = body;
    if (!locale || !customer || !items || !items.length || !totalCost || !returnUrl || !cancelUrl) {
      return NextResponse.json({ error: 'Missing required payment fields' }, { status: 400 });
    }

    const order = orders.create({
      locale,
      customer,
      items,
      totalCost,
      currency,
      paymentMethod: 'paystack',
      status: 'pending',
    });

    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: customer.email,
        amount: Math.max(100, Math.round((typeof totalCost === 'string' ? parseFloat(totalCost) : totalCost) * 100)),
        currency,
        callback_url: `${returnUrl}?orderId=${order.id}`,
        metadata: {
          orderId: order.id,
          locale,
        },
      }),
    });

    const data = await response.json();

    if (!data.status || !data.data?.authorization_url) {
      orders.update(order.id, {
        status: 'failed',
        error: data.message || 'Paystack initialization failed',
      });
      return NextResponse.json({ error: data.message || 'Paystack initialization failed' }, { status: 500 });
    }

    orders.update(order.id, {
      paymentSessionId: data.data.reference,
      paymentUrl: data.data.authorization_url,
      whatsappLink: createAdminWhatsAppLink({
        id: order.id,
        status: order.status,
        customer,
        totalCost,
      }),
    });

    return NextResponse.json({ url: data.data.authorization_url, orderId: order.id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to initialize Paystack' }, { status: 500 });
  }
}
