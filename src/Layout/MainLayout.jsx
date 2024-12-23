import { Outlet } from "react-router-dom";
import Nav from "../Components/Nav/Nav";
import Footer from "../Components/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="max-w-[1600px] mx-auto">
      <div>
        <Nav />
      </div>
      <div>
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
