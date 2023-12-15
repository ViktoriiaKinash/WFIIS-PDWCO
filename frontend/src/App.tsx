import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import "./App.css";

import Products from "./screens/Products";
import Shops from "./screens/Shops";

import Header from "./components/Header";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header />}>
      <Route index path="products" element={<Products />} />
      <Route path="shops" element={<Shops />} />
    </Route>
  )
);

function App() {
  return (
    <div style={{ backgroundColor: "white", width: "100vw", height: "100vw" }}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
