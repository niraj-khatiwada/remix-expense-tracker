import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { z } from "zod";
import crypto from "crypto";
import jwt from "jsonwebtoken";

import db from "~/db/index.server";
import { createJWTCookie, getAuthenticationStatus } from "~/utils/auth.server";
import { ActionData } from "~/types/action-data";

function Auth() {
  const actionData = useActionData<ActionData<null>>();

  return (
    <div>
      <Form method="post">
        {actionData?.message?.length ? (
          <p className={`bg-${actionData?.success ? "teal" : "red"}-400 p-2`}>
            {actionData?.message}
          </p>
        ) : null}
        <section className="my-2">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            id="email"
            type="email"
            required
            className="block border-2"
          />
        </section>
        <section className="my-2">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="block border-2"
          />
        </section>
        <button
          type="submit"
          className="bg-teal-500 rounded-sm px-4 py-2 text-white"
        >
          Login
        </button>
      </Form>
    </div>
  );
}

export const loader: LoaderFunction = async ({ request }) => {
  const { isAuthenticated } = await getAuthenticationStatus(
    request.headers.get("Cookie") as string
  );
  if (isAuthenticated) {
    return redirect("/");
  }
  return null;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const formPayload = Object.fromEntries(formData);

  const validation = z
    .object({
      email: z.string().email(),
      password: z.string(),
    })
    .safeParse(formPayload);

  if (!validation.success) {
    return {
      success: false,
      message: validation.error.message,
    };
  }

  const { email, password } = validation.data;

  const userExistsResult = await db.query(
    `SELECT * FROM "user" WHERE "email" = '${email}' LIMIT 1;`
  );
  const userExists = userExistsResult?.rows?.[0];

  const hashedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  if (userExists) {
    // Login
    if (userExists?.password !== hashedPassword) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    const token = jwt.sign(
      {
        id: userExists?.id,
      },
      process.env.JWT_SECRET as string
    );

    const jwtCookie = createJWTCookie();

    return redirect("/expenses", {
      headers: [["Set-Cookie", await jwtCookie.serialize(token)]],
    });
  } else {
    // Register
    await db.query(
      `INSERT INTO "user"("email", "password", "createdAt") VALUES('${email}', '${hashedPassword}', NOW());`
    );
    return {
      success: true,
      message: "Your account is setup and ready to use. You can login now.",
    };
  }
};

export default Auth;
