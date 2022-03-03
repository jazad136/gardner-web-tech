import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { Magic } from "@magic-sdk/admin";

const magic = new Magic(process.env.MAGIC_SECRET_KEY);

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  try {
    const pathname = req.nextUrl.pathname;
    if (
      pathname !== "/" &&
      pathname !== "/login" &&
      !pathname.startsWith("/recipe")
    ) {
      return NextResponse.next();
    }

    const didToken = req.cookies["did-token"];

    if (pathname === "/login") {
      if (!didToken) {
        return NextResponse.next();
      }
      const callbackResponse = await fetch("/api/callback");
      const callbackUrl = await callbackResponse.json();
      return NextResponse.redirect(callbackUrl);
    }

    if (!didToken) {
      await fetch(`${req.nextUrl.origin}/api/callback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ callbackUrl: pathname }),
      });
      await fetch(`${req.nextUrl.origin}/api/logout`);
      return NextResponse.redirect("/login");
    }

    try {
      magic.token.validate(didToken);
      return NextResponse.next();
    } catch {
      await fetch(`${req.nextUrl.origin}/api/callback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ callbackUrl: pathname }),
      });
      await fetch(`${req.nextUrl.origin}/api/logout`);
      return NextResponse.redirect("/login");
    }
  } catch {
    return NextResponse.redirect("/login");
  }
}
