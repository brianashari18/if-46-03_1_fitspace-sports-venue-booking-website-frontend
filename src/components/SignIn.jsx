import { useState } from "react";
import { Link } from "react-router-dom";
import googleIcon from "../assets/google.png";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [isSignIn, setIsSignIn] = useState(false);

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSignIn(true);

    setEmailError("");
    setPasswordError("");

    let isValid = true;

    if (email.trim() === "" || !isValidEmail(email)) {
      setEmailError("Enter a valid email address");
      isValid = false;
    }

    if (password.trim() === "") {
      setPasswordError("Password cannot be empty");
      isValid = false;
    }

    if (!isValid) {
      setIsSignIn(false);
      return;
    }

    //Fetch API (tunggu login sukses)
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="rounded-lg shadow-xl w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-[85rem] h-[35rem] flex">
        {/* Left Section */}
        <div className="w-1/2 bg-[#738FFD] rounded-l-lg rounded-r-[75px] h-full flex flex-col justify-center items-center p-8 sm:p-44">
          <div className="flex flex-col justify-center items-center text-white">
            <h1 className="font-extrabold text-3xl sm:text-4xl text-center mb-4 sm:mb-5">
              Hello, Friend!
            </h1>
            <p className="font-semibold text-sm sm:text-lg text-center mb-10 sm:mb-20">
              Register with your personal details to use all of the site
              features
            </p>

            <Link
              to="/sign-up" 
              className="w-full p-3 bg-[#F5F5F5] hover:bg-white focus:ring-2 focus:ring-white text-[#738FFD] font-semibold rounded-lg text-center"
            >
              SIGN UP
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-1/2 h-full bg-gray-100 rounded-r-lg flex flex-col justify-center items-center p-8 sm:p-16 lg:p-44">
          <h1 className="font-bold text-xl sm:text-2xl text-center mb-12">
            SIGN IN
          </h1>
          <form
            className="w-full max-w-sm space-y-2 mb-2"
            onSubmit={handleSubmit}
          >
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && (
                <div className="text-sm text-red-600">{emailError}</div>
              )}
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} 
                placeholder="Password"
                className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && (
                <div className="text-sm text-red-600">{passwordError}</div>
              )}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
              >
                {showPassword ? (
                  <Visibility /> 
                ) : (
                  <VisibilityOff /> 
                )}
              </button>
            </div>

            <div className="text-right">
              <Link
                to="/forgot-password" 
                className="text-black text-sm hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full p-3 rounded-lg bg-[#738ffd] text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 mt-6"
              disabled={isSignIn}
            >
              {isSignIn ? "Signing In..." : "SIGN IN"}
            </button>
          </form>

          <div className="w-full flex flex-col justify-center items-center max-w-sm space-y-6 mt-6">
            <div className="text-center text-sm text-gray-600">
              Or continue with
            </div>
            <div className="flex justify-center items-center">
              <button className="w-12 h-12 p-2 rounded-full bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:ring-blue-500 font-semibold">
                <img
                  src={googleIcon}
                  alt="Google logo"
                  className="w-8 h-8 object-contain"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;