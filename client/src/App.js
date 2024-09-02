import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import ForgotPasssword from "./pages/Auth/ForgotPasssword";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/Users";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import Search from './pages/Search'
import Products from "./pages/Admin/Products";
import ProductUpdateForm from "./components/forms/ProductUpdateForm";
import CartPage from "./pages/CartPage";
import Queries from "./pages/Admin/Queries";
import ProductDetailsPage from "./pages/Admin/ProductDetailsPage";
import Checkout from "./pages/Checkout";
import FilterProducts from "./pages/FilterProducts";
import AllCategory from "./pages/AllCategory";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<Search/>}/>
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/products" element={<Products/>}/>
          <Route path="admin/update-product/:id" element={<ProductUpdateForm/>}/>
          <Route path="admin/queries" element={<Queries/>}/>
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPasssword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<CartPage/>} />
        <Route path="/product-detail/:id" element={<ProductDetailsPage/>}/>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/filter/:slug" element={<FilterProducts/>}/>
        <Route path="/allcategory" element={<AllCategory/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
