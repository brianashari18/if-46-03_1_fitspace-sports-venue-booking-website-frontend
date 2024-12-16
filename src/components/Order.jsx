import { useState } from "react";
import ProfileIcon from "../assets/ProfileIcon.png";
import OrderIcon from "../assets/OrderIcon.png";
import AddVenue from "../assets/AddVenue.png";
import ChangePass from "../assets/ChangePass.png";
import LogOutIcon from "../assets/LogOutIcon.png";

const orders = [
  {
    id: 1,
    title: "Progresif Sport Centre Futsal",
    date: "01-Nov-2024",
    time: "08:00 - 10:00",
    price: "Rp 100.000",
    imageUrl: "link-gambar-futsal",
    status: "selesai",
  },
  {
    id: 2,
    title: "Progresif Sport Centre Badminton",
    date: "01-Nov-2024",
    time: "08:00 - 10:00",
    price: "Rp 100.000",
    imageUrl: "link-gambar-badminton",
    status: "selesai",
  },
  {
    id: 3,
    title: "Progresif Sport Centre Kolam Renang",
    date: "01-Nov-2024",
    time: "08:00 - 10:00",
    price: "Rp 100.000",
    imageUrl: "link-gambar-renang",
    status: "dibatalkan",
  },
];

const Order = () => {
  const [activeTab, setActiveTab] = useState("selesai");

  // Filter orders berdasarkan status
  const filteredOrders = orders.filter((order) => order.status === activeTab);

  return (
    <div className="flex justify-start h-screen bg-[#F5F5F5]">
      {/*Menu*/}
      <div className="bg-white border w-full h-full rounded-lg shadow-xl sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-[25rem] p-6">
        <h1 className="text-xl font-bold text-gray-400 text-start mb-6 ml-3 mt-5">
          Profile
        </h1>
        <div className="flex flex-col space-y-4">
          <button className="font-semibold flex items-center px-5 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
            <img src={ProfileIcon} alt="Edit Icon" className="w-6 h-6 mr-3" />
            Edit Profile
          </button>
          <button className="font-semibold flex items-center px-5 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
            <img src={OrderIcon} alt="Order Icon" className="w-6 h-6 mr-3" />
            Order
          </button>
          <button className="font-semibold flex items-center px-5 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
            <img src={AddVenue} alt="Store Icon" className="w-6 h-6 mr-3" />
            Venue
          </button>
        </div>

        <h1 className="text-xl font-bold text-gray-400 text-start mt-28 mb-6 ml-3">
          Secure
        </h1>
        <div className="flex flex-col space-y-4">
          <button className="font-semibold flex items-center px-5 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
            <img
              src={ChangePass}
              alt="Change Password"
              className="w-6 h-6 mr-3"
            />
            Change Password
          </button>
          <button className="font-semibold flex items-center px-5 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
            <img src={LogOutIcon} alt="Log Out" className="w-6 h-6 mr-3" />
            Log Out
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Header */}
        <h1 className="text-2xl font-bold text-black text-start mb-6 ml-6">
          Order
        </h1>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-xl w-full xl:w-[60rem] h-auto ml-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("selesai")}
              className={`w-1/2 py-4 text-center font-semibold ${
                activeTab === "selesai"
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-400"
              }`}
            >
              Selesai
            </button>
            <button
              onClick={() => setActiveTab("dibatalkan")}
              className={`w-1/2 py-4 text-center font-semibold ${
                activeTab === "dibatalkan"
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-400"
              }`}
            >
              Dibatalkan
            </button>
          </div>

          {/* Order Items */}
          <div className="p-4 space-y-4">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center bg-white rounded-lg shadow-lg p-4"
                >
                  {/* Gambar */}
                  <img
                    src={order.imageUrl}
                    alt={order.title}
                    className="w-16 h-16 rounded-lg mr-4 object-cover"
                  />
                  {/* Detail Order */}
                  <div className="flex-1">
                    <h2 className="text-md font-semibold text-black">
                      {order.title}
                    </h2>
                    <p className="text-gray-500 text-sm">
                      {order.date} • {order.time}
                    </p>
                    <p className="text-green-600 font-semibold mt-1">
                      {order.price}
                    </p>
                  </div>
                  {/* Tombol Order Lagi */}
                  {activeTab === "dibatalkan" && (
                    <button className="bg-lime-200 text-black py-1 px-3 rounded-lg">
                      Order Lagi
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">Tidak ada data</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
