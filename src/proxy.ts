import { NextResponse, NextRequest } from 'next/server'
 
export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname

//   const isPublicPath = path === '/login' || path === '/signup'
  const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail' || path.startsWith('/login') || path.startsWith('/signup') || path.startsWith('/verifyemail')

  const token = request.cookies.get('token')?.value || ''

  if(isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }
}

export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signup',
    '/verifyemail',
  ]
}