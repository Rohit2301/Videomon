import Header from "../header/header";
import Footer from "../footer/footer";
import Sidebar from "../sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      {/* <Footer />  */}
    </>
  );
};

export default Layout;
