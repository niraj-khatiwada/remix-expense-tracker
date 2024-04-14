import { createCookie, type CookieOptions } from "@remix-run/node";
import jwt from "jsonwebtoken";

import { AuthenticationStatus } from "~/types/auth";

const cookieDefaultOptions: CookieOptions = {
  httpOnly: true,
  maxAge: 3600,
  path: "/",
  sameSite: "lax",
  secure: true,
};

export function createJWTCookie(options: CookieOptions = {}) {
  return createCookie("access-token", {
    ...cookieDefaultOptions,
    ...(options ?? {}),
  });
}

export async function getAuthenticationStatus(
  cookie: string
): Promise<AuthenticationStatus> {
  const jwtCookie = createJWTCookie();
  const value: string = await jwtCookie.parse(cookie);

  if (!value) {
    return {
      isAuthenticated: false,
    };
  }
  const tokenPayload = jwt.verify(value, process.env.JWT_SECRET as string);
  if (!tokenPayload) {
    return {
      isAuthenticated: false,
    };
  }

  if (typeof tokenPayload === "string") {
    return {
      isAuthenticated: false,
    };
  }

  return {
    isAuthenticated: true,
    userId: tokenPayload?.id as number,
  };
}
