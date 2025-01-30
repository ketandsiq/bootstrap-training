import NavLinks from "./components/nav/NavLinks";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <NavLinks />
      <Outlet />
    </>
  );
};
export default App;
