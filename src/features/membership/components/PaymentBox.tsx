'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { cn, isMobileUA } from '@/shared/utils';
import { CheckIcon, CreditCardIcon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { loadTossPayments, ANONYMOUS } from '@tosspayments/tosspayments-sdk';
import { useRouter, useSearchParams } from 'next/navigation';
import { paymentConfirmAction } from '../actions';

const RETURN_PATH = '/payment';

export default function PaymentBox() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [paymentMethod, setPaymentMethod] = useState('tosspay');
  const [isAgree, setIsAgree] = useState<boolean>(false);
  const [isPaying, setIsPaying] = useState(false);

  const [failModal, setFailModal] = useState<{
    open: boolean;
    title: string;
    message: string;
  }>({
    open: false,
    title: '결제 실패',
    message: '',
  });

  const openFail = (message: string, title = '결제 실패') => {
    setFailModal({ open: true, title, message });
  };
  const closeFail = () => setFailModal((prev) => ({ ...prev, open: false }));

  const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;

  const amountValue = 9900;
  const orderName = '프리미엄 멤버십 월간 구독';

  const origin = useMemo(() => {
    if (typeof window === 'undefined') return '';
    return window.location.origin;
  }, []);

  const returnUrl = useMemo(() => `${origin}${RETURN_PATH}`, [origin]);

  // Redirect(모바일) 성공/실패 처리
  useEffect(() => {
    // 성공 시 쿼리
    const paymentKey = searchParams.get('paymentKey');
    const orderId = searchParams.get('orderId');
    const amount = searchParams.get('amount');

    // 실패 시 오류 쿼리
    const failCode = searchParams.get('code');
    const failMessage = searchParams.get('message');

    // 실패 시 모달만 띄우고 쿼리 제거
    if (failCode || failMessage) {
      openFail(
        failMessage ?? '결제에 실패했습니다. 다시 시도해주세요.',
        '결제 실패',
      );
      router.replace(RETURN_PATH);
      return;
    }

    // 성공 시 백엔드 승인 호출 → 성공이면 이동 / 실패면 모달
    if (paymentKey && orderId && amount) {
      (async () => {
        try {
          setIsPaying(true);

          const state = await paymentConfirmAction({
            paymentKey,
            orderId,
            amount: Number(amount),
          });

          if (!state.success) {
            openFail(
              state?.message ?? '결제 승인에 실패했습니다.',
              '승인 실패',
            );
            router.replace(RETURN_PATH);
            return;
          }

          // 승인 성공
          router.replace('/mypage/membership');
        } catch (e) {
          openFail('결제 승인 처리 중 오류가 발생했습니다.', '승인 오류');
          router.replace(RETURN_PATH);
        } finally {
          setIsPaying(false);
        }
      })();
    }
  }, [searchParams, router]);

  const handleClickPay = async () => {
    if (!isAgree) return;
    if (paymentMethod !== 'tosspay') return;

    if (!clientKey) {
      console.error('Toss Client Key가 유효하지 않습니다.');
      openFail('결제 설정이 올바르지 않습니다. 관리자에게 문의해주세요.');
      return;
    }

    const orderId =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `order_${Date.now()}`;

    try {
      setIsPaying(true);

      const tossPayments = await loadTossPayments(clientKey);
      const payment = tossPayments.payment({
        customerKey: ANONYMOUS,
      });

      // 모바일 처리
      if (isMobileUA()) {
        await payment.requestPayment({
          method: 'CARD',
          amount: { value: amountValue, currency: 'KRW' },
          orderId,
          orderName,
          successUrl: returnUrl,
          failUrl: returnUrl,
          card: {
            flowMode: 'DIRECT',
            easyPay: 'TOSSPAY',
          },
        });

        return;
      }

      // PC 처리
      const result: any = await payment.requestPayment({
        method: 'CARD',
        amount: { value: amountValue, currency: 'KRW' },
        orderId,
        orderName,
        windowTarget: 'iframe',
        card: {
          flowMode: 'DIRECT',
          easyPay: 'TOSSPAY',
        },
      });

      if (!result?.paymentKey) {
        openFail('결제가 완료되지 않았습니다. 다시 시도해주세요.');
        return;
      }

      // 결제 성공 시 백엔드 승인 호출
      const state = await paymentConfirmAction({
        paymentKey: result.paymentKey,
        orderId: result.orderId ?? orderId,
        amount:
          typeof result.amount?.value === 'number'
            ? result.amount.value
            : amountValue,
      });

      if (!state.success) {
        openFail(state.message ?? '결제 승인에 실패했습니다.', '승인 실패');
        return;
      }

      router.replace('/mypage/membership');
    } catch (err: any) {
      openFail(err?.message ?? '결제 진행에 실패했습니다.');
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <>
      {/* 실패 모달 */}
      <AlertDialog
        open={failModal.open}
        onOpenChange={(open) => !open && closeFail()}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{failModal.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {failModal.message || '결제에 실패했습니다. 다시 시도해주세요.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={closeFail}>확인</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
            disabled={!isAgree || isPaying}
          >
            {isPaying ? '결제 처리중...' : '멤버십 결제하기'}
          </Button>
        </div>
      </section>
    </>
  );
}
