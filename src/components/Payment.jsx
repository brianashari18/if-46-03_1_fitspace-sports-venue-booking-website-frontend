import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  
  const formattedPrice = state?.price
  ? parseFloat(state.price)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,") 
      .replace(",", ".") 
  : "0.00"; 
  
  const [formData, setFormData] = useState({
    customerName: "",
    phoneNumber: "",
    email: "",
    notes: "",
  });
  
  const [errors, setErrors] = useState({
    customerName: "",
    phoneNumber: "",
    email: "",
  });
  
  const [paymentOption, setPaymentOption] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState({
    category: "",
    method: "",
  });

  const [progress, setProgress] = useState(0);
  const [taxPrice, setTaxPrice] = useState("0.00");
  const [totalPrice, setTotalPrice] = useState("0.00");
  
  useEffect(() => {
    if (state?.price) {
      const numericPrice = parseFloat(state.price); // Gunakan angka asli untuk perhitungan
      const calculatedTax = numericPrice * 0.12; // Pajak 12%.
      const calculatedTotal = numericPrice + calculatedTax;
  
      // Format nilai pajak dan total dengan benar
      setTaxPrice(
        calculatedTax
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, "$&,") // Gunakan koma untuk format ribuan
          .replace(",", ".") // Ganti koma dengan titik (format Indonesia)
      );
  
      setTotalPrice(
        calculatedTotal
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, "$&,") // Gunakan koma untuk format ribuan
          .replace(",", ".") // Ganti koma dengan titik (format Indonesia)
      );
    }
  }, [state?.price]);  

  const handleReset = () => {
    setFormData({
      customerName: "",
      phoneNumber: "",
      email: "",
      notes: "",
    });
    setErrors({
      customerName: "",
      phoneNumber: "",
      email: "",
    });
    setPaymentOption("");
    setSelectedPaymentMethod({
      category: "",
      method: "",
    });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "phoneNumber") {
      const isNumeric = /^[0-9]*$/; // Hanya angka diperbolehkan
      if (!isNumeric.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          phoneNumber: "Phone Number must contain only numbers",
        }));
        return;
      }
      if (value.length > 15) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          phoneNumber: "Phone Number cannot exceed 15 digits",
        }));
        return;
      }
    }

    setFormData({
      ...formData,
      [id]: value,
    });

    setErrors({
      ...errors,
      [id]:
        value.trim() === ""
          ? `${id.replace(/([A-Z])/g, " $1")} is required`
          : "",
    });

    if (id === "email" && value.trim() !== "") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setErrors({
        ...errors,
        email: !emailRegex.test(value) ? "Invalid email format" : "",
      });
    }
  };

  const handlePaymentMethodClick = (category, method) => {
    setSelectedPaymentMethod({
      category,
      method,
    });
  };

  const isFormValid = () => {
    const requiredFields = ["customerName", "phoneNumber", "email"];
    const hasErrors = requiredFields.some(
      (field) => errors[field] || !formData[field]
    );
    return !hasErrors && selectedPaymentMethod;
  };

