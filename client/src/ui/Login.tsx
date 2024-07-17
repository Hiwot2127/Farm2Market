import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import Loading from "./Loading";
import Label from "./Label";

const Login = ({ setLogin }: { setLogin: any }) => {
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [isMerchant, setIsMerchant] = useState(true);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData(e.target);
      const { email, password }: any = Object.fromEntries(formData);

      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      let errorMessage;
      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "No user found with this email.";
          break;
        case "auth/wrong-password":
          errorMessage = "Incorrect password.";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email address.";
          break;
        case "auth/invalid-credential":
          errorMessage = "Email or Password not matched";
          break;
        default:
          errorMessage = "An error occurred. Please try again.";
      }
      console.log("Error", error);
      setErrMsg(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-600 to-blue-800">
      <div className="flex bg-white shadow-lg rounded-lg overflow-hidden w-11/12 max-w-4xl">
        <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/path/to/background-image.jpg')" }}>
          <div className="p-6 h-full flex flex-col justify-center bg-[#005B49]">
            <h1 className="text-white text-3xl font-bold">Farm2Table</h1>
          </div>
        </div>
        <div className="w-1/2 p-6">
          <h2 className="text-gray-700 text-2xl font-semibold mb-4">Login</h2>
          <div className="mb-4 flex justify-center">
            <div className="relative inline-flex">
              <button
                onClick={() => setIsMerchant(true)}
                className={`px-6 py-2 rounded-2 ${isMerchant ? "bg-[#005B49] text-white" : "bg-gray-200 text-gray-600"}`}
              >
                Merchant
              </button>
              <button
                onClick={() => setIsMerchant(false)}
                className={`px-6 py-2 rounded-2 ${!isMerchant ? "bg-[#005B49] text-white" : "bg-gray-200 text-gray-600"}`}
              >
                Farmer
              </button>
            </div>
          </div>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="text"
                name="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            {errMsg && (
              <p className="bg-white/90 text-red-600 text-center py-1 rounded-md tracking-wide font-semibold">
                {errMsg}
              </p>
            )}
            <button
              type="submit"
              className="w-full bg-[#005B49] text-white py-2 rounded-lg hover:bg-[#005B49]"
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </form>
          <p className="text-gray-600 text-sm mt-4">
            Don't have an account?{" "}
            <button
              onClick={() => setLogin(false)}
              className="text-blue-600"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
      {loading && <Loading />}
    </div>
  );
};

export default Login;
