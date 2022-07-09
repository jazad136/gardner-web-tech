import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { tokens } from "src/lib/constants";
import { isAuthValid } from "./lib/auth";

export const config = {
  matcher: ["/", "/recipe/:path*"],
};

export const middleware = async (request: NextRequest) => {
  // return NextResponse.redirect(new URL("/maintenance", request.url));
  const logoutUrl = new URL("/logout", request.url);
  try {
    const token = request.cookies.get(tokens.didToken);
    const isValid = await isAuthValid(request, token);

    if (!isValid) {
      await setCallback(request, request.nextUrl.pathname);
      return NextResponse.redirect(logoutUrl);
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(logoutUrl);
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
