import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Layoutver2 = () => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};

export default Layoutver2;
