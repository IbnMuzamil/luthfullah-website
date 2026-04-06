import { config } from './db';

interface OrderNotificationArgs {
  id: string;
  status: string;
  customer: { fullName: string; email: string; phone: string };
  totalCost: number;
}

export function createAdminWhatsAppLink(order: OrderNotificationArgs, adminPhone?: string) {
  const phone = adminPhone || config.get().contactInfo?.phone;
  if (!phone) {
    return null;
  }

  const normalized = phone.replace(/[^0-9]/g, '');
  const message = encodeURIComponent(
    `New order received!%0AOrder ID: ${order.id}%0ACustomer: ${order.customer.fullName}%0AEmail: ${order.customer.email}%0APhone: ${order.customer.phone}%0ATotal: $${order.totalCost.toLocaleString()}%0AStatus: ${order.status}`,
  );

  return `https://wa.me/${normalized}?text=${message}`;
}

export function createUserWhatsAppLink(orderId: string, adminPhone?: string) {
  const phone = adminPhone || config.get().contactInfo?.phone;
  if (!phone) {
    return null;
  }

  const normalized = phone.replace(/[^0-9]/g, '');
  const message = encodeURIComponent(
    `Hi, I have a question about my order ${orderId}. Can you help me?`,
  );

  return `https://wa.me/${normalized}?text=${message}`;
}
