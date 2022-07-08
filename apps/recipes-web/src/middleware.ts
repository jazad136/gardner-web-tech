import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { tokens } from "src/lib/constants";
import { isAuthValid } from "./lib/auth";

export const config = {
  matcher: ["/", "/recipe/:path*"],
  runtime: "experimental-edge",
};

export const middleware = async (request: NextRequest) => {
  const loginUrl = new URL("/login", request.url);
  try {
    const token = request.cookies.get(tokens.didToken);
    const isValid = await isAuthValid(request, token);

    if (!isValid) {
      await setCallback(request, request.nextUrl.pathname);
      await logout(request, token);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(loginUrl);
  }
};

const setCallback = async (request: NextRequest, pathname: string) => {
  await fetch(`${request.nextUrl.origin}/api/callback`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ callbackUrl: pathname }),
  });
};

const logout = async (request: NextRequest, token: string) => {
  await fetch(`${request.nextUrl.origin}/api/logout`, {
    headers: {
      authorization: token,
    },
  });
};
