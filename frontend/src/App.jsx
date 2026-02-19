import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Buy from "./pages/Buy";
import Rent from "./pages/Rent";
import ProductDetailCard from "./pages/ProductDetailCard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import UserSync from "./components/UserSync";
import Loader from "./components/Loader";

import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard";
import Products from "./admin/Products";
import AddProduct from "./admin/AddProduct";
import EditProduct from "./admin/EditProduct";
import Orders from "./admin/Orders";
import RentedProducts from "./admin/RentedProducts";
import Payments from "./admin/Payments";

export default function App() {
  return (
    <>
      <Loader />
      <UserSync />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetailCard />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/sign-in/*" element={<SignInPage />} />
        <Route path="/sign-up/*" element={<SignUpPage />} />

        <Route path="/buy/:id" element={<ProtectedRoute><Buy /></ProtectedRoute>} />
        <Route path="/rent/:id" element={<ProtectedRoute><Rent /></ProtectedRoute>} />

        <Route path="/admin" element={<AdminProtectedRoute><AdminLayout /></AdminProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="products/edit/:id" element={<EditProduct />} />
          <Route path="orders" element={<Orders />} />
          <Route path="rented-products" element={<RentedProducts />} />
          <Route path="payments" element={<Payments />} />
        </Route>
      </Routes>
    </>
  );
}
