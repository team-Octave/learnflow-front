'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/shared/utils';
import { CheckIcon, CreditCardIcon } from 'lucide-react';
import { useState } from 'react';
import { loadTossPayments, ANONYMOUS } from '@tosspayments/tosspayments-sdk';

// 결제 페이지 - 박스
export default function PaymentBox() {
  const [paymentMethod, setPaymentMethod] = useState('tosspay');
  const [isAgree, setIsAgree] = useState<boolean>(false);

  const handleClickPay = async () => {
    if (!isAgree) return;
    if (paymentMethod !== 'tosspay') return;

    const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;
    if (!clientKey) {
      console.error('Toss Client Key가 유효하지 않습니다.');
      return;
    }
    const amount = 9900;
    const orderId =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `order_${Date.now()}`;
    const orderName = '프리미엄 멤버십 월간 구독';
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const successUrl = `${origin}/payments/success`;
    const failUrl = `${origin}/payments/fail`;

    try {
      const tossPayments = await loadTossPayments(clientKey);

      // TODO: customerKey userId로 변경
      const payment = tossPayments.payment({ customerKey: ANONYMOUS });

      await payment.requestPayment({
        method: 'CARD',
        amount: {
          value: amount,
          currency: 'KRW',
        },
        orderId,
        orderName,
        successUrl,
        failUrl,

        card: {
          flowMode: 'DIRECT',
          easyPay: 'TOSSPAY',
        },
      });
    } catch (err) {
      console.error('결제창 호출 실패:', err);
    }
  };

  return (
    <section className="flex flex-col border border-zinc-700 bg-zinc-900 rounded-2xl min-w-130">
      <div className="flex flex-col p-8 gap-4 items-center bg-zinc-800/50 border-b border-b-zinc-700 rounded-t-2xl">
        <div className="w-16 h-16 flex justify-center items-center bg-primary/20 rounded-2xl">
          <CreditCardIcon size={32} className="text-primary" />
        </div>
        <div className="flex flex-col gap-2 items-center">
          <h1 className="text-white font-bold text-2xl">
            프리미엄 멤버십 구독
          </h1>
          <span className="text-zinc-400">
            월 9,900원으로 모든 강의를 무제한 수강하세요
          </span>
        </div>
      </div>
      <div className="flex flex-col p-8 gap-8">
        <div className="flex flex-col p-6 gap-3 bg-zinc-800/50 rounded-xl border border-zinc-700">
          <div className="flex w-full justify-between">
            <span className="font-semibold text-white">상품 정보</span>
            <Badge className="border-primary text-primary bg-primary/20">
              월간 구독
            </Badge>
          </div>
          <div className="flex w-full justify-between mt-3 font-light text-zinc-100">
            <span>강의 무제한 수강</span>
            <span>포함</span>
          </div>
          <Separator />
          <div className="flex w-full justify-between">
            <span className="font-light text-zinc-100">결제 금액</span>
            <span className="font-bold text-xl">9,900원/월</span>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="text-lg font-bold">결제 수단</h4>
          <Label
            htmlFor="tosspay"
            className="flex justify-between w-full p-4 bg-primary/15 border border-primary rounded-xl cursor-pointer"
          >
            <div className="flex gap-4 items-center">
              <div className="flex justify-center items-center bg-primary rounded-full w-5 h-5">
                <div className="flex w-2.5 h-2.5 bg-white rounded-full" />
              </div>
              <input
                type="radio"
                id="tosspay"
                name="payment"
                value="tosspay"
                className="sr-only"
                onChange={(e) => setPaymentMethod(e.target.value)}
                defaultChecked
              />
              <span className="text-base">토스페이</span>
            </div>
            <Badge className="bg-zinc-700 text-white">간편결제</Badge>
          </Label>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="text-lg font-bold">결제 정보</h4>
          <div className="flex flex-col gap-3">
            <div className="flex w-full justify-between font-light text-zinc-300">
              <span>할부</span>
              <span>일시불</span>
            </div>
            <div className="flex w-full justify-between font-light text-zinc-300">
              <span>총 상품 금액</span>
              <span>9,900원</span>
            </div>
            <Separator />
            <div className="flex w-full justify-between">
              <span className="font-semibold text-base">최종 결제 금액</span>
              <span className="font-bold text-2xl text-primary">9,900원</span>
            </div>
          </div>
        </div>
        <Label
          htmlFor="pay-agreement"
          className="flex items-start p-4 gap-3 rounded-xl bg-zinc-800/70 cursor-pointer"
        >
          <input
            type="checkbox"
            className="sr-only"
            id="pay-agreement"
            checked={isAgree}
            onChange={(e) => setIsAgree(e.target.checked)}
          />
          <div
            className={cn(
              'flex justify-center items-center w-5 h-5 rounded-md ',
              'transition-all duration-100',
              isAgree ? 'bg-primary' : 'bg-zinc-800 border border-white',
            )}
          >
            {isAgree && <CheckIcon size={14} strokeWidth={3} />}
          </div>
          <div className="flex flex-col gap-1 text-sm ">
            <span>멤버십 구독권 결제에 동의합니다.</span>
            <span className="text-light text-zinc-400">
              기간 만료 시 자동으로 해지됩니다.
            </span>
          </div>
        </Label>
        <Button
          className="h-15 text-white font-bold text-lg cursor-pointer"
          onClick={handleClickPay}
          disabled={!isAgree}
        >
          멤버십 결제하기
        </Button>
      </div>
    </section>
  );
}
