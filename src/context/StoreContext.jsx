import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

axios.defaults.withCredentials = true;

export const StoreContext = createContext(null);

const server = "http://localhost:4000/api/v1";

export const StoreContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [sellAmount, setSellAmount] = useState("");
  const [sellData, setSellData] = useState([]);
  const [purchaseAmount, setPurchaseAmount] = useState("");
  const [stores, setStores] = useState([]);
  const [products, setProducts] = useState([]);
  const [monthlySellsData, setMonthlySellsData] = useState([]);
  const [updatePage, setUpdatePage] = useState(true);
  const [showProductModal, setShowProductModal] = useState(false);
  const [purchaseData, setPurchaseData] = useState([]);

  const handleLogin = async () => {
    console.log("Starting login process");
    try {
      const response = await axios.post(`${server}/user/login`, {
        email,
        password,
      });
      const { user, accessToken, refreshToken } = response.data.data;

      // Logging for debugging
      console.log("User:", user);
      console.log("AccessToken:", accessToken);
      console.log("RefreshToken:", refreshToken);

      // Storing user data in local storage and cookies
      localStorage.setItem("user", JSON.stringify(user));
      Cookies.set("accessToken", accessToken, { expires: 7 });
      Cookies.set("refreshToken", refreshToken, { expires: 7 });

      // Setting state
      setUser(user);
      toast.success(response.data.message);
      // Navigate should be handled in the consuming component
    } catch (err) {
      toast.error(parseErrorMessage(err.response.data));
    }
  };

  const handleRegister = async () => {
    const formData = new FormData();
    formData.append("username", email.split("@")[0]); // Assuming username is part of the email
    formData.append("email", email);
    formData.append("password", password);
    formData.append("city", city);
    formData.append("avatar", avatar);
    formData.append("phone", phone);

    try {
      const response = await axios.post(`${server}/user/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      await handleLogin(email, password); // This should be called without additional parameters
      toast.success(response.data.message);
    } catch (err) {
      console.error("Registration error:", err);
      toast.error(parseErrorMessage(err.response.data));
    }
  };

  const handleLogout = async () => {
    let ans = window.confirm("Are you sure you want to logout?");
    if (ans) {
      try {
        const response = await axios.post(`${server}/user/logout`);
        localStorage.removeItem("user");
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        setUser(null);
        toast.success(response.data.message);
        window.location.reload();
      } catch (err) {
        console.error("Logout error:", err);
        toast.error(parseErrorMessage(err.response.data));
      }
    }
  };

  const fetchTotalSellAmount = async () => {
    try {
      const response = await axios.get(`${server}/sell/total`);
      setSellAmount(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchTotalPurchaseAmount = async () => {
    try {
      const response = await axios.get(`${server}/purchase/purchaseamount`);
      setPurchaseAmount(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPurchaseData = async () => {
    console.log("Cjece");
    try {
      const response = await axios.get(`${server}/purchase/`);
      setPurchaseData(response.data.data);
      console.log(purchaseData);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchStoresData = async () => {
    try {
      const response = await axios.get(`${server}/store/`);
      setStores(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchProductsData = async () => {
    try {
      const response = await axios.get(`${server}/product/`);
      setProducts(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMonthlySellsData = async () => {
    try {
      const response = await axios.get(`${server}/sell/monthlysell`);
      setMonthlySellsData(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSearchData = async (search) => {
    console.log(search);
    try {
      const response = await axios.get(
        `${server}/product/search?name=${search}`
      );
      console;
      setProducts(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`${server}/product/${id}`);
      fetchProductsData();
      toast.success("Product Deleted.");
    } catch (err) {
      console.log(err);
    }
  };

  const updateProfile = async (data) => {
    try {
      const response = await axios.patch(`${server}/user/update-account`, data);
      const { user } = response.data.data;

      console.log("User:", user);

      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      toast.success(response.data.message);
    } catch (err) {
      toast.error(parseErrorMessage(err.response.data));
    }
  };

  const updateAvatar = async (avatar) => {
    const formData = new FormData();
    formData.append("avatar", avatar);
    try {
      const response = await axios.patch(`${server}/user/avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const { user } = response.data.data;
      console.log("User:", user);

      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      toast.success("Avatar updated successfully");
    } catch (err) {
      toast.error(parseErrorMessage(err.response.data));
    }
  };

  const addProduct = async (product) => {
    try {
      const response = await axios.post(`${server}/product/add`, product);
      toast.success("Product Added.");
      handlePageUpdate();
      addProductModalSetting();
    } catch (err) {
      console.log(err);
    }
  };

  const handlePageUpdate = () => {
    setUpdatePage(!updatePage);
  };

  const addProductModalSetting = () => {
    setShowProductModal(!showProductModal);
  };

  const fetchSellData = async () => {
    try {
      const response = await axios.get(`${server}/sell/`);
      setSellData(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateProductDetails = async (product) => {
    console;
    try {
      const response = await axios.patch(
        `${server}/product/${product.productId}`,
        product
      );
      handlePageUpdate();
      toast.success("Product details updated.");
    } catch (err) {
      console.log(err);
    }
  };

  const deletePurchase = async (id) => {
    try {
      await axios.delete(`${server}/purchase/${id}`);
      fetchPurchaseData();
      toast.success("Purchase Deleted.");
      updatePage();
    } catch (err) {
      console.log(err);
    }
  };

  const updatePurchaseDetails = async (purchase) => {
    console.log(purchase);
    try {
      await axios.patch(`${server}/purchase/${purchase._id}`, purchase);
      fetchPurchaseData();
      toast.success("Purchase details updated.");
      updatePage();
    } catch (err) {
      console.log(err);
    }
  };

  const addPurchase = async (purchaseData) => {
    try {
      const response = await axios.post(`${server}/purchase/add`, purchaseData);
      toast.success("Purchase Added.");
      fetchPurchaseData(); // Refresh the data after adding a purchase
      updatePage();
    } catch (err) {
      console.log(err);
      toast.error("Failed to add purchase.");
    }
    
  };

  const contextValue = {
    handleLogin,
    email,
    setEmail,
    password,
    setPassword,
    handleRegister,
    handleLogout,
    sellAmount,
    sellData,
    products,
    stores,
    sellData,
    purchaseAmount,
    purchaseData,
    monthlySellsData,
    fetchMonthlySellsData,
    fetchProductsData,
    fetchStoresData,
    fetchPurchaseData,
    fetchTotalPurchaseAmount,
    fetchTotalSellAmount,
    fetchSearchData,
    deleteItem,
    fetchSellData,
    setUser,
    user,
    addProduct,
    updatePage,
    showProductModal,
    addProductModalSetting,
    updateProductDetails,
    deletePurchase,
    updatePurchaseDetails,
    addPurchase,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
