import { NextResponse } from 'next/server';

export function middleware(request) {
  // Check if the route is the protected playground
  if (request.nextUrl.pathname === '/dashboards/playground/protected') {
    // In a real application, you would validate the API key here
    // For now, we'll rely on client-side validation
    return NextResponse.next();
  }
}

export const config = {
  matcher: '/dashboards/playground/protected',
}; 