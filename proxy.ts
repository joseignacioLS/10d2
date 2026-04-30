import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
    return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
    matcher: ["/profile", "/profile/:path"], // Apply middleware only to protected routes
};