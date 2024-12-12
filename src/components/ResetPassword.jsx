import { useState } from "react";
import ResetPass from "../assets/ResetPass.png";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [isReset, setIsReset] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsReset(true);

    // Reset errors
    setPasswordError("");
    setConfirmPasswordError("");

    // Validasi input
    let isValid = true;

    if (password.trim() === "") {
      setPasswordError("Password cannot be empty");
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
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 rounded-lg text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && (
                <div className="text-sm text-red-100">{passwordError}</div>
              )}
            </div>

            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full p-3 rounded-lg text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {confirmPasswordError && (
                <div className="text-sm text-red-100">
                  {confirmPasswordError}
                </div>
              )}
            </div>

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
