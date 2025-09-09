import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import toast, { Toaster } from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);
  const [inputValue, setInputValue] = useState({ email: "", username: "", password: "" });

  
  useEffect(() => {
    if (cookies.token) navigate("/");
  }, [cookies, navigate]);

  const handleChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5001/api/auth/signup",
        inputValue,
        { withCredentials: true }
      );

      if (data.success) {
        toast.success(data.message);
        setTimeout(() => navigate("/login"), 1000);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Signup failed. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-cyan-400 to-blue-500 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-cyan-400 text-2xl font-bold mb-6 text-center">Signup Account</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={inputValue.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="border-b border-gray-400 p-2 text-lg outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-gray-600">Username</label>
            <input
              type="text"
              name="username"
              value={inputValue.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
              className="border-b border-gray-400 p-2 text-lg outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              value={inputValue.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="border-b border-gray-400 p-2 text-lg outline-none"
            />
          </div>
          <button className="bg-cyan-400 text-white py-2 rounded hover:bg-cyan-500 transition">
            Submit
          </button>
        </form>
        <p className="mt-4 text-gray-600 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-cyan-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default Signup;
