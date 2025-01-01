import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import googleIcon from "../assets/google.png";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { registerUser } from "../services/auth-service.js";
import { getCurrent } from "../services/user-service.js";

const SignUp = ({ onLogin }) => {
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

  const [passwordCriteria, setPasswordCriteria] = useState({
    isMinLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialCharacter: false,
  });

  const navigate = useNavigate();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    const criteria = {
      isMinLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialCharacter: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    setPasswordCriteria(criteria);

    const errors = [];
    if (!criteria.isMinLength) errors.push("at least 8 characters");
    if (!criteria.hasUpperCase) errors.push("an uppercase letter");
    if (!criteria.hasLowerCase) errors.push("a lowercase letter");
    if (!criteria.hasNumber) errors.push("a number");
    if (!criteria.hasSpecialCharacter) errors.push("a special character");

    return {
      isValid: Object.values(criteria).every(Boolean),
      message:
        errors.length > 0 ? `Password must contain ${errors.join(", ")}.` : "",
    };
  };

  const resetErrors = () => {
    setEmailError("");
    setFirstNameError("");
    setPasswordError("");
    setConfirmPasswordError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSignUp(true);
    resetErrors();

    let isValid = true;

    if (firstName.trim() === "") {
      setFirstNameError("First name is required");
      isValid = false;
    }

    if (email.trim() === "" || !isValidEmail(email)) {
      setEmailError("Enter a valid email address");
      isValid = false;
    }

    const passwordValidation = isValidPassword(password);
    if (password.trim() === "") {
      setPasswordError("Password cannot be empty");
      isValid = false;
    } else if (!passwordValidation.isValid) {
      setPasswordError(passwordValidation.message);
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

    const userData = {
      email: email,
      first_name: firstName,
      last_name: lastName,
      password: password,
      confirmation_password: confirmPassword,
    };

    await handleRegister(userData);
  };

  const handleRegister = async (userData) => {
    try {
      console.log(userData);
      const result = await registerUser(userData);
      console.log("User registered successfully:", result);
      navigate("/sign-in"); // Redirect to the sign-in page on success
    } catch (error) {
      console.error(error.message);
      setEmailError(error.message || "An error occurred during registration.");
      setIsSignUp(false); // Re-enable the submit button
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BASE_URL}/auth/google/login`;
  };

  const handleGoogleCallback = async (searchParams) => {
    const token = searchParams.get("token");
    const expiredAt = searchParams.get("expired_at");

    if (token && expiredAt) {
      localStorage.setItem("token", token);
      localStorage.setItem("expired_at", expiredAt);
      try {
        const result = await getCurrent(token);
        const user = result.data;
        onLogin(user);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/home");
      } catch (error) {
        console.error("Sign-in error:", error);
      }
    } else {
      console.error("Missing token or expired_at in callback URL.");
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has("token") && searchParams.has("expired_at")) {
      handleGoogleCallback(searchParams);
    }
  }, [window.location.search]);

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

            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    isValidPassword(e.target.value);
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <Visibility/> : <VisibilityOff/>}
                </button>
              </div>
              {passwordError && (
                <div className="text-sm text-red-600">{passwordError}</div>
              )}
            </div>

            <div>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showConfirmPassword ? <Visibility/> : <VisibilityOff/>}
                </button>
              </div>
              {confirmPasswordError && (
                <div className="text-sm text-red-600">
                  {confirmPasswordError}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full p-3 rounded-lg bg-[#738ffd] text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 mt-6"
              disabled={isSignUp}
            >
              {isSignUp ? "SIGN UP" : "SIGN UP"}
            </button>
          </form>

          <div className="w-full flex flex-col justify-center items-center max-w-sm mt-3">
            <div className="text-center text-sm text-gray-600">
              Or continue with
            </div>
            <div className="flex justify-center items-center">
              <button
                onClick={handleGoogleLogin}
                className="w-12 h-12 p-2 rounded-full bg-white hover:bg-gray-200 focus:ring-2"
              >
                <img
                  src={googleIcon}
                  alt="Google logo"
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