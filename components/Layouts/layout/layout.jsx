import Header from "../header/header";
import Footer from "../footer/footer";
import Sidebar from "../sidebar";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const { asPath } = useRouter();
  const router = useRouter();
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
        <div
          className={`${
            URL === "http://localhost:3000/" || URL === "http://localhost:3000"
              ? "hidden"
              : "w-96"
          } ${router.asPath === "/" ? "hidden" : ""}`}
        />
        <div>{children}</div>
      </div>
    </>
  );
};

export default Layout;
