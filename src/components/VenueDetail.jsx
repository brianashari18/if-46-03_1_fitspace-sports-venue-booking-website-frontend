import { useState } from 'react';
import { Star } from 'lucide-react'; // Assuming lucide-react is needed for stars
import progresif from '../assets/progresif.png'; // Example image import
import locationmap from '../assets/locationmap.png'; // Example location map image import
import avatar1 from '../assets/avatar1.png'; // Example avatar image import
import avatar2 from '../assets/avatar2.png'; // Import avatar2
import avatar3 from '../assets/avatar3.png'; // Import avatar3
import { useLocation } from 'react-router-dom';

const scheduleData = [
  { date : '2024-12-11', day: '11 Des', dayName: 'Monday' },
  { date :'2024-12-12' , day: '12 Des', dayName: 'Tuesday' },
  { date :'2024-12-13' , day: '13 Des', dayName: 'Wednesday' },
  { date : '2024-12-14',  day: '14 Des', dayName: 'Thursday' },
  { date :'2024-12-15' , day: '15 Des', dayName: 'Friday' },
  { date :'2024-12-16' , day: '16 Des', dayName: 'Saturday' },
  { date :'2024-12-17' , day: '17 Des', dayName: 'Sunday' },
];

const timeSlots = [
  { time: '06:00 - 07:00', price: 'Rp120.000' },
  { time: '07:00 - 08:00', price: 'Rp120.000' },
  { time: '08:00 - 09:00', price: 'Rp120.000' },
];


// Custom Progress Bar component
function ProgressBar({ value }) {
  const progressBarStyle = {
    width: `${value}%`,
    height: '10px',
    backgroundColor: '#4caf50',
    borderRadius: '5px',
  };

  return (
      <div
          className="relative w-full bg-gray-200 rounded-full h-2.5"
          style={{ height: '8px', borderRadius: '5px' }}
      >
        <div style={progressBarStyle}></div>
      </div>
  );
}

