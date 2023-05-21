import { Route, Routes } from "react-router-dom";
import Signup from "./pages/signup/Signup";
import Login from "./pages/Login/Login";
import RequireUser from "./components/RequireUser";
import Home from "./components/Home/Home";
import Product from "./components/Product/Product";
import Category from "./components/Category/Category";
import AddProduct from "./components/Product/AddProduct";
import Entry from "./components/Navbar/Entry";

function App() {
  return (
    <>
      <Routes>
        <Route element={<RequireUser />}>
          <Route path="/home" element={<Home />}>
            <Route path="/home" element={<Entry />} />
            <Route path="/home/categories" element={<Category />} />
            <Route path="/home/products" element={<Product />} />
            <Route path="/home/addProduct" element={<AddProduct />} />
          </Route>
        </Route>

        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
