import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const code = request.cookies.get('tex_access_code')?.value;
  const validCode = process.env.TEX_ACCESS_CODE;

  const protectedPaths = ['/', '/dashboard'];

  if (protectedPaths.includes(request.nextUrl.pathname)) {
    if (code !== validCode) {
      return NextResponse.redirect(new URL('/auth', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard'],
};