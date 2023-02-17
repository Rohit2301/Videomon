import Header from "../header/header";
import Footer from "../footer/footer";
import Sidebar from "../sidebar";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const { asPath } = useRouter();
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const URL = `${origin}${asPath}`;
  return (
    <>
      <div>
        <Header />
      </div>
      <div className="relative flex">
        <div>{<Sidebar />}</div>
        <div className="w-96" />
        <div>{children}</div>
      </div>
    </>
  );
};

export default Layout;
