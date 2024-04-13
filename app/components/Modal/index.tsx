import React from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "@remix-run/react";

function Modal() {
  const navigate = useNavigate();
  const [clientOnly, setClientOnly] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setClientOnly(true);
    }
  }, []);

  return clientOnly
    ? ReactDOM.createPortal(
        <>
          <p className="absolute top-0 right-0 bg-teal-500">This is portal</p>
          <button
            className="block bg-teal-500 px-3 py-2"
            onClick={() => {
              navigate("/");
            }}
          >
            Go to Home
          </button>
        </>,
        document.getElementById("portal") as HTMLDivElement
      )
    : null;
}

export default Modal;
