import Header from "../header/header";
import Footer from "../footer/footer";
import Sidebar from "../sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="relative flex">
        <div>{<Sidebar />}</div>
        <div className="w-96" />
        <div>{children}</div>
      </div>
    </>
  );
};

export default Layout;
