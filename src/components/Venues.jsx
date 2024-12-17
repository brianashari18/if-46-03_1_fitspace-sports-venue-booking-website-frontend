import { useState } from 'react';
import { Link } from 'react-router-dom'; // Changed to react-router-dom Link
import hero1 from "../assets/hero1.png"; // Example image import
import progresif from '../assets/progresif.png'; // Example image import
import { ChevronDown, Star, Facebook, Instagram, Twitter } from 'lucide-react';

export default function SportVenues() {
  // State to manage dropdown visibility
  const [isFacilityOpen, setIsFacilityOpen] = useState(false);
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);

  // State to manage selected values for dropdowns
  const [selectedFacility, setSelectedFacility] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-[#6B7FFF] text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-2xl font-bold">
            FITSPACE
          </Link>
          <div className="hidden md:flex gap-6">
            <Link to="/">Home</Link>
            <Link to="/venue">Venue</Link>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact Us</Link>
          </div>
        </div>
        <div className="flex gap-4">
          <Link to="/signin" className="px-4 py-1.5 hover:text-gray-200">
            Sign In
          </Link>
          <Link
            to="/signup"
            className="bg-[#C2FF65] text-black px-4 py-1.5 rounded-md hover:bg-[#b3f052]"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-[#738FFD] text-white px-4 py-12 md:py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">
            Best Sport Center Location
          </h1>
          <div className="flex gap-4 flex-wrap">
            <button className="bg-white text-black px-4 py-2 rounded-md">
              Bandung
            </button>
            <button className="bg-[#E6FDA3] text-black px-4 py-2 rounded-md">
              Kabupaten Bandung
            </button>
            <button className="bg-[#E6FDA3] text-black px-4 py-2 rounded-md">
              Kabupaten Bandung Barat
            </button>
          </div>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3">
          <img
            src={hero1} // Use imported image
            alt="Sports illustration"
            className="absolute top-0 right-0 w-[363px] h-[325px] object-contain" 
          />
        </div>
      </div>

    {/* Filters */}
    <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex gap-4 flex-wrap">
            {/* Facility Dropdown */}
            <div className="relative">
                <button
                onClick={() => setIsFacilityOpen(!isFacilityOpen)}
                className="bg-[#E6FDA3] px-4 py-2 rounded-md flex items-center gap-2"
                >
                Facility
                <ChevronDown size={20} />
                </button>
                {isFacilityOpen && (
                <div
                    className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md w-48 z-50"
                    onMouseLeave={() => setIsFacilityOpen(false)}
                >
                    {['Futsal', 'Basketball', 'Tennis', 'Badminton', 'Swimming Pool'].map((facility) => (
                    <div
                        key={facility}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                        setSelectedFacility(facility);
                        setIsFacilityOpen(false);
                        }}
                    >
                        {facility}
                    </div>
                    ))}
                </div>
                )}
            </div>

            {/* Rating Dropdown */}
            <div className="relative">
                <button
                onClick={() => setIsRatingOpen(!isRatingOpen)}
                className="bg-[#E6FDA3] px-4 py-2 rounded-md flex items-center gap-2"
                >
                Rating
                <ChevronDown size={20} />
                </button>
                {isRatingOpen && (
                <div
                    className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md w-48 z-50"
                    onMouseLeave={() => setIsRatingOpen(false)}
                >
                    {['Lowest to Highest', 'Highest to Lowest'].map((rating) => (
                    <div
                        key={rating}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                        setSelectedRating(rating);
                        setIsRatingOpen(false);
                        }}
                    >
                        {rating}
                    </div>
                    ))}
                </div>
                )}
            </div>

            {/* Price Dropdown */}
            <div className="relative">
                <button
                onClick={() => setIsPriceOpen(!isPriceOpen)}
                className="bg-[#E6FDA3] px-4 py-2 rounded-md flex items-center gap-2"
                >
                Price
                <ChevronDown size={20} />
                </button>
                {isPriceOpen && (
                <div
                    className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md w-48 z-50"
                    onMouseLeave={() => setIsPriceOpen(false)}
                >
                    {['Lowest to Highest', 'Highest to Lowest', 'Price Range'].map((price) => (
                    <div
                        key={price}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                        setSelectedPrice(price);
                        setIsPriceOpen(false);
                        }}
                    >
                        {price}
                    </div>
                    ))}
                </div>
                )}
            </div>
            </div>
        </div>

      {/* Venue Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-48">
              <img
                src={i === 0 ? progresif : "/placeholder.svg?height=200&width=400"}
                alt="Venue"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold">
                  {i === 0 ? 'PROGRESIF SPORT CENTRE' : 'Sport'}
                </h3>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      size={16}
                      className="text-yellow-400 fill-current"
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Jl. Sukabumi - Ujungjaya, Sukur, Kec. Armandia,
                Kabupaten Meranada Utara, Sulawesi Utara
              </p>
              <div className="flex gap-2">
                <span className="bg-gray-200 px-3 py-1 rounded-md text-sm">
                  Futsal
                </span>
                <span className="bg-gray-200 px-3 py-1 rounded-md text-sm">
                  Mini soccer
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 py-8">
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            className="w-8 h-8 rounded-full bg-[#6B7FFF] text-white flex items-center justify-center"
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
}
