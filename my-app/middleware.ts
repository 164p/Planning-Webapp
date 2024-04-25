import { withAuth, NextRequestWithAuth } from 'next-auth/middleware'
import { NextResponse, type NextRequest } from "next/server";

export default withAuth(

    function middleware(request: NextRequestWithAuth) {
        if (request.nextUrl.pathname.startsWith("/admin")
            && request.nextauth.token?.role !== "admin") {
            return NextResponse.rewrite(
                new URL("/denied", request.url)
            )
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        },
        pages: {
            signIn: '/auth/signin',
        }
    },
)
 
export const config = {
    matcher: ['/about/:path*','/profile/:path*','/plan/:path*','/journey/:path*'],
}