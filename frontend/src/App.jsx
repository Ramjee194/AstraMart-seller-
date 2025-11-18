import { Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home'
import Login from "./pages/Auth/Login";
import './index.css'


import VendorDashboard from "./pages/Vendor/VendorDashboard";
import Register from "./pages/Auth/Register";
import Payouts from "./pages/Vendor/Payouts";

import VendorProducts from "./pages/Vendor/VendorProducts";
import AddProduct from "./pages/Vendor/AddProduct";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Product/Products";
import Inventory from "./pages/Inventory/Inventory";
import Analytics from "./pages/Analytics/Analytics";
import Payments from "./pages/Payments/Payments";
import Performance from "./pages/Performance/Performance";
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Settings/Settings";
import Notifications from "./pages/Notifications/Notifications";
import Help from "./pages/Help/Help";
import Orders from "./pages/Orders/Orders";
import EditProduct from "./pages/Vendor/EditProduct";
import ProductDetails from "./pages/Product/ProductDetails";
import OrderDetails from "./pages/Orders/OrderDetails";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/products/add" element={<AddProduct />} />
        <Route path="/vendor/products" element={<Products />} />
        <Route path="/vendor/add-product" element={<EditProduct/>}/>
        <Route path="/products/:id" element={<ProductDetails/>}/>
        <Route path="/orders/:id" element={<OrderDetails/>}/>
        
        
        <Route path="/vendor/payouts" element={<Payouts />} />
        <Route path ='/navbar' element={<Navbar/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/orders" element ={<Orders/>}/>
        <Route path="/inventory" element={<Inventory/>}/>
        <Route path="/analytics" element={<Analytics/>}/>
        <Route path="/payments" element={<Payments/>}/>
        <Route path="/performance" element={<Performance/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/settings" element={<Settings/>}/>
        <Route path="/notifications" element={<Notifications/>}/>
        <Route path="/help" element ={<Help/>}/>
        <Route path="/products" element={<Products/>}/>
     


        <Route path="/vendor/dashboard" element={<VendorDashboard />} />
      </Routes>
    </>
  );
};

export default App;
