import { useMemo } from "react";
import { NavLink, useNavigation, useMatches, Form } from "@remix-run/react";
import { AuthenticationStatus } from "~/types/auth";

function Nav() {
  const { state } = useNavigation();
  const matches = useMatches();

  const session = useMemo(() => {
    const data = matches?.find((match) => match?.id === "root")
      ?.data as AuthenticationStatus;
    return data;
  }, [matches]);

  return (
    <div className="bg-black text-white p-3 flex align-middle">
      {state === "loading" ? (
        <p className="absolute top-0, left-1/2">Loading...</p>
      ) : (
        ""
      )}
      <NavLink
        to="/"
        className={({ isActive }) =>
          `mx-2 ${isActive ? "text-teal-600" : "text-white"}`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/pricing"
        className={({ isActive }) =>
          `mx-2 ${isActive ? "text-teal-600" : "text-white"}`
        }
      >
        Pricing
      </NavLink>
      {session?.isAuthenticated ? (
        <NavLink
          to="/expenses"
          className={({ isActive }) =>
            `mx-2 ${isActive ? "text-teal-600" : "text-white"}`
          }
        >
          My Expenses
        </NavLink>
      ) : null}

      {!session?.isAuthenticated ? (
        <NavLink
          to="/auth"
          className={({ isActive }) =>
            `mx-2 ${
              isActive ? "text-teal-600" : "text-white"
            } block w-fit ml-auto`
          }
        >
          Login
        </NavLink>
      ) : (
        <Form
          method="post"
          action="/logout"
          className={`mx-2 text-red-400 block w-fit ml-auto`}
        >
          <button>Logout</button>
        </Form>
      )}
    </div>
  );
}

export default Nav;
