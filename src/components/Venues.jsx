import React, { useState, useEffect } from "react";
import hero1 from "../assets/hero1.png";
import { ChevronDown, Star } from "lucide-react";
import photos from "../../public/vite.svg";
import { useNavigate } from "react-router-dom";
import VenueService from "../services/venue-service"; // Import VenueService

export default function SportVenues() {
  const [selectedFacility, setSelectedFacility] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [venues, setVenues] = useState([]);
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [activeButton, setActiveButton] = useState(null);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentVenues = filteredVenues.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredVenues.length / itemsPerPage);
  const navigate = useNavigate();

  const handleButtonClick = (location) => {
    setActiveButton(location);
    const updatedVenues = venues.filter(
        (venue) =>
            venue.city_or_regency.toLowerCase() === location.toLowerCase()
    );
    setFilteredVenues(updatedVenues);
    setCurrentPage(1);
  };

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const venuesData = await VenueService.getAllVenues();
        setVenues(venuesData);
        setFilteredVenues(venuesData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching venues:", error);
        setIsLoading(false);
      }
    };

    fetchVenues();
  }, []);

  useEffect(() => {
    let updatedVenues = [...venues];
    if (selectedFacility) {
      updatedVenues = updatedVenues.filter((venue) =>
          venue.fields.some((field) => field.type === selectedFacility)
      );
    }
    if (selectedRating) {
      updatedVenues.sort((a, b) => {
        if (selectedRating === "Lowest to Highest") {
          return a.rating - b.rating;
        } else if (selectedRating === "Highest to Lowest") {
          return b.rating - a.rating;
        }
        return 0;
      });
    }
    setFilteredVenues(updatedVenues);
  }, [selectedFacility, selectedRating, venues]);

  const handleResetFilters = () => {
    setSelectedFacility("");
    setSelectedRating("");
    setFilteredVenues(venues);
    setCurrentPage(1);
    setActiveButton(null); // Reset active button
  };

  console.log(venues)

  return (
      <div className="min-h-screen flex flex-col bg-gray-100">
        <div className="bg-[#738FFD] mt-24 mx-20 p-10 rounded-lg shadow-xl flex flex-col md:flex-row justify-between items-center md:py-16 relative">
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
                src={hero1}
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
                  <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md w-48 z-50">
                    {/* Facility options */}
                    {["Futsal", "Basketball", "Badminton", "Volleyball"].map((facility) => (
                        <div
                            key={facility}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              setSelectedFacility(facility);
                              setOpenDropdown(null);
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
                  onClick={() => toggleDropdown("rating")}
                  className="bg-[#E6FDA3] px-4 py-2 rounded-md flex items-center gap-2"
              >
                {selectedRating || "Rating"}
                <ChevronDown size={20} />
              </button>
              {openDropdown === "rating" && (
                  <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md w-48 z-50">
                    {["Lowest to Highest", "Highest to Lowest"].map((rating) => (
                        <div
                            key={rating}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              setSelectedRating(rating);
                              setOpenDropdown(null);
                            }}
                        >
                          {rating}
                        </div>
                    ))}
                  </div>
              )}
            </div>

            {/* Reset Filters Button */}
            <button
                onClick={handleResetFilters}
                className="bg-red-500 text-white px-4 py-2 rounded-md text-sm hover:bg-red-400"
            >
              Reset Filters
            </button>
          </div>
        </div>

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
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, index) => {
                            const starFill = Math.min(
                                Math.max(venue.rating - index, 0),
                                1
                            ); // Determines the fill level for each star

                            return (
                                <div key={index} className="relative w-4 h-4">
                                  {/* Empty star */}
                                  <Star size={16} className="text-gray-300" />
                                  {/* Filled star */}
                                  <Star
                                      size={16}
                                      className="absolute top-0 left-0 text-yellow-400 fill-current"
                                      style={{
                                        clipPath: `inset(0 ${100 - starFill * 100}% 0 0)`, // Clips the star based on the fill percentage
                                      }}
                                  />
                                </div>
                            );
                          })}
                          <span className="ml-2 text-yellow-500 font-bold">
                      {venue.rating}
                    </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        {venue.street} - {venue.district}, {venue.city_or_regency},{" "}
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
