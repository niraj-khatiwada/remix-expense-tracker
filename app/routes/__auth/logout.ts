import { ActionFunction, redirect } from "@remix-run/node";
import { createJWTCookie } from "~/utils/auth.server";

export const action: ActionFunction = async ({ request }) => {
  if (request.method !== "POST") {
    throw new Error("Invalid action method.");
  }
  const jwtCookie = createJWTCookie({ maxAge: 0 });
  return redirect("/auth", {
    headers: [["Set-Cookie", await jwtCookie.serialize("")]],
  });
};