console.log(formData)

  const handleNext = () => {
    if (isFormValid()) {
      console.log(`PRICE ${formattedPrice}`)
      navigate("/confirm-payment", {
        state: {
          ...state,
          price: formattedPrice, 
          taxPrice,
          totalPrice,
          selectedPaymentMethod,
          formData
        },
      }); 
    } else {
      alert("Please complete all required fields and select a payment method.");
    }
  };

  const calculateProgress = () => {
    const requiredFields = ["customerName", "phoneNumber", "email"];
    let filledFields = requiredFields.filter(
      (field) => formData[field].trim() !== ""
    ).length;
  
    let progressValue = (filledFields / requiredFields.length) * 50; 
  
    if (selectedPaymentMethod.category && selectedPaymentMethod.method) {
      progressValue += 50;
    }
  
    setProgress(progressValue);
  };

  useEffect(() => {
    calculateProgress();
  }, [formData, selectedPaymentMethod]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-[85rem] h-[45rem] flex">
        {/*Left Side*/}
        <div className="w-2/3 flex flex-col items-center gap-6 py-8">
          <div className="w-[50rem]">
            <p className="text-lg font-semibold">
              1. Customer Detail and Payment Option
            </p>
            <div className="w-full h-2 bg-gray-200 rounded mt-2">
              <div
                className="h-full bg-green-500 rounded"
                style={{
                  width: `${progress}%`,
                  transition: "width 0.3s ease-in-out",
                }}
              ></div>
            </div>
          </div>
          <div className="bg-[#738FFD] rounded-lg shadow-lg w-[50rem] p-8 text-white">
            <h2 className="text-xl font-bold mb-3 -mt-3">Customer Detail</h2>
            <form className="grid grid-cols-2 gap-4">
              {/* Customer Name */}
              <div className="flex flex-col">
                <label className="text-sm font-medium">Customer Name</label>
                <input
                  type="text"
                  id="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  className="mt-2 p-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter name"
                />
                {errors.customerName && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.customerName}
                  </span>
                )}
              </div>

              {/* Phone Number */}
              <div className="flex flex-col">
                <label className="text-sm font-medium">Phone Number</label>
                <input
                  type="text"
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="mt-2 p-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter phone number"
                />
                {errors.phoneNumber && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.phoneNumber}
                  </span>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col col-span-2">
                <label className="text-sm font-medium">Email</label>
                <input
                  type="text"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-2 p-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.email}
                  </span>
                )}
              </div>

              {/* Notes */}
              <div className="flex flex-col col-span-2">
                <label className="text-sm font-medium">Notes</label>
                <input
                  type="text"
                  id="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="mt-2 p-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter notes"
                ></input>
              </div>
            </form>
          </div>

          {/* Price Details Section */}
          <div className="bg-[#738FFD] rounded-lg shadow-lg w-[50rem] p-5 pl-8 text-white">
            <div className="flex justify-between text-lg font-medium">
              <span>Price</span>
              <span>Rp{formattedPrice}</span>
            </div>
            <div className="flex justify-between text-lg font-medium mb-2">
              <span>Service Fee</span>
              <span>Rp{taxPrice}</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t border-white pt-2">
              <span>Total</span>
              <span>Rp{totalPrice}</span>
            </div>
          </div>
          {/* Reset Button */}
          <div className="absolute -bottom-14 text-left w-[50rem]">
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-3 bg-[#E6FDA3] text-black font-semibold rounded-lg shadow-md hover:bg-[#F2FA5A] transition"
            >
              Reset
            </button>
          </div>
        </div>

        {/*Right Side*/}
        <div className="w-1/3 flex flex-col items-center gap-6 py-8">
          <div className="w-[25rem] text-start">
            <p className="text-lg font-semibold">
              2. Review and Confirm Payment
            </p>
            <div className="w-full h-2 bg-gray-200 rounded mt-2"></div>
          </div>
          <div className="bg-[#738FFD] rounded-lg shadow-lg w-[25rem] h-[31rem] p-6">
            <h2 className="text-lg font-bold text-white mb-4">
              Select Payment Option
            </h2>
            <div className="flex flex-col gap-6">
              <div className="bg-[#E6FDA3] p-1 rounded-lg">
                <span className="block text-black font-semibold pl-2">
                  Virtual Account
                </span>
              </div>
              <div className="flex gap-4">
                <img
                  src="https://www.bca.co.id/-/media/Feature/Header/Header-Logo/logo-bca.svg?v=1 "
                  alt="BCA"
                  className={`w-12 h-12 object-contain bg-white rounded-md p-2 cursor-pointer ${
                    selectedPaymentMethod === "BCA" && "ring-2 ring-blue-500"
                  }`}
                  onClick={() => handlePaymentMethodClick("Virtual Account","BCA")}
                />
                <img
                  src="https://www.bni.co.id/Portals/1/BNI/Images/logo-bni-new.png"
                  alt="BNI"
                  className={`w-12 h-12 object-contain bg-white rounded-md p-2 cursor-pointer ${
                    selectedPaymentMethod === "BNI" && "ring-2 ring-blue-500"
                  }`}
                  onClick={() => handlePaymentMethodClick("Virtual Account","BNI")}
                />
                <img
                  src="https://www.bankmandiri.co.id/image/layout_set_logo?img_id=31567&t=1732986257988"
                  alt="Mandiri"
                  className={`w-12 h-12 object-contain bg-white rounded-md p-2 cursor-pointer ${
                    selectedPaymentMethod === "Mandiri" &&
                    "ring-2 ring-blue-500"
                  }`}
                  onClick={() => handlePaymentMethodClick("Virtual Account","Mandiri")}
                />
                <img
                  src="https://bri.co.id/o/bri-corporate-theme/images/bri-logo.png"
                  alt="BRI"
                  className={`w-12 h-12 object-contain bg-white rounded-md p-2 cursor-pointer ${
                    selectedPaymentMethod === "BRI" && "ring-2 ring-blue-500"
                  }`}
                  onClick={() => handlePaymentMethodClick("Virtual Account","BRI")}
                />
                <img
                  src="https://www.bankbsi.co.id/img/logo.png"
                  alt="BSI"
                  className={`w-12 h-12 object-contain bg-white rounded-md p-2 cursor-pointer ${
                    selectedPaymentMethod === "BSI" && "ring-2 ring-blue-500"
                  }`}
                  onClick={() => handlePaymentMethodClick("Virtual Account","BSI")}
                />
              </div>
              <div className="bg-[#E6FDA3] p-1 rounded-lg">
                <span className="block text-black font-semibold pl-2">
                  E-Wallet
                </span>
              </div>
              <div className="flex gap-4">
                <img
                  src="https://gopay.co.id/assets/img/logo/gopay.webp"
                  alt="Gopay"
                  className={`w-12 h-12 object-contain bg-white rounded-md p-2 cursor-pointer ${
                    selectedPaymentMethod === "Gopay" && "ring-2 ring-blue-500"
                  }`}
                  onClick={() => handlePaymentMethodClick("E-Wallet","Gopay")}
                />
                <img
                  src="data:image/jpeg;base64,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"
                  alt="Ovo"
                  className={`w-12 h-12 object-contain bg-white rounded-md p-2 cursor-pointer ${
                    selectedPaymentMethod === "Ovo" && "ring-2 ring-blue-500"
                  }`}
                  onClick={() => handlePaymentMethodClick("E-Wallet","Ovo")}
                />
                <img
                  src="https://shopeepay.co.id/src/pages/home/assets/images/new-homepage/new-spp-logo.svg"
                  alt="ShopeePay"
                  className={`w-12 h-12 object-contain bg-white rounded-md p-2 cursor-pointer ${
                    selectedPaymentMethod === "ShopeePay" &&
                    "ring-2 ring-blue-500"
                  }`}
                  onClick={() => handlePaymentMethodClick("E-Wallet","ShopeePay")}
                />
              </div>
              <div className="bg-[#E6FDA3] p-1 rounded-lg">
                <span className="block text-black font-semibold pl-2">
                  Credit Card
                </span>
              </div>
              <div className="flex gap-4">
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAfCAMAAACF8f6iAAAAdVBMVEX///8UNMsAJMkAKspca9YALMoAJskAD8cIL8oAIMgAHcioreYAFMextumiqOUAAMaMlN9GV9G+wuxLXNLv8Pp7hdxlctf6+/7Cxu3f4fbm6PiVnOLO0fHV1/PZ3PSco+RWZtU5TdCBit0tRM5vetkfOswnP839FUl8AAAB00lEQVQ4je1TW4KDIAwkIIKIj/q2rda27t7/iJsE63KE/dj5aIlJJiQThPjHn8KjbbcEkQfzjkY7ihZ/ZzS7R+uMf/YLO+chSbbikzlOQ6W1ria2EqnlIGajtSFWk1oAsL5kp1RayySqelUAqqZT5wH8IgoJ9iLEDS0rM6n8Ss4iQxJQ8X1rBbbli6dgn0L0ioi6CkBfiql4GY56UnXw1yjx7vADHdCRYRNvC1nDFexv0Oopjxy/GH1gmpAgPc2HxLD7GbQrJJVHTx+0XEJsGtI6XEAjDZXwfRdCsH27jebo6RQlhfTGTfmOLT3g10tKwzCPTwhyf2GFOHFxSCduR8KgQbIAiad5uI3OOHk30n39HGc6mrNlLQT9u9Db9E0SONyOxoHqBQklizgxwSI5qvcmWbG3ajwcJVJSWxcLab6uNJ0+TsQkOLQQTRYIAlBTlHamQaXOYVjkQ8xBJElnXAdibXhdSHa1U/qJ8zYMzevEGuGtqI/WfO2vXWHDZiFlrSHIs/8DO1F61swATw5DtCI+/xJlWF4RplPGiYWR0vHmL5WUuJzXKsPHoJWj6lkmTXh4c3WEfdCVeV6yQiueaEZdU+/JXtNzu5Lz2CA85uIffws/lusXjWNFJpAAAAAASUVORK5CYII="
                  alt="Visa"
                  className={`w-12 h-12 object-contain bg-white rounded-md p-2 cursor-pointer ${
                    selectedPaymentMethod === "Visa" && "ring-2 ring-blue-500"
                  }`}
                  onClick={() => handlePaymentMethodClick("Credit Card","Visa")}
                />
                <img
                  src="https://www.mastercard.co.id/content/dam/public/mastercardcom/id/id/logos/mc-logo-52.svg"
                  alt="MasterCard"
                  className={`w-12 h-12 object-contain bg-white rounded-md p-2 cursor-pointer ${
                    selectedPaymentMethod === "MasterCard" &&
                    "ring-2 ring-blue-500"
                  }`}
                  onClick={() => handlePaymentMethodClick("Credit Card","MasterCard")}
                />
              </div>
            </div>
          </div>
          <div className="absolute -bottom-14 text-right w-[25rem]">
            <button
              type="button"
              onClick={handleNext}
              className={`px-6 py-3 font-semibold rounded-lg shadow-md transition ${
                isFormValid()
                  ? "bg-[#E6FDA3] text-black hover:bg-[#F2FA5A]"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!isFormValid()}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
