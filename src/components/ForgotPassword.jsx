import { useState, createContext, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import ForgotPass from "../assets/ForgotPass.png";

// Membuat EmailContext
const EmailContext = createContext();

// Custom hook untuk menggunakan EmailContext
export const useEmail = () => useContext(EmailContext);

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isContinueDisabled, setIsContinueDisabled] = useState(true);  // Disabled Continue button by default
  const navigate = useNavigate();

  // Fungsi untuk validasi email
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Fungsi untuk menangani pengiriman form
  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailError(""); // Reset error

    // Validasi input email
    if (email.trim() === "") {
      setEmailError("Email cannot be empty.");
      setIsContinueDisabled(true); // Disable Continue if email is empty
      return;
    }

    if (!isValidEmail(email)) {
      setEmailError("Enter a valid email address.");
      setIsContinueDisabled(true); // Disable Continue if email is not valid
      return;
    }

    // Jika email valid, arahkan ke halaman verification-code
    navigate("/verification-code", { state: { email } });
  };

  // Fungsi untuk menangani aksi Cancel
  const handleCancel = () => {
    setEmail(""); // Reset email field
    setEmailError(""); // Clear any error messages
  };

  // Update Continue button disabled state based on email input
  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    setIsContinueDisabled(inputEmail.trim() === "" || !isValidEmail(inputEmail)); // Disable if email is invalid or empty
    setEmailError(""); // Reset error on input change
  };

  return (
    <EmailContext.Provider value={{ email, setEmail }}>
      {/* Menyediakan context */}
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
              className="w-60 max-w-sm space-y-4 mb-2"
              onSubmit={handleSubmit}
            >
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 rounded-lg border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={email}
                  onChange={handleEmailChange} // Update email value and validation on change
                />
                {emailError && (
                  <div className="text-sm text-white mt-2">{emailError}</div>
                )}
              </div>

              <div className="w-full flex flex-col space-y-2 mt-6">
                <button
                  type="submit"
                  className="w-full p-3 rounded-lg bg-[#E6FDA3] text-[#738ffd] font-semibold hover:bg-[#F2FA5A] transition flex justify-center items-center"
                  disabled={isContinueDisabled} // Disable Continue if email is empty or invalid
                >
                  Continue
                </button>

                <Link
                  to="/sign-in"
                  className="w-full p-3 rounded-lg bg-[#E6FDA3] text-[#738ffd] font-semibold hover:bg-[#F2FA5A] transition flex justify-center items-center"
                  onClick={handleCancel} // Reset form when Cancel is clicked
                >
                  Cancel
                </Link>
              </div>
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
    </EmailContext.Provider>
  );
};

export default ForgotPassword;