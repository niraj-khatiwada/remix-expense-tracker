import { LoaderFunction } from "@remix-run/node";
import { redirect, useParams } from "@remix-run/react";

function PageNotFound() {
  const params = useParams();
  const splatRoute = params?.["*"];

  return (
    <div>
      Page Not Found:
      <code className="block bg-gray-200 w-fit p-2">{splatRoute}</code>
    </div>
  );
}

export const loader: LoaderFunction = ({ params }) => {
  const splatRoute = params?.["*"];

  if (splatRoute === "youtube") {
    throw redirect("https://youtube.com");
  }

  return null;
};

export default PageNotFound;
