import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

export function middleware(request: NextRequest) {
  let token = request.cookies.get('login');
  if (token?.value === 'true') {
    if (request.nextUrl.pathname === '/signin') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }
  if (
    request.nextUrl.pathname === '/favoritos' ||
    request.nextUrl.pathname === '/profile' ||
    request.nextUrl.pathname === '/thanks'
  ) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }
  return NextResponse.next();
}
