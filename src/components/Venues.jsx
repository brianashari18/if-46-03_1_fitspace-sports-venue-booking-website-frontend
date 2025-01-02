import React,{ useState, useEffect } from "react";
import axios from "axios";
import hero1 from "../assets/hero1.png";
import { ChevronDown, Star } from "lucide-react";
import photos from "../../public/vite.svg";
import { useNavigate } from "react-router-dom";
import VenueService from "../services/venue-service"; // Import VenueService

export default function SportVenues() {
  // State to manage dropdown visibility
  const [isFacilityOpen, setIsFacilityOpen] = useState(false);
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);

  // State to manage selected values for dropdowns
  const [selectedFacility, setSelectedFacility] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");

  const [showPriceRange, setShowPriceRange] = useState(false);
  const [lowestPrice, setLowestPrice] = useState(""); // Input Lowest Price
  const [highestPrice, setHighestPrice] = useState(""); // Input Highest Price

  const [venues, setVenues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9); // Set limit per page to 9

  const [openDropdown, setOpenDropdown] = useState(null);
  const [activeButton, setActiveButton] = useState(null); // State to track active button

  const navigate = useNavigate();

  const handleButtonClick = (location) => {
    setActiveButton(location); // Update active button state
  };

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const venuesData = await VenueService.getAllVenues(); // Use VenueService to fetch venues
        setVenues(venuesData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching venues:", error);
        setIsLoading(false);
      }
    };

    fetchVenues();
  }, []);

  // Calculate data for current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentVenues = venues.slice(indexOfFirstItem, indexOfLastItem);

  // Total number of pages
  const totalPages = Math.ceil(venues.length / itemsPerPage);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="bg-[#738FFD] mt-24 mx-20 p-10  rounded-lg shadow-xl flex flex-col md:flex-row justify-between items-center md:py-16 relative">
        <div className="w-full md:w-1/2 text-left">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-8">
            Best Sport Center Location
          </h1>
          <div className="flex gap-4 flex-wrap">
            <button
              className={`px-4 py-2 rounded-md ${
                activeButton === "Bandung"
                  ? "bg-white text-black font-semibold"
                  : "bg-[#E6FDA3] text-black"
              }`}
              onClick={() => handleButtonClick("Bandung")}
            >
              Bandung
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                activeButton === "Kabupaten Bandung"
                  ? "bg-white text-black font-semibold"
                  : "bg-[#E6FDA3] text-black"
              }`}
              onClick={() => handleButtonClick("Kabupaten Bandung")}
            >
              Kabupaten Bandung
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                activeButton === "Kabupaten Bandung Barat"
                  ? "bg-white text-black font-semibold"
                  : "bg-[#E6FDA3] text-black"
              }`}
              onClick={() => handleButtonClick("Kabupaten Bandung Barat")}
            >
              Kabupaten Bandung Barat
            </button>
          </div>
        </div>

          <div className="w-full md:w-1/2 flex justify-center items-end">
            <img
                src={hero1} // Use imported image
                alt="Sports illustration"
                className="absolute bottom-0 right-0 w-[363px] h-[325px] object-contain"
            />
          </div>
        </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-4 flex-wrap">
          {/* Facility Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("facility")}
              className="bg-[#E6FDA3] px-4 py-2 rounded-md flex items-center gap-2"
            >
              {selectedFacility || "Facility"}
              <ChevronDown size={20} />
            </button>
            {openDropdown === "facility" && (
              <div
                className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md w-48 z-50 transition-[transform,opacity] transform duration-300 ease-out scale-y-100 opacity-100"
                onMouseLeave={() => setOpenDropdown(null)}
                style={{ transformOrigin: "top" }}
              >
                {"Futsal,Basketball,Badminton,Voli"
                  .split(",")
                  .map((facility, index) => (
                    <React.Fragment key={facility}>
                      <div
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setSelectedFacility(facility);
                          setOpenDropdown(null);
                        }}
                      >
                        {facility}
                      </div>
                      {index < 3 && (
                        <div className="border-t border-gray-200"></div>
                      )}
                    </React.Fragment>
                  ))}
              </div>
            )}
          </div>

          {/* Rating Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("rating")}
              className="bg-[#E6FDA3] px-4 py-2 rounded-md flex items-center gap-2"
            >
              {selectedRating || "Rating"}
              <ChevronDown size={20} />
            </button>
            {openDropdown === "rating" && (
              <div
                className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md w-48 z-50 transition-[transform,opacity] transform duration-300 ease-out scale-y-100 opacity-100"
                onMouseLeave={() => setOpenDropdown(null)}
                style={{ transformOrigin: "top" }}
              >
                {["Lowest to Highest", "Highest to Lowest"].map(
                  (rating, index) => (
                    <React.Fragment key={rating}>
                      <div
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setSelectedRating(rating);
                          setOpenDropdown(null);
                        }}
                      >
                        {rating}
                      </div>
                      {index < 1 && (
                        <div className="border-t border-gray-200"></div>
                      )}
                    </React.Fragment>
                  )
                )}
              </div>
            )}
          </div>

          {/* Price Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("price")}
              className="bg-[#E6FDA3] px-4 py-2 rounded-md flex items-center gap-2"
            >
              {selectedPrice || "Price"}
              <ChevronDown size={20} />
            </button>
            {openDropdown === "price" && (
              <div
                className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md w-48 z-50 transition-[transform,opacity] transform duration-300 ease-out scale-y-100 opacity-100"
                onMouseLeave={() => setOpenDropdown(null)}
                style={{ transformOrigin: "top" }}
              >
                {["Lowest to Highest", "Highest to Lowest", "Price Range"].map(
                  (price, index) => (
                    <React.Fragment key={price}>
                      <div
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setSelectedPrice(price);
                          setOpenDropdown(null); // Tutup dropdown setelah memilih
                          if (price === "Price Range") {
                            setShowPriceRange(true); // Tampilkan input Price Range
                          } else {
                            setShowPriceRange(false); // Sembunyikan input Price Range
                          }
                        }}
                      >
                        {price}
                      </div>
                      {index < 2 && (
                        <div className="border-t border-gray-200"></div>
                      )}
                    </React.Fragment>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>

        {/* Price Range Input */}
        {showPriceRange && (
            <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <h4 className="flex justify-center font-semibold mb-5">
                Set Price Range
              </h4>
              <div className="flex justify-center gap-3 items-center">
                <input
                    type="number"
                    placeholder="Lowest Price"
                    value={lowestPrice}
                    onChange={(e) => setLowestPrice(e.target.value)}
                    className="w-40 h-9 border border-gray-300 rounded-md px-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
                <span className="text-gray-500">—</span>
                <input
                    type="number"
                    placeholder="Highest Price"
                    value={highestPrice}
                    onChange={(e) => setHighestPrice(e.target.value)}
                    className="w-40 h-9 border border-gray-300 rounded-md px-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
              </div>
              <div className="flex justify-center mt-5">
                <button
                    onClick={() => {
                      alert(`Price Range: ${lowestPrice} - ${highestPrice}`);
                      setIsPriceOpen(false);
                    }}
                    className="bg-[#6B7FFF] text-white px-20 py-2 rounded-md text-sm hover:bg-[#5a6edb] transition duration-300"
                >
                  Apply
                </button>
              </div>
            </div>
        )}

        {/* Venue Grid */}
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentVenues.length > 0 ? (
              currentVenues.map((venue) => (
                  <div
                      key={venue.id}
                      className="block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                      onClick={() =>
                          navigate(`/venueDetail/${venue.name}`, { state: { venue } })
                      }
                  >
                    <div className="relative h-48">
                      <img
                          src={venue.fields.length > 0 && venue.fields[0].gallery.length > 0 ? `http://localhost:8080${venue.fields[0].gallery[0].photo_url}` : "https://staticg.sportskeeda.com/editor/2022/11/a9ef8-16681658086025-1920.jpg"}
                          alt="Venue"
                          className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold">{venue.name || "Sport Venue"}</h3>
                        <div className="flex">
                          {Array.from({ length: venue.rating }).map((_, j) => (
                              <Star
                                  key={j}
                                  size={16}
                                  className="text-yellow-400 fill-current"
                              />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        {venue.street} - {venue.district}, {venue.city_or_regency},
                        {venue.province}
                      </p>
                      <div className="flex gap-2">
                        {venue.fields.map((field, j) => (
                            <span
                                key={j}
                                className="bg-gray-200 px-3 py-1 rounded-md text-sm"
                            >
                      {field.type}
                    </span>
                        ))}
                      </div>
                    </div>
                  </div>
              ))
          ) : (
              <p className="text-center col-span-full">No venues available.</p>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
            <div className="flex justify-center gap-2 py-8">
              {Array.from({ length: totalPages }).map((_, pageIndex) => (
                  <button
                      key={pageIndex}
                      onClick={() => setCurrentPage(pageIndex + 1)}
                      className={`w-8 h-8 rounded-full ${
                          currentPage === pageIndex + 1
                              ? "bg-[#6B7FFF] text-white"
                              : "bg-gray-300"
                      } flex items-center justify-center`}
                  >
                    {pageIndex + 1}
                  </button>
              ))}
            </div>
        )}
      </div>
  );
}