export default function VenueDetail() {

  const { state } = useLocation();
  const venue = state?.venue;
  console.log(venue)

  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${venue.latitude},${venue.longitude}&zoom=15&size=600x300&markers=${venue.latitude},${venue.longitude}&key=${import.meta.env.VITE_API_KEY}`;

  const [selectedField, setSelectedField] = useState(venue.fields[0]?.type);
  const handleFieldChange = (e) => setSelectedField(e.target.value);

  const scheduleDetailsByField = venue.fields.map((field) => {
    // Check if fieldSchedules exist and map the required properties
    return {
      fieldType: field.type,
      schedules: field.fieldSchedules?.map((scheduleItem) => ({
        timeSlot: scheduleItem.schedule?.time_slot,
        status: scheduleItem.status,
        date: scheduleItem.schedule?.date,
      })) || [],
    };
  });

  const selectedFieldSchedules = scheduleDetailsByField.find((field) => field.fieldType === selectedField)?.schedules || [];

  {/* Reviews Section */}
  // Combine all reviews from all fields
  const allReviews = venue.fields.flatMap((field) => field.reviews);

  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;

// Calculate start and end indices for slicing reviews
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;

// Slice reviews for the current page
  const currentReviews = allReviews.slice(startIndex, endIndex);

// Total number of pages
  const totalPages = Math.ceil(allReviews.length / reviewsPerPage);

  console.log(selectedFieldSchedules)
  console.log(scheduleDetailsByField);

  return (

      <div className="min-h-screen flex flex-col">
        {/* Hero Section */}
        <div className="relative h-[500px]">
          <img
              src={progresif}
              alt="Progresif Sport Centre"
              className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black/40">
            <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-16">
              <h1 className="text-4xl font-bold text-white mb-4">
                {venue.name}
              </h1>
              <p className="text-white/90 mb-6">
                {venue.street} - {venue.district}, {venue.city_or_regency}, {venue.province}
              </p>
              <div className="flex flex-wrap gap-3">
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
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Location Section */}
          <div className="mb-8 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-bold mb-4">LOCATION</h2>
            <div className="h-[300px] bg-gray-200 rounded-lg mb-6">
              <a href={`https://www.google.com/maps?q=${venue.latitude},${venue.longitude}`} target="_blank"
                 rel="noopener noreferrer">
                <img
                    src={mapUrl} // URL gambar peta statis
                    alt="Location Map"
                    className="w-full h-full object-cover rounded-lg cursor-pointer"
                />
              </a>
            </div>
          </div>

          {/* Booking Form */}
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex gap-4">
              <select className="p-2 border border-gray-300 rounded-lg"
                      onChange={handleFieldChange}
                      value={selectedField}>

                {venue.fields.map((field, i) => (
                    <option key={i} value={field.type}>
                      {field.type}
                    </option>
                ))}
              </select>
              <select className="p-2 border border-gray-300 rounded-lg">
                {scheduleData
                    .filter((day) =>
                        selectedFieldSchedules.some(
                            (s) => s.date === day.date && s.status === 'available'
                        )
                    )
                    .map((availableDay, idx) => (
                        <option key={idx} value={availableDay.date}>
                          {availableDay.day}
                        </option>
                    ))}
              </select>

              <select className="p-2 border border-gray-300 rounded-lg">
                {timeSlots
                    .filter((slot) =>
                        selectedFieldSchedules.some(
                            (s) => s.timeSlot === slot.time && s.status === 'available'
                        )
                    )
                    .map((availableSlot, idx) => (
                        <option key={idx} value={availableSlot.time}>
                          {availableSlot.time}
                        </option>
                    ))}
              </select>
            </div>
            <button className="bg-[#E7FF8C] text-gray-800 hover:bg-[#d9ff66] p-2 rounded-lg">
              Book Now
            </button>
          </div>

          {/* Schedule Section */}
          <div className="mb-12 p-6 bg-[#E6FDA3]">
            <h3 className="text-lg font-semibold mb-4">Check Available Schedule</h3>
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                <div className="grid grid-cols-8 gap-2 mb-4">
                  <div className="font-medium">Time</div>
                  {/* Pemetaan hari dengan background bg-[#E6FDA3] */}
                  {scheduleData.map((day) => (
                      <div key={day.day} className="text-center bg-[#F5F5F5] p-4 rounded-lg">
                        <div className="font-medium">{day.day}</div>
                        <div className="text-sm text-gray-500">{day.dayName}</div>
                      </div>
                  ))}
                </div>

                {timeSlots.map((slot, idx) => (
                    <div key={idx} className="grid grid-cols-8 gap-2 mb-2">
                      <div className="font-medium">{slot.time}</div>
                      {scheduleData.map((day, i) => {
                        // Find the schedule that matches both timeSlot and date
                        const schedule = selectedFieldSchedules.find(
                            (s) => s.timeSlot === slot.time && s.date === day.date
                        );

                        // Determine availability based on status
                        const isAvailable = schedule?.status === 'available';

                        return (
                            <div
                                key={i}
                                className={`p-2 rounded-lg flex justify-center items-center ${
                                    isAvailable ? 'bg-[#F5F5F5] text-black' : 'bg-[#F8B6B6] text-[#a83434]'
                                }`}
                            >
                              <div className="text-center">
                                <div className="text-sm font-medium">{slot.price}</div>
                                <div className="text-xs">{isAvailable ? 'Available' : 'Not Available'}</div>
                              </div>
                            </div>
                        );
                      })}
                    </div>
                ))}

              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mb-8 p-6 bg-white shadow-lg rounded-lg">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">{venue.rating}</h2>
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`w-5 h-5 ${i < venue.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                ))}
              </div>
              <p className="text-sm text-gray-500">based on {allReviews.length} reviews</p>
            </div>

            {/* Rating Bars */}
            <div className="space-y-4 mb-8">
              {venue.fields.map((field) => {
                // Calculate the average rating for the current field
                const totalReviews = field.reviews.length;
                const averageRating =
                    totalReviews > 0
                        ? field.reviews.reduce((sum, review) => sum + review.rating, 0) /
                        totalReviews
                        : 0;

                return (
                    <div key={field.id} className="space-y-1">
                      <div className="text-sm font-medium">{field.type}</div>
                      {/* Display the average rating as the progress bar value */}
                      <ProgressBar value={averageRating * 20}/>
                    </div>
                );
              })}
            </div>


            <div className="mb-8 p-6 bg-white shadow-lg rounded-lg">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Reviews</h2>
              </div>

              {/* Display Current Reviews */}
              <div className="space-y-4 mb-8">
                {currentReviews.map((review, idx) => {
                  // Find the field type for the current review
                  const fieldType = venue.fields.find((field) => field.id === review.field_id)?.type;

                  return (
                      <div key={idx} className="p-4 bg-white shadow-md rounded-lg mb-4">
                        <div className="flex items-start gap-4">
                          {/* Dynamically set the avatar or use a default */}
                          <img
                              src={avatar1} // Use a default avatar
                              alt="User Avatar"
                              width={48}
                              height={48}
                              className="rounded-full"
                          />

                          <div>
                            <div className="font-medium">{`Username: ${review.user_id || 'undefined'}`}</div>
                            {/* Display the field type */}
                            <div className="text-sm text-gray-500">{fieldType}</div>
                            <div className="flex mb-1">
                              {[...Array(5)].map((_, i) => (
                                  <Star
                                      key={i}
                                      className={`w-4 h-4 ${
                                          i < review.rating
                                              ? 'fill-yellow-400 text-yellow-400'
                                              : 'text-gray-300'
                                      }`}
                                  />
                              ))}
                            </div>
                            <p className="text-sm font-medium">{review.comment}</p>
                          </div>
                        </div>
                      </div>
                  );
                })}
              </div>

              {/* Pagination Controls */}
              <div className="flex justify-center items-center space-x-4">
                <button
                    className={`px-4 py-2 rounded-lg ${
                        currentPage === 1
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                  Previous
                </button>
                <p className="text-sm font-medium">
                  Page {currentPage} of {totalPages}
                </p>
                <button
                    className={`px-4 py-2 rounded-lg ${
                        currentPage === totalPages
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                    onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>

            <button className="w-full bg-[#E7FF8C] text-gray-800 hover:bg-[#d9ff66] p-2 rounded-lg">
              Write a Review
            </button>
          </div>
        </div>
      </div>
  );
}
