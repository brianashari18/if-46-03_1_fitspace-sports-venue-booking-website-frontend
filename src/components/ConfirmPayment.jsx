import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Lapang from "../assets/Lapang.png";

const ConfirmPayment = () => {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleNext = () => {
    if (isChecked) {
      navigate("/payment-success");
    } else {
      alert("Harap menyetujui syarat dan ketentuan sebelum melanjutkan.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-[85rem] h-[45rem] flex">
        {/* Left Side */}
        <div className="w-2/3 flex flex-col items-center gap-6 py-8">
          <div className="w-[50rem]">
            <p className="text-lg font-semibold">1. Customer Detail and Payment Option</p>
            <div className="w-full h-2 bg-gray-200 rounded mt-2">
              <div className="h-full bg-green-500 rounded" style={{ width: "100%" }}></div>
            </div>
          </div>

          <div className="bg-[#738FFD] rounded-lg shadow-lg w-[50rem] h-[20rem] p-8 text-white flex">
            <div className="w-3/5 h-[16rem]">
              <h2 className="text-xl font-bold mt-3">Booking Information</h2>
              <div className="mt-10">
                <p>Lapangan Futsal</p>
                <p>Sport Center Tel-U</p>
              </div>
              <div className="mt-5">
                <p>Friday, 15 September 2025</p>
                <p>15:00 - 17:00</p>
              </div>
            </div>
            <div className="w-2/5 h-[16rem] flex justify-center">
              <img
                src={Lapang}
                alt="Lapangan Futsal"
                className="rounded-lg object-contain max-h-[14rem] max-w-[90%]"
              />
            </div>
          </div>

          <div className="w-[50rem]">
            <input
              type="checkbox"
              id="terms"
              className="mr-2"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="terms" className="text-sm text-[#475569]">
              Saya telah membaca dan menyetujui {" "}
              <a href="/syarat-ketentuan" className="text-[#3B82F6]">
                S&K
              </a>{" "}
              yang berlaku
            </label>
          </div>

          <div className="absolute bottom-0 text-left w-[50rem]">
            <Link
              to="/payment"
              className="px-6 py-3 bg-[#E6FDA3] text-black font-semibold rounded-lg shadow-md hover:bg-[#F2FA5A] transition"
            >
              Back
            </Link>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-1/3 flex flex-col items-center gap-6 py-8">
          <div className="w-[25rem] text-start">
            <p className="text-lg font-semibold">2. Review and Confirm Payment</p>
            <div className="w-full h-2 bg-gray-200 rounded mt-2">
              <div className="h-full bg-blue-400 rounded" style={{ width: "100%" }}></div>
            </div>
          </div>

          <div className="bg-[#738FFD] rounded-lg shadow-lg w-[25rem] h-[20rem] p-6 text-white">
            <h2 className="text-lg font-bold mb-4">Payment Details</h2>
            <div className="mb-4">
              <p className="text-sm">Virtual Account Mandiri</p>
              <p className="text-xl font-semibold">986969696969696</p>
            </div>
            <div className="text-sm">
              <div className="flex justify-between mb-2">
                <span>Price</span>
                <span>Rp. 1000</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Service Fee</span>
                <span>Rp. 500</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>PPN 90%</span>
                <span>Rp. 900</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-4">
                <span>Total</span>
                <span>Rp. 2400</span>
              </div>
            </div>
          </div>

          <div className="w-[25rem]">
            <h3 className="text-black font-semibold text-base mb-2">Venue Terms and Condition</h3>
            <ul className="text-sm text-[#475569] list-disc pl-5">
              <li>Reschedule hanya bisa dilakukan sebelum H-3 Jadwal Main.</li>
              <li>Dilarang merokok dalam lapangan.</li>
              <li>Wajib menjaga kebersihan lingkungan di dalam area venue.</li>
            </ul>
          </div>

          <div className="absolute bottom-0 text-right w-[25rem]">
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-[#E6FDA3] text-black font-semibold rounded-lg shadow-md hover:bg-[#F2FA5A] transition"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPayment;