import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicPaths = ["/auth/login", "/auth/register", "/"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const isPublicPath = publicPaths.some(
    (path) => request.nextUrl.pathname == path
  );

  if (!isPublicPath && !token) {
    const loginUrl = new URL(
      "/auth/login?error=Faça Login Novamente",
      request.url
    );
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|favicon.ico|api).*)"],
};
