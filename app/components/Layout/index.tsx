import Nav from "../Nav";

type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Nav />
      <div className="p-4">{children}</div>
    </div>
  );
}

export default Layout;
