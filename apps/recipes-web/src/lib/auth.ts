import { type NextRequest } from "next/server";

export const isAuthValid = async (request: NextRequest, token: string) => {
  if ((token ?? "").length === 0) {
    return false;
  }
  const response = await fetch(`${request.nextUrl.origin}/api/validate`, {
    credentials: "same-origin",
    headers: {
      authorization: token,
    },
  });

  return response.ok;
};
