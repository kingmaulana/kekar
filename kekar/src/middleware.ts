import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { verifyWithJose } from "./helpers/jwt"

export async function middleware(request: NextRequest) {
    /*
        Logic auth: 
        1. Baca dari header authorization ✅
        2. pisahkan [type, token] ✅
        3. decoded token ✅
        4. next controller -> data encoded
    */

    const cookieStore = await cookies()
    const auth = cookieStore.get("authorization")

    if(request.nextUrl.pathname.startsWith("/api/wishlist")) {
        if (!auth) {
            return Response.json(
                {
                    message: "Please login please"
                },
                {
                    status: 401
                }
            )
        }
    
        const [type, token] = auth.value.split(" ")
        if (type !== "Bearer") {
            return Response.json(
                {
                    message: "Invalid token"
                },
                {
                    status: 401
                }
            )
        }
    
        const decoded = await verifyWithJose<{ _id: string, email: string }>(token)
        // console.log("🚀 ~ middleware ~ decoded:", decoded)
    
        // Clone the request headers and set a new header `x-hello-from-middleware1`
        const requestHeaders = new Headers(request.headers)
        requestHeaders.set('x-user-id', decoded._id)
        requestHeaders.set('x-user-email', decoded.email)
    
        // You can also set request headers in NextResponse.next
        const response = NextResponse.next({
            request: {
                // New request headers
                headers: requestHeaders,
            },
        })
    
        return response
    }

    if(request.nextUrl.pathname.startsWith("/wishlist")) {
        if (!auth) {
            return NextResponse.redirect(new URL("/login", request.url))
        }
    }
}

export const config = {
    matcher: ["/api/wishlist/:path*", "/wishlist"]
}