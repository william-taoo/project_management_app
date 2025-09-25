import { updateSession } from './supabase/middleware'
import { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    // Update user session
    const response = await updateSession(request)

    // Protect authenticated routes
    const protectedRoutes = ['/products', '/configuration', '/dashboard']
    const authRoutes = ['/auth/login', '/auth/signup']
    
    const { pathname } = request.nextUrl
    const isProtectedRoute = protectedRoutes.some(route => 
        pathname.startsWith(route)
    )
    const isAuthRoute = authRoutes.some(route => 
        pathname.startsWith(route)
    )

    // If accessing protected route, check authentication
    if (isProtectedRoute) {
        const sessionCookie = request.cookies.get('sb-access-token')
        if (!sessionCookie) {
        return Response.redirect(new URL('/auth/login', request.url))
        }
    }

    // If authenticated user tries to access auth routes, redirect to products
    if (isAuthRoute) {
        const sessionCookie = request.cookies.get('sb-access-token')
        if (sessionCookie) {
        return Response.redirect(new URL('/products', request.url))
        }
    }

    return response
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
