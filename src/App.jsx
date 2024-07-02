import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./Component/Login";
import Home from "./Component/Home";
import StoreContextProvider from "./context/StoreContext";
import Layout from "./Component/Layout";
import Inventory from "./Component/Inventory";
import PurchaseDetails from "./Component/Purchase";
import Sells from "./Component/Sell";
import SignUp from "./Component/Signup";
import Store from "./Component/Store";

function App() {
  return (
    <StoreContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Home />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/purchase-details" element={<PurchaseDetails />} />
            <Route path="/sells" element={<Sells />} />
            <Route path="/manage-store" element={<Store />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StoreContextProvider>
  );
}

const ProtectedRoute = ({ children }) => {
  const localStorageData = JSON.parse(localStorage.getItem("user"));
  return localStorageData ? children : <Navigate to="/login" />;
};

export default App;
