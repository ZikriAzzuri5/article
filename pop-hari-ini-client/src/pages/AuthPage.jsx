import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import toast from "react-hot-toast";
import { signIn, signUp } from "../services/api";
import { useNavigate } from "react-router-dom";

const loginSchema = yup.object().shape({
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const registerSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(isLogin ? loginSchema : registerSchema),
  });

  const handleLogin = async (data) => {
    try {
      const res = await signIn({
        email: data.email,
        password: data.password,
      });
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.user.role);
        toast.success("Login Successful");
        if (res.data.user.role === "Admin") {
          navigate("/articles");
        } else {
          navigate("/");
        }
      } else {
        toast.error("Login failed, please try again");
      }
    } catch (err) {
      toast.error("There was an error!");
      console.error("There was an error!", err);
    }
  };

  const handleRegister = async (data) => {
    try {
      await signUp({
        username: data.username,
        email: data.email,
        password: data.password,
      });
      toast.success("User created succesfully");
      navigate("/login");
    } catch (err) {
      toast.error("There was an error!");
      console.error("There was an error!", err);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
        {isLogin ? "Login" : "Register"}
      </h1>
      <form
        onSubmit={handleSubmit(isLogin ? handleLogin : handleRegister)}
        className="space-y-6"
      >
        {!isLogin && (
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Username
            </label>
            <input
              type="text"
              {...register("username")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>
        )}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Password
          </label>
          <input
            type="password"
            {...register("password")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300"
        >
          {isLogin ? "Login" : "Register"}
        </button>
      </form>
      <div className="mt-4 text-center">
        <button
          onClick={toggleAuthMode}
          className="text-blue-500 hover:text-blue-700 hover:underline font-semibold transition-colors duration-300 ease-in-out"
        >
          {isLogin
            ? "Don't have an account? Register here"
            : "Already have an account? Login here"}
        </button>
      </div>
    </div>
  );
};
