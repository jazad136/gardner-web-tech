import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Magic } from "@magic-sdk/admin";
import { tokens } from "src/lib/constants";

const magic = new Magic(process.env.MAGIC_SECRET_KEY);
export const config = {
  matcher: ["/", "/recipe/:path*"],
};

export function middleware(request: NextRequest) {
  const loginUrl = new URL("/login", request.url);
  try {
    const pathname = request.nextUrl.pathname;
    const didToken = request.cookies.get(tokens.didToken);

    if (!didToken) {
      logout(request, pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      magic.token.validate(didToken);
      return NextResponse.next();
    } catch {
      logout(request, pathname);
      return NextResponse.redirect("/login");
    }
  } catch {
    return NextResponse.redirect(loginUrl);
  }
}

const setCallback = async (request: NextRequest, pathname: string) => {
  await fetch(`${request.nextUrl.origin}/api/callback`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ callbackUrl: pathname }),
  });
};

const logout = async (request: NextRequest, pathname: string) => {
  setCallback(request, pathname);
  await fetch(`${request.nextUrl.origin}/api/logout`);
};
