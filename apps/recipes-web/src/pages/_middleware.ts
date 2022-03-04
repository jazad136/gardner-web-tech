import { NextRequest, NextResponse } from "next/server";
import { Magic } from "@magic-sdk/admin";
import { tokens } from "src/lib/constants";

const magic = new Magic(process.env.MAGIC_SECRET_KEY);

export async function middleware(req: NextRequest) {
  try {
    const pathname = req.nextUrl.pathname;
    if (pathname !== "/" && !pathname.startsWith("/recipe")) {
      return NextResponse.next();
    }

    const didToken = req.cookies[tokens.didToken];

    if (!didToken) {
      logout(req, pathname);
      return NextResponse.redirect("/login");
    }

    try {
      magic.token.validate(didToken);
      return NextResponse.next();
    } catch {
      logout(req, pathname);
      return NextResponse.redirect("/login");
    }
  } catch {
    return NextResponse.redirect("/login");
  }
}

const setCallback = async (req: NextRequest, pathname: string) => {
  await fetch(`${req.nextUrl.origin}/api/callback`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ callbackUrl: pathname }),
  });
};

const logout = async (req: NextRequest, pathname: string) => {
  setCallback(req, pathname);
  await fetch(`${req.nextUrl.origin}/api/logout`);
};
