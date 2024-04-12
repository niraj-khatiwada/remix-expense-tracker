import { NavLink } from "@remix-run/react";

function Nav() {
  return (
    <div className="bg-black text-white p-3">
      <NavLink to="/" className="mx-2 text-teal-600">
        Home
      </NavLink>
      <NavLink to="/pricing" className="mx-2 text-teal-600">
        Pricing
      </NavLink>
    </div>
  );
}

export default Nav;
