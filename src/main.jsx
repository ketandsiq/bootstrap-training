import "bootstrap/dist/css/bootstrap.min.css";
import "@progress/kendo-theme-default/dist/all.css";
import { createRoot } from "react-dom/client";
import { PersistGate } from "redux-persist/integration/react";
import Gallery from "./components/Gallery/Gallery";
import Login from "./components/Login/Login";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import { store, persistor } from "./components/store/config.js";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="login" element={<Login />} />
      <Route path="gallery" element={<Gallery />} />
    </Route>
  )
);

const root = createRoot(document.querySelector("#root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);
