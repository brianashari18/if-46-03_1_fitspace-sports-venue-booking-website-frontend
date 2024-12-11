import { useLocation } from "react-router-dom";
import VerifCode from "../assets/VerifCode.png";

const VerificationCode = () => {
  const location = useLocation();
  console.log(location.state);
  const email = location.state?.email;

  const handleVerify = () => {
    // Logika verifikasi, misalnya, validasi input dan panggilan API
    console.log("Code verified");
  };

  const handleResendCode = () => {
    // Tambahkan logika untuk mengirim ulang kode, misalnya, panggilan API
    console.log("Resend code requested");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-[#738FFD] rounded-lg shadow-xl w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-[85rem] h-[35rem] flex">
        {/* Left Section */}
        <div className="w-1/2 h-full flex flex-col justify-center items-center text-white p-8 sm:p-16 lg:p-32">
          <h1 className="font-extrabold text-xl sm:text-3xl text-center mb-5">
            VERIFICATION CODE
          </h1>
          <p className="font-semibold text-sm sm:text-lg text-center sm:mb-20">
            We have sent your code to{" "}
            {email && <span className="text-black">{email}</span>}
          </p>

          <div className="flex justify-center gap-5 -mt-10 mb-6">
            <input
              type="text"
              maxLength="1"
              className="w-12 h-12 sm:w-14 sm:h-14 text-center text-lg font-bold text-black bg-transparent border border-[#E6FDA3] rounded-2xl shadow focus:outline-none focus:ring-2 focus:ring-[#F2FA5A]"
            />
            <input
              type="text"
              maxLength="1"
              className="w-12 h-12 sm:w-14 sm:h-14 text-center text-lg font-bold text-black bg-transparent border border-[#E6FDA3] rounded-2xl shadow focus:outline-none focus:ring-2 focus:ring-[#F2FA5A]"
            />
            <input
              type="text"
              maxLength="1"
              className="w-12 h-12 sm:w-14 sm:h-14 text-center text-lg font-bold text-black bg-transparent border border-[#E6FDA3] rounded-2xl shadow focus:outline-none focus:ring-2 focus:ring-[#F2FA5A]"
            />
            <input
              type="text"
              maxLength="1"
              className="w-12 h-12 sm:w-14 sm:h-14 text-center text-lg font-bold text-black bg-transparent border border-[#E6FDA3] rounded-2xl shadow focus:outline-none focus:ring-2 focus:ring-[#F2FA5A]"
            />
          </div>
          {/* Verify Button */}
          <button
            onClick={handleVerify}
            className="w-60 p-3 rounded-lg bg-[#E6FDA3] text-[#738ffd] font-semibold hover:bg-[#F2FA5A] transition mt-6"
          >
            Verify
          </button>

          <div className="text-center mt-3">
            <p className="font-semibold text-xs sm:text-xs text-center">
              Didn't you receive any code?
              <a
                href="#"
                onClick={handleResendCode}
                className="font-bold text-white text-xs sm:text-xs hover:underline ml-1"
              >
                Resend Code
              </a>
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-[#cad7fdb3] rounded-2xl flex justify-center items-center w-1/3 h-3/4 mx-auto my-auto">
          <img
            src={VerifCode}
            alt="Verification Code"
            className="w-96 h-96 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default VerificationCode;
