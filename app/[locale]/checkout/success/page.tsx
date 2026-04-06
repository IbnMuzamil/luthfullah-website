'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@/lib/navigation';
import { CheckCircle2, MessageCircle } from 'lucide-react';

type OrderStatus = {
  id: string;
  status?: string;
  paymentMethod?: string;
  whatsappLink?: string | null;
};

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const t = useTranslations('checkout');
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState<OrderStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) return;

    const fetchOrder = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/orders?id=${encodeURIComponent(orderId)}`);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data?.error || 'Failed to load order');
        }
        setOrder(data);
      } catch (err: any) {
        setError(err?.message || 'Failed to load order');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  return (
    <div className="min-h-screen bg-background pb-20 pt-24">
      <div className="container mx-auto px-4">
        <Card className="mx-auto max-w-2xl text-center">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">
              {t('successTitle')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 px-8 py-12">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <p className="text-base text-slate-600">{t('successMessage')}</p>
            {orderId ? (
              <p className="text-sm text-slate-500">
                {t('orderReference')} <span className="font-semibold">{orderId}</span>
              </p>
            ) : null}
            {loading ? (
              <p className="text-sm text-slate-500">Loading order status...</p>
            ) : order ? (
              <p className="text-sm text-slate-500">
                {t('paymentMethod')}: <span className="font-semibold">{order.paymentMethod || '—'}</span>
                <br />
                Status: <span className="font-semibold">{order.status || 'pending'}</span>
              </p>
            ) : error ? (
              <p className="text-sm text-red-600">{error}</p>
            ) : null}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  const link = order?.whatsappLink || null;
                  if (link) window.open(link, '_blank');
                }}
                disabled={!order?.whatsappLink}
                className="flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                {t('contactSupport')}
              </Button>
              <Button asChild className="px-8 py-4">
                <Link href="/">{t('returnHome')}</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
