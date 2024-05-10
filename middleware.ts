import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/(.*)"]);
const isAuthRoute = createRouteMatcher(["/sign-in(.*)"]);

export default clerkMiddleware((auth, req) => {
  const serverAuth = auth();

  if (isProtectedRoute(req) && !isAuthRoute(req)) serverAuth.protect();

  if (serverAuth.userId && isAuthRoute(req)) {
    return NextResponse.redirect(req.nextUrl.origin);
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
