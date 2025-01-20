import { NextResponse } from "next/server";
import { auth } from "./auth";

const protectedRoutes = ["/dashboard"];

export default async function middleware(req) {
  const session = await auth();
  const { pathname } = req.nextUrl;
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !session) {
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  }

  return NextResponse.next();
}
