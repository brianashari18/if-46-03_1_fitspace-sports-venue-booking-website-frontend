import React from "react";
import hero1 from "../assets/hero1.png";

// Hero Section Component
const HeroSection = () => {
  return (
    <div className="bg-[#8C9EFF] rounded-2xl mx-4 my-8 relative overflow-hidden">
      <div className="container mx-auto p-8 md:p-12">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Best Sport Center Location
          </h1>
          <div className="flex flex-wrap gap-4">
            <button className="bg-white px-6 py-2.5 rounded-full text-gray-800 hover:bg-gray-100 transition-colors">
              Bandung
            </button>
            <button className="bg-[#E7FF8C] px-6 py-2.5 rounded-full text-gray-800 hover:bg-[#d9ff66] transition-colors">
              Kabupaten Bandung
            </button>
            <button className="bg-[#E7FF8C] px-6 py-2.5 rounded-full text-gray-800 hover:bg-[#d9ff66] transition-colors">
              Kabupaten Bandung Barat
            </button>
          </div>
        </div>
      </div>
      <div className="absolute right-0 top-0 h-full w-1/2 lg:w-2/5">
        <img
          src={hero1}
          alt="Sports Illustration"
          className="w-full h-full object-cover object-left"
        />
      </div>
    </div>
  );
};

// Filter Section Component
const FilterSection = () => {
  return (
    <div className="flex justify-center gap-4 my-8 px-4">
      <select className="px-8 py-2.5 rounded-lg bg-[#BAFFD4] border-none focus:ring-2 focus:ring-green-400 cursor-pointer">
        <option>Facility</option>
        <option>Parking</option>
        <option>Shower</option>
        <option>Locker</option>
      </select>
      <select className="px-8 py-2.5 rounded-lg bg-[#BAFFD4] border-none focus:ring-2 focus:ring-green-400 cursor-pointer">
        <option>Rating</option>
        <option>5 Stars</option>
        <option>4 Stars & Up</option>
        <option>3 Stars & Up</option>
      </select>
      <select className="px-8 py-2.5 rounded-lg bg-[#BAFFD4] border-none focus:ring-2 focus:ring-green-400 cursor-pointer">
        <option>Price</option>
        <option>Lowest to Highest</option>
        <option>Highest to Lowest</option>
      </select>
    </div>
  );
};

// Venue Card Component
const VenueCard = ({
  title = "Sport",
  rating = 5,
  price = "Rp 50.000",
  image = hero1,
}) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg">
      <div className="relative h-48">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg">{title}</h3>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-lg ${
                  i < rating ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-2">
          Jl. Sukaraja, Sukar, Kec. Airmadidi, Sulawesi Utara
        </p>
        <p className="text-green-500 font-medium mb-3">Harga mulai {price}</p>
        <div className="flex gap-2">
          <span className="bg-gray-100 px-3 py-1 rounded-md text-sm">Futsal</span>
          <span className="bg-gray-100 px-3 py-1 rounded-md text-sm">
            Mini Soccer
          </span>
        </div>
      </div>
    </div>
  );
};

// Venue Grid Component
const VenueGrid = () => {
  return (
    <div className="container mx-auto px-4 mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <VenueCard key={index} />
        ))}
      </div>
    </div>
  );
};

// Pagination Component
const Pagination = () => {
  return (
    <div className="flex justify-center gap-2 mb-12">
      {[1, 2, 3, 4, 5].map((page) => (
        <button
          key={page}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
            page === 1
              ? "bg-[#8C9EFF] text-white"
              : "bg-gray-200 hover:bg-gray-300 text-gray-700"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

// Main Venues Component
const Venues = () => (
  <div className="font-sans">
    <HeroSection />
    <FilterSection />
    <VenueGrid />
    <Pagination />
  </div>
);

export default Venues;
