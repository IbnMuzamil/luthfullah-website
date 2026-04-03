'use client';

import { useCart } from '@/hooks/use-cart';
import { useTranslations, useLocale } from 'next-intl';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { Link } from '@/lib/navigation';
import { ScrollArea } from '@/components/ui/scroll-area';

export function CartDrawer({ children }: { children?: React.ReactNode }) {
  const { items, removeItem, totalCost, totalItems } = useCart();
  const t = useTranslations('cart');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children || (
          <Button variant="ghost" size="icon" className="relative hover:bg-primary/5 hover:text-primary transition-colors">
            <ShoppingCart className="h-6 w-6" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center shadow-lg shadow-primary/20 animate-in zoom-in">
                {totalItems}
              </span>
            )}
          </Button>
        )}
      </SheetTrigger>
      <SheetContent side={isRtl ? 'left' : 'right'} className="w-full sm:max-w-md flex flex-col p-0 border-none shadow-2xl">
        <SheetHeader className="px-6 py-6 border-b border-slate-100">
          <SheetTitle className="flex items-center gap-3 text-2xl font-black text-brand-deep">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <ShoppingCart className="h-5 w-5 text-primary" />
            </div>
            {t('title')}
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-hidden bg-white">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center mb-6">
                <ShoppingCart className="h-10 w-10 text-slate-200" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{t('empty')}</h3>
              <p className="text-slate-500 max-w-[200px]">Select a project to start your legacy.</p>
            </div>
          ) : (
            <ScrollArea className="h-full px-6">
              <div className="py-6 flex flex-col gap-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-24 h-24 rounded-2xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-100 shadow-sm">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-bold text-slate-900 leading-tight group-hover:text-primary transition-colors">{item.title}</h4>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-slate-300 hover:text-red-500 transition-all p-1.5 hover:bg-red-50 rounded-lg"
                            aria-label={t('remove')}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-xs font-bold text-primary/60 uppercase tracking-wider mt-1">{item.location}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-black text-brand-deep text-lg">
                          ${typeof item.cost === 'number' ? item.cost.toLocaleString() : item.cost}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>

        {items.length > 0 && (
          <SheetFooter className="p-8 border-t border-slate-100 bg-slate-50/50 backdrop-blur-sm">
            <div className="w-full space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">{t('subtotal')}</p>
                  <p className="text-xs text-slate-400 font-medium">Platform fees and taxes may apply</p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-black text-brand-deep">
                    ${totalCost.toLocaleString()}
                  </span>
                </div>
              </div>
              <Button className="w-full py-8 text-xl font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all active:scale-95" asChild>
                <Link href="/checkout">
                  {t('checkout')}
                </Link>
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
