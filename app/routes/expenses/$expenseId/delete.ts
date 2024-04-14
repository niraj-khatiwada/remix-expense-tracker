import { ActionFunction, json, redirect } from "@remix-run/node";
import { z } from "zod";

import db from "~/db/index.server";
import { getAuthenticationStatus } from "~/utils/auth.server";

export const action: ActionFunction = async ({ params, request }) => {
  if (!(request.method === "DELETE")) {
    throw new Error("Invalid action method.");
  }

  const authStatus = await getAuthenticationStatus(
    request.headers.get("Cookie") as string
  );
  const { isAuthenticated } = authStatus;
  if (!isAuthenticated) {
    throw redirect("/auth");
  }
  const { userId } = authStatus;

  const paramsValidation = z
    .object({
      expenseId: z.coerce.number(),
    })
    .safeParse(params);

  if (!paramsValidation.success) {
    return {
      success: false,
      message: paramsValidation.error.message,
    };
  }

  const { expenseId } = paramsValidation.data;

  await db.query(
    `DELETE FROM expense WHERE id = ${expenseId} AND "userId" = ${userId}`
  );

  // return redirect("/expenses");

  // useFetcher
  return json({
    success: true,
    data: {
      id: expenseId,
    },
  });
};
