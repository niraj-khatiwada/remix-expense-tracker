import React from "react";

type ClientOnlyProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const [isClient, setIsClient] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (typeof document !== "undefined") {
      setIsClient(true);
    }
  }, []);

  return isClient ? children : fallback;
}

export default ClientOnly;
