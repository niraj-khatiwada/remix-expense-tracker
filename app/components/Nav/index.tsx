import { NavLink, useNavigation } from "@remix-run/react";

function Nav() {
  const { state } = useNavigation();
  return (
    <div className="bg-black text-white p-3">
      {state === "loading" ? <p>Loading...</p> : ""}
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
      <NavLink
        to="/expenses"
        className={({ isActive }) =>
          `mx-2 ${isActive ? "text-teal-600" : "text-white"}`
        }
      >
        My Expenses
      </NavLink>
    </div>
  );
}

export default Nav;
