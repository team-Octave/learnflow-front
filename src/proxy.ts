import { reissue } from '@/shared/api/reissue';
import { checkIsExpired } from '@/shared/utils';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 보호된 경로 및 인증 관련 경로 정의
const PROTECTED_ROUTES = ['/creator', '/mypage', '/mylearning', '/play'];
const AUTH_ROUTES = ['/login', '/signup'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  let accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  // 1. 토큰 만료 체크 및 재발급
  if (checkIsExpired(accessToken) && refreshToken) {
    try {
      const body = await reissue(refreshToken);
      if (body) {
        response.cookies.set('accessToken', body.data.accessToken, {
          httpOnly: true,
          maxAge: 60 * 60,
          secure: true,
          sameSite: 'lax',
          path: '/',
        });
        accessToken = body.data.accessToken;
        response.cookies.set('refreshToken', body.data.refreshToken, {
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 7,
          secure: true,
          sameSite: 'lax',
          path: '/',
        });
      }
    } catch (error) {
      console.error('Proxy 토큰 갱신 실패:', error);

      // 갱신 실패 시 기존 쿠키 삭제 및 상태 초기화
      response.cookies.delete('accessToken');
      response.cookies.delete('refreshToken');
      accessToken = undefined;

      // 보호된 경로 접근 중이었다면 즉시 로그인 페이지로 리다이렉트
      if (PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
        const loginUrl = new URL('/login', request.url);
        const redirectResponse = NextResponse.redirect(loginUrl);
        redirectResponse.cookies.delete('accessToken');
        redirectResponse.cookies.delete('refreshToken');
        return redirectResponse;
      }
    }
  }

  // 2. 권한 가드
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route),
  );

  // 토큰이 없거나 만료된 경우 리다이렉트
  if (isProtectedRoute && (!accessToken || checkIsExpired(accessToken))) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 3. 이미 로그인된 유저가 로그인/회원가입 페이지에 접근하려는 경우
  if (
    AUTH_ROUTES.some((route) => pathname.startsWith(route)) &&
    accessToken &&
    !checkIsExpired(accessToken)
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
