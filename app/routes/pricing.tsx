import { MetaFunction } from "@remix-run/node";
import Layout from "~/components/Layout";

function PricingLayout() {
  return (
    <Layout>
      Pricing:
      <img src="/pricing.png" alt="pricing" width="1000" />
    </Layout>
  );
}

export const meta: MetaFunction = () => [
  { title: "Pricing" },
  { description: "Pricing page" },
];

export default PricingLayout;
