import axios from "axios";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import PaymentIlus from "../assets/PaymentIlus.png";

const ConfirmPayment = () => {
  const { state } = useLocation();
  const {
    venue,
    field,
    date,
    time,
    price,
    taxPrice,
    totalPrice,
    selectedPaymentMethod = { category: "", method: "" },
    formData,
  } = state || {};

  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-GB",
      options
    );
    return formattedDate;
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const getVirtualAccountNumber = (selectedPaymentMethod) => {
    const virtualAccounts = {
      BCA: "VA-BCA-123456",
      BNI: "VA-BNI-789012",
      Mandiri: "VA-Mandiri-345678",
      BRI: "VA-BRI-901234",
      BSI: "VA-BSI-567890",
      GoPay: "EW-GoPay-123456",
      OVO: "EW-OVO-789012",
      ShopeePay: "EW-ShopeePay-345678",
      Visa: "CC-Visa-123456",
      Mastercard: "CC-Mastercard-789012",
    };

    return virtualAccounts[selectedPaymentMethod?.method] || "Not available";
  };

  const handleNext = async () => {
    if (!isChecked) {
      alert("Harap menyetujui syarat dan ketentuan sebelum melanjutkan.");
      return;
    }
  
    const bookingData = {
      venue,
      field,
      date,
      time,
      price,
      taxPrice,
      totalPrice,
      selectedPaymentMethod,
      formData,
    };


    const bookingData2 = {
      date: date, // Pastikan formatnya sesuai dengan LocalDate (yyyy-MM-dd)
      time_slot: time, // Sesuaikan dengan properti backend
      field_name: field, // Nama lapangan
      price: String(totalPrice), // Konversi ke string karena di backend price bertipe String
    };
    

  
    try {
      setIsSubmitting(true);
      console.log("Sending booking data:", bookingData2); // Log data sebelum mengirim
  
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/${venue.id}/bookings`, bookingData2, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token")
        },
      });
  
      console.log("Response data:", response.data); // Log data respons
  
      if (response.status !== 200) {
        console.error("Response error:", response.data); // Log error details
        throw new Error("Failed to save booking.");
      }
  
      console.log("Booking successful:", response.data);
      navigate("/booking-success");
    } catch (error) {
      console.error("Error saving booking:", error); // Log error
      alert("Terjadi kesalahan saat menyimpan booking. Coba lagi nanti.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-[85rem] h-[45rem] flex">
        {/* Left Side */}
        <div className="w-2/3 flex flex-col items-center gap-6 py-8">
          <div className="w-[50rem]">
            <p className="text-lg font-semibold">
              1. Customer Detail and Payment Option
            </p>
            <div className="w-full h-2 bg-gray-200 rounded mt-2">
              <div
                className="h-full bg-green-500 rounded"
                style={{ width: "100%" }}
              ></div>
            </div>
          </div>

          <div className="bg-[#738FFD] rounded-lg shadow-lg w-[50rem] h-[20rem] p-8 pl-12 text-white flex">
            <div className="w-1/2 h-[16rem]">
              <h2 className="text-xl font-bold mt-3">Booking Information</h2>
              <div className="mt-10 text-lg font-semibold">
                <h3>Lapangan {field}</h3>
                <h3>{venue?.name}</h3>
              </div>
              <div className="mt-5 text-lg font-semibold">
                <h3>{formatDate(date)}</h3>
                <h3>{time}</h3>
              </div>
            </div>
            <div className="w-1/2 h-full flex justify-center items-center">
              <img
                src={PaymentIlus}
                alt="Lapangan Futsal"
                className="rounded-lg object-contain max-h-[14rem] max-w-[100%]"
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
            <label className="text-sm text-[#475569]">
              Saya telah membaca dan menyetujui Syarat dan Ketentuan yang
              berlaku
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
            <p className="text-lg font-semibold">
              2. Review and Confirm Payment
            </p>
            <div className="w-full h-2 bg-gray-200 rounded mt-2">
              <div
                className="h-full bg-blue-400 rounded"
                style={{ width: "100%" }}
              ></div>
            </div>
          </div>

          <div className="bg-[#738FFD] rounded-lg shadow-lg w-[25rem] h-[20rem] p-6 text-white">
            <h2 className="text-lg font-bold mb-4">Payment Details</h2>
            <div className="mb-4">
              <p className="text-sm">
                {selectedPaymentMethod?.category} {selectedPaymentMethod?.method}
              </p>
              <p className="text-xl font-semibold">{getVirtualAccountNumber(selectedPaymentMethod)}</p>
            </div>
            <div className="text-sm">
              <div className="flex justify-between mb-2">
                <span>Price</span>
                <span>{price}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Tax Fee 12%</span>
                <span>{taxPrice}</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-4">
                <span>Total</span>
                <span>{totalPrice}</span>
              </div>
            </div>
          </div>

          <div className="w-[25rem]">
            <h3 className="text-black font-semibold text-base mb-2">
              Venue Terms and Condition
            </h3>
            <ul className="text-sm text-[#475569] list-disc pl-5">
              <li>Reschedule hanya bisa dilakukan sebelum H-3 Jadwal Main.</li>
              <li>Dilarang merokok dalam lapangan.</li>
              <li>Wajib menjaga kebersihan lingkungan di dalam area venue.</li>
            </ul>
          </div>

          <div className="absolute bottom-0 text-right w-[25rem]">
            <button
              onClick={handleNext}
              disabled={isSubmitting}
              className={`px-6 py-3 font-semibold rounded-lg shadow-md transition ${
                isSubmitting
                  ? "bg-gray-300 text-gray-600"
                  : "bg-[#E6FDA3] text-black hover:bg-[#F2FA5A]"
              }`}
            >
              {isSubmitting ? "Next" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPayment;