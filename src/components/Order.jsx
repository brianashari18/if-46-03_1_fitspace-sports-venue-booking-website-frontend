import { useState } from "react";
import ProfileIcon from "../assets/ProfileIcon.png";
import OrderIcon from "../assets/OrderIcon.png";
import AddVenue from "../assets/AddVenue.png";
import ChangePass from "../assets/ChangePass.png";
import LogOutIcon from "../assets/LogOutIcon.png";
import SideBar from "./SideBar.jsx";

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

const Order = ({onLogout}) => {
  const [activeTab, setActiveTab] = useState("selesai");

  // Filter orders berdasarkan status
  const filteredOrders = orders.filter((order) => order.status === activeTab);

  return (
    <div className="flex justify-start h-screen bg-[#F5F5F5]">
      {/*Menu*/}
      <SideBar onLogout={onLogout} />

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
