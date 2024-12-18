import { useState } from "react";
import { Link } from "react-router-dom";
import googleIcon from "../assets/google.png";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [emailError, setEmailError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [isSignUp, setIsSignUp] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSignUp(true);

    setEmailError("");
    setFirstNameError("");
    setPasswordError("");
    setConfirmPasswordError("");

    let isValid = true;

    if (firstName.trim() === "") {
      setFirstNameError("First name is required");
      isValid = false;
    }

    if (email.trim() === "" || !isValidEmail(email)) {
      setEmailError("Enter a valid email address");
      isValid = false;
    }

    if (password.trim() === "") {
      setPasswordError("Password cannot be empty");
      isValid = false;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    }

    if (!isValid) {
      setIsSignUp(false);
      return;
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen  bg-gray-100">
      <div className="bg-white rounded-lg shadow-xl w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-[85rem] h-[35rem] flex">
        {/* Left Section */}
        <div className="w-1/2 h-full bg-white rounded-l-lg flex flex-col justify-center items-center p-8 sm:p-16 lg:p-44">
          <h1 className="font-bold text-xl sm:text-2xl text-center mb-3">
            SIGN UP
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

            <div>
              <input
                type="text"
                placeholder="First Name"
                className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              {firstNameError && (
                <div className="text-sm text-red-600">{firstNameError}</div>
              )}
            </div>

            <input
              type="text"
              placeholder="Last Name (Optional)"
              className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <Visibility/>
                ) : (
                  <VisibilityOff/>
                )}
              </span>
              {passwordError && (
                <div className="text-sm text-red-600">{passwordError}</div>
              )}
            </div>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <Visibility/>
                ) : (
                  <VisibilityOff/>
                )}
              </span>
              {confirmPasswordError && (
                <div className="text-sm text-red-600">{confirmPasswordError}</div>
              )}
            </div>

            <button
              type="submit"
              className="w-full p-3 rounded-lg bg-[#738ffd] text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 mt-6"
              disabled={isSignUp}
            >
              {isSignUp ? "Signing Up..." : "SIGN UP"}
            </button>
          </form>

          <div className="w-full flex flex-col justify-center items-center max-w-sm space-y-6 mt-3">
            <div className="text-center text-sm text-gray-600">
              Or continue with
            </div>
            <div className="flex justify-center items-center">
              <button className="w-12 h-12 p-2 rounded-full bg-white hover:bg-gray-200 focus:ring-2 focus:ring-blue-500 font-semibold">
                <img
                  src={googleIcon}
                  alt="Google logo"
                  className="w-8 h-8 object-contain"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-1/2 bg-[#738FFD] rounded-r-lg rounded-l-[75px] h-full flex flex-col justify-center items-center p-8 sm:p-44">
          <div className="flex flex-col justify-center items-center text-white">
            <h1 className="font-extrabold text-3xl sm:text-4xl text-center mb-4 sm:mb-5">
              Welcome Back!
            </h1>
            <p className="font-semibold text-sm sm:text-lg text-center mb-10 sm:mb-20">
              Enter your personal details to use all of site features
            </p>
            <Link
              to="/sign-in" 
              className="w-full p-3 bg-[#F5F5F5] hover:bg-white focus:ring-2 focus:ring-white text-[#738FFD] font-semibold rounded-lg text-center"
            >
              SIGN IN
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;