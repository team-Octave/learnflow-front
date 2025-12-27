import { reissue } from '@/lib/reissue';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PROTECTED_ROUTES = ['/creator', '/mypage', '/mylearning', '/play'];
const AUTH_ROUTES = ['/login', '/signup'];

// 미들웨어는 URL 경로가 변동될 때마다 실행되어 유저 정보 검증
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. 현재 쿠키에서 토큰 추출
  let accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;
  let isReissued = false;

  // 2. 액세스 토큰이 없는데 리프레시 토큰은 있는 경우 (재발급 시도)
  if (!accessToken && refreshToken) {
    try {
      const newAccessToken = await reissue(refreshToken);
      if (newAccessToken) {
        accessToken = newAccessToken;
        isReissued = true;
      }
    } catch (error) {
      console.error('Middleware 토큰 재발급 실패:', error);
      // 재발급 실패 시 로그아웃 상태로 간주하고 아래 가드 로직으로 이동
    }
  }

  // 3. 보호된 경로 접근 시 체크
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route),
  );
  if (isProtectedRoute && !accessToken) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }

  // 4. 이미 로그인된 유저가 로그인/회원가입 페이지 접근 시 체크
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));
  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 5. 최종 응답 생성
  const response = NextResponse.next();

  // 6. 만약 재발급 받았다면 최종 응답에 쿠키 세팅
  if (isReissued && accessToken) {
    response.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60, // 1시간
    });
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.svg|.*\\.png|.*\\.jpg).*)',
  ],
};
