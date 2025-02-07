import NavLinks from "./components/nav/NavLinks";
import { Outlet, useLocation } from "react-router-dom";


const App = () => {
  const location = useLocation();

  // Check if the current path is '/dashboard'
  const hideNav = location.pathname === "/dashboard";

  return (
    <>
      {!hideNav && <NavLinks />}
      <Outlet />
    </>
  );
};

export default App;
