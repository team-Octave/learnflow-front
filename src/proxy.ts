import { reissue } from '@/shared/api/reissue';
import { checkIsExpired } from '@/shared/utils';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PROTECTED_ROUTES = ['/creator', '/mypage', '/mylearning', '/play'];
const AUTH_ROUTES = ['/login', '/signup'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  let accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  // 1. 토큰 만료 체크 및 재발급 (이게 핵심!)
  if (checkIsExpired(accessToken) && refreshToken) {
    try {
      const newAccessToken = await reissue(refreshToken);
      if (newAccessToken) {
        response.cookies.set('accessToken', newAccessToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'lax',
          path: '/',
        });
        accessToken = newAccessToken;
      }
    } catch (error) {
      console.error('Proxy 토큰 갱신 실패:', error);
    }
  }

  // 2. 권한 가드 (기존 미들웨어 로직)
  const isProtectedRoute = ['/mypage', '/creator'].some((route) =>
    pathname.startsWith(route),
  );
  if (isProtectedRoute && !accessToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 3. 이미 로그인된 유저가 로그인창 가려는 경우
  if (pathname.startsWith('/login') && accessToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return response;
}

// 기존 matcher 설정은 그대로 유지하거나 더 정교하게 다듬습니다.
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
