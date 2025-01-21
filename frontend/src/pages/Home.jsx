import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError } from "../utils";
import { ToastContainer } from "react-toastify";

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState("hey");
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };
  const fetchProduct = async () => {
    try {
      const url = "http://localhost:8080/product";
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      setProduct(result);
    } catch (err) {
      handleError(err);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="bg-black text-white ">
      <nav className="bg-slate-900 text-red-300 flex justify-between w-screen items-center px-4 h-12">
        <div className="flex gap-5 text-3xl">
          <h3>Home</h3>
          <h3>About</h3>
          <h3>Contact</h3>
        </div>
        <div className="flex gap-5">
          <h3> {loggedInUser}</h3> <h3 onClick={handleLogout}>LogOut</h3>
        </div>
      </nav>
      <div className="flex justify-center items-center flex-wrap gap-2 p-2">
        {product.map((item, index) => (
          <div key={index} className="card bg-slate-500 p-4 ">
            <p>name:{item.name}</p>
            <p>Price:{item.price}</p>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
