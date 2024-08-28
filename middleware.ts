import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

export function middleware(request: NextRequest) {
  let token = request.cookies.get('token');
  if (token?.value) {
    NextResponse.json({cookie: true});
    if (request.nextUrl.pathname === '/signin') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL('/signin', request.url));
}

// export const config = {
//   matcher: '/about/:path*',
// };
