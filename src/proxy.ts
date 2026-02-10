import { reissue } from '@/shared/api/reissue';
import { checkIsExpired, getUserRole } from '@/shared/utils';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 보호된 경로 정의
const PROTECTED_ROUTES = {
  ADMIN: ['/admin'],
  MEMBER: ['/mypage', '/mylearning', '/play', '/creator'],
};

// 로그인/회원가입 경로 정의
const AUTH_ROUTES = ['/login', '/signup'];

// 현재 경로가 보호된 경로인지 체크하는 함수
const checkIsProtectedRoute = (pathname: string) => {
  if (
    PROTECTED_ROUTES['ADMIN'].some((route) => pathname.startsWith(route)) ||
    PROTECTED_ROUTES['MEMBER'].some((route) => pathname.startsWith(route))
  ) {
    return true;
  } else {
    return false;
  }
};

// 현재 경로가 로그인/회원가입 경로인지 체크하는 함수
const checkIsAuthRoute = (pathname: string) => {
  if (AUTH_ROUTES.some((route) => pathname.startsWith(route))) {
    return true;
  } else {
    return false;
  }
};

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  let accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  // 토큰에서 User Role 가져옴
  const userRole = getUserRole(accessToken);

  // 현재 경로가 어떤 Role이 요구되는지 확인
  const found = Object.entries(PROTECTED_ROUTES).find(([role, routes]) =>
    routes.some((route) => pathname.startsWith(route)),
  );
  const requireRole = found ? found[0] : null;

  // 토큰 만료 체크 및 재발급
  if (refreshToken && checkIsExpired(accessToken)) {
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
      console.error('proxy:', error);

      // 갱신 실패 시 기존 쿠키 삭제 및 상태 초기화
      response.cookies.delete('accessToken');
      response.cookies.delete('refreshToken');
      accessToken = undefined;

      // 보호된 경로 접근 중이었다면 즉시 로그인 페이지로 리다이렉트
      if (checkIsProtectedRoute(pathname)) {
        const loginUrl = new URL('/login', request.url);
        const redirectResponse = NextResponse.redirect(loginUrl);
        redirectResponse.cookies.delete('accessToken');
        redirectResponse.cookies.delete('refreshToken');
        return redirectResponse;
      }
    }
  }

  // 권한이 없는 페이지에 접근하려고 하는경우 홈페이지로 리다이렉트
  if (requireRole !== null && requireRole !== userRole) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 이미 로그인된 유저가 로그인/회원가입 페이지에 접근하려는 경우
  if (
    checkIsAuthRoute(pathname) &&
    accessToken &&
    !checkIsExpired(accessToken)
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 토큰이 없거나 만료된 경우 리다이렉트
  if (
    checkIsProtectedRoute(pathname) &&
    (!accessToken || checkIsExpired(accessToken))
  ) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
