import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ResetPass from "../assets/ResetPass.png";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { forgotPassword, resetPassword } from "../services/auth-service.js";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [isReset, setIsReset] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsReset(true);

    setPasswordError("");
    setConfirmPasswordError("");

    let isValid = true;

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
      setIsReset(false);
      return;
    }

    const userData = {
      new_password: password,
      confirmation_password: confirmPassword,
    };

    try {
      await resetPassword(userData);
      navigate("/reset-success");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-[#738FFD] rounded-lg shadow-xl w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-[85rem] h-[35rem] flex">
        {/* Left Section */}
        <div className="w-1/2 h-full flex flex-col justify-center items-center text-white p-8 sm:p-16 lg:p-32">
          <h1 className="font-extrabold text-xl sm:text-3xl text-center mb-10">
            RESET PASSWORD
          </h1>
          <p className="font-semibold text-sm sm:text-lg text-center sm:mb-16">
            This password must be different than before!
          </p>

          <form
            className="w-60 max-w-sm space-y-2 mb-2"
            onSubmit={handleSubmit}
          >
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="flex-1 p-3 rounded-lg text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  isValidPassword(e.target.value);
                }}
              />
              <button
                type="button"
                className="absolute right-3 flex items-center justify-center h-full text-gray-600 hover:text-gray-800"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </button>
            </div>
            {passwordError && (
              <div className="text-sm text-red-100 mt-1">{passwordError}</div>
            )}

            <div className="relative flex items-center">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="flex-1 p-3 rounded-lg text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 flex items-center justify-center h-full text-gray-600 hover:text-gray-800"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
              </button>
            </div>
            {confirmPasswordError && (
              <div className="text-sm text-red-100 mt-1">
                {confirmPasswordError}
              </div>
            )}

            <button
              type="submit"
              className="w-full p-3 rounded-lg bg-[#E6FDA3] text-[#738ffd] font-semibold hover:bg-[#F2FA5A] transition mt-6"
              disabled={isReset}
            >
              Continue
            </button>
          </form>
        </div>

        {/* Right Section */}
        <div className="bg-[#cad7fdb3] rounded-2xl flex justify-center items-center w-1/3 h-3/4 mx-auto my-auto">
          <img
            src={ResetPass}
            alt="Reset Password"
            className="w-96 h-96 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
