import { useState } from "react";
import { MdPhotoLibrary } from "react-icons/md";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../lib/firebase";
import upload from "../lib/upload";
import { doc, setDoc } from "firebase/firestore";
import Login from "./Login";

const Registration = () => {
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });
  const [isMerchant, setIsMerchant] = useState(true);

  const handleAvatar = (e: any) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleRegistration = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { fullName, phone, email, region, city, woreda, password, confirmPassword, productType }: any =
      Object.fromEntries(formData);

    if (password !== confirmPassword) {
      setErrMsg("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const res = await createUserWithEmailAndPassword(auth, email, password);
      let imageUrl = null;
      if (avatar && avatar?.file) {
        imageUrl = await upload(avatar?.file);
      }
      await setDoc(doc(db, "users", res.user.uid), {
        fullName,
        phone,
        email,
        region,
        city,
        woreda,
        avatar: imageUrl,
        id: res.user.uid,
        userType: isMerchant ? "Merchant" : "Farmer",
        productType,
      });
      setLogin(true);
    } catch (error: any) {
      let errorMessage;
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "Please enter a valid email.";
          break;
        case "auth/missing-password":
          errorMessage = "Please enter a password.";
          break;
        case "auth/email-already-in-use":
          errorMessage = "This email is already in use. Try another email.";
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
      {login ? (
        <Login setLogin={setLogin} />
      ) : (
        <div className="flex bg-white shadow-lg rounded-lg overflow-hidden w-11/12 max-w-4xl">
          <div className="w-1/2 bg-cover bg-center p-6 h-full flex flex-col justify-center bg-[#005B49]" style={{ backgroundImage: "url('/path/to/background-image.jpg')" }}>
            <h1 className="text-white text-3xl font-bold">Farm2Table</h1>
          </div>
          <div className="w-1/2 p-6">
            <h2 className="text-gray-700 text-2xl font-semibold mb-4">Register</h2>
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
            <form onSubmit={handleRegistration}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Phone</label>
                <input
                  type="text"
                  name="phone"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Region</label>
                <input
                  type="text"
                  name="region"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Woreda</label>
                <input
                  type="text"
                  name="woreda"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Confirm</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Product Type</label>
                <select
                  name="productType"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="">select</option>
                  <option value="Type1">Type1</option>
                  <option value="Type2">Type2</option>
                  <option value="Type3">Type3</option>
                </select>
              </div>
              <div className="col-span-full mb-4">
                <div className="mt-2 flex items-center gap-x-3">
                  <div className="flex-1">
                    <label className="block text-gray-700 mb-2">Avatar</label>
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-300 px-6 py-4">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-14 h-14 border border-gray-600 rounded-full p-1">
                          {avatar?.url ? (
                            <img
                              src={avatar?.url}
                              alt="userImage"
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <MdPhotoLibrary className="mx-auto h-full w-full text-gray-500" />
                          )}
                        </div>
                        <div className="mt-4 flex items-center mb-1 text-sm leading-6 text-gray-400">
                          <label htmlFor="file-upload">
                            <span className="relative cursor-pointer rounded-md px-2 py-1 bg-gray-900 font-semibold text-gray-200 hover:bg-gray-800">
                              Upload a file
                            </span>
                            <input
                              type="file"
                              name="file-upload"
                              id="file-upload"
                              className="sr-only"
                              onChange={handleAvatar}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-400">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {errMsg && (
                <p className="bg-red-100 text-red-600 text-center py-1 rounded-md tracking-wide font-semibold mb-4">
                  {errMsg}
                </p>
              )}
              <button
                disabled={loading}
                type="submit"
                className={`w-full py-2 uppercase text-base font-bold tracking-wide text-white rounded-md ${
                  loading ? "bg-gray-500" : "bg-[#005B49]"
                } hover:bg-[#004437] duration-200`}
              >
                {loading ? "Loading..." : "Sign Up"}
              </button>
            </form>
            <p className="text-sm leading-6 text-gray-400 text-center mt-4">
              Already have an account?{" "}
              <button
                onClick={() => setLogin(true)}
                className="text-[#005B49] font-semibold underline underline-offset-2 decoration-[1px] hover:text-[#004437] duration-200"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Registration;
