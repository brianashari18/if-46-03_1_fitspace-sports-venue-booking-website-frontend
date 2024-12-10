import { useState } from "react";
import ForgotPass from "../assets/ForgotPass.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isContinueDisabled, setIsContinueDisabled] = useState(true);
  const [isCancelDisabled, setIsCancelDisabled] = useState(false);

  // Fungsi untuk validasi email
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");

    // Validasi input
    let isValid = true;

    if (email.trim() === "" || !isValidEmail(email)) {
      setEmailError("Enter a valid email address");
      isValid = false;
    }

    if (!isValid) {
      setIsContinueDisabled(true);
      return;
    }

    // If validation is successful, enable Continue button
    setIsContinueDisabled(false);
  };

  const handleCancel = () => {
    // Reset email and errors when cancel is clicked
    setEmail("");
    setEmailError("");
    setIsCancelDisabled(true); // Disable Cancel until email is entered
    setIsContinueDisabled(true); // Disable Continue until email is entered
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-[#738FFD] rounded-lg shadow-xl w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-[85rem] h-[35rem] flex">
        {/* Left Section */}
        <div className="w-1/2 h-full flex flex-col justify-center items-center text-white p-8 sm:p-16 lg:p-32">
          <h1 className="font-extrabold text-xl sm:text-3xl text-center mb-10">
            FORGOT PASSWORD
          </h1>
          <p className="font-semibold text-sm sm:text-lg text-center sm:mb-16">
            Enter your email account to reset your password!
          </p>

          <form
            className="w-60 max-w-sm space-y-2 mb-2"
            onSubmit={handleSubmit}
          >
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 rounded-lg border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setIsContinueDisabled(e.target.value.trim() === ""); // Disable Continue if email is empty
                }}
              />
              {emailError && (
                <div className="text-sm text-red-600">{emailError}</div>
              )}
            </div>

            <button
              type="submit"
              className="w-full p-3 rounded-lg bg-[#E6FDA3] text-[#738ffd] font-semibold hover:bg-amber-100 focus:ring-2 focus:ring-amber-100 mt-6"
              disabled={isContinueDisabled}
            >
              Continue
            </button>

            <button
              type="button" // Changed to type="button" so it doesn't submit the form
              className="w-60 p-3 rounded-lg bg-[#E6FDA3] text-[#738ffd] font-semibold hover:bg-amber-100 focus:ring-2 focus:ring-amber-100 mt-6"
              disabled={isCancelDisabled} // Disabled until email is entered
              onClick={handleCancel} // Reset email and errors on cancel
            >
              Cancel
            </button>
          </form>
        </div>

        {/* Right Section */}
        <div className="bg-[#cad7fdb3] rounded-2xl flex justify-center items-center w-1/3 h-3/4 mx-auto my-auto">
          <img
            src={ForgotPass}
            alt="Forgot Password"
            className="w-96 h-96 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;