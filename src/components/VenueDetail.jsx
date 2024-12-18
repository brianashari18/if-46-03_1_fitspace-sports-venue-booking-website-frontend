import { useState } from 'react';
import { Star } from 'lucide-react'; // Assuming lucide-react is needed for stars
import progresif from '../assets/progresif.png'; // Example image import
import locationmap from '../assets/locationmap.png'; // Example location map image import
import avatar1 from '../assets/avatar1.png'; // Example avatar image import
import avatar2 from '../assets/avatar2.png'; // Import avatar2
import avatar3 from '../assets/avatar3.png'; // Import avatar3

const scheduleData = [
  { day: '11 Nov', dayName: 'Monday' },
  { day: '12 Nov', dayName: 'Tuesday' },
  { day: '13 Nov', dayName: 'Wednesday' },
  { day: '14 Nov', dayName: 'Thursday' },
  { day: '15 Nov', dayName: 'Friday' },
  { day: '16 Nov', dayName: 'Saturday' },
  { day: '17 Nov', dayName: 'Sunday' },
];

const timeSlots = [
  { time: '06.00 - 07.00', price: 'Rp120.000' },
  { time: '07.00 - 08.00', price: 'Rp120.000' },
  { time: '08.00 - 09.00', price: 'Rp120.000' },
];

const facilityRatings = [
  { name: 'Lapangan Bola', value: 90 },
  { name: 'Futsal', value: 85 },
  { name: 'Badminton', value: 70 },
  { name: 'Kolam Renang', value: 50 },
];

const reviews = [
  {
    name: 'Unknown',
    rating: 5,
    comment: 'Lapangan futsal GOR Bandung',
    subComment: 'kocak bangett ini lapangan',
    avatar: avatar1,  // Directly set the imported avatar image
  },
  {
    name: 'Unknown',
    rating: 4,
    comment: 'Lapangan futsal GOR Bandung',
    subComment: 'hmmm lapangan ini',
    avatar: avatar2,  // Directly set the imported avatar image
  },
  {
    name: 'Unknown',
    rating: 5,
    comment: 'Lapangan futsal GOR Bandung',
    subComment: 'wow bangett ini ',
    avatar: avatar3,  // Directly set the imported avatar image
  },
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
              PROGRESIF SPORT CENTRE
            </h1>
            <p className="text-white/90 mb-6">
              Jl. Suryalaya Indah No.1-5 Cigadung, Kec. Lengkong, Kota Bandung, Jawa Barat 40265
            </p>
            <div className="flex flex-wrap gap-3">
              {['Futsal', 'Badminton', 'Kolam Renang', 'Lapang Bola', 'Galerry'].map((tag) => (
                <span
                  key={tag}
                  className={`px-4 py-1 rounded-full text-sm ${tag === 'Galerry' ? 'bg-[#738FFD] text-white' : 'bg-[#E7FF8C] text-gray-800'}`}
                >
                  {tag}
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
            <img
              src={locationmap}
              alt="Location Map"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Booking Form */}
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex gap-4">
            <select className="p-2 border border-gray-300 rounded-lg">
              <option>Futsal</option>
              <option>Badminton</option>
              <option>Kolam Renang</option>
            </select>
            <select className="p-2 border border-gray-300 rounded-lg">
              {scheduleData.map((day) => (
                <option key={day.day}>{day.day}</option>
              ))}
            </select>
            <select className="p-2 border border-gray-300 rounded-lg">
              {timeSlots.map((slot) => (
                <option key={slot.time}>{slot.time}</option>
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
                  {[...Array(7)].map((_, i) => {
                    const isBooked = Math.random() > 0.7; // Randomly decide if the slot is booked
                    return (
                      <div
                        key={i}
                        className={`p-2 rounded-lg ${isBooked ? 'bg-[#F8B6B6] text-[#a83434]' : 'bg-[#F5F5F5]'}`}
                      >
                        <div className="text-sm font-medium">{slot.price}</div>
                        <div className="text-xs">{isBooked ? 'Booked' : 'Available'}</div>
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
            <h2 className="text-3xl font-bold mb-2">4.0</h2>
            <div className="flex justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-500">based on 23 reviews</p>
          </div>

        {/* Rating Bars */}
        <div className="space-y-4 mb-8">
        {facilityRatings.map((item) => (
            <div key={item.name} className="space-y-1">
            <div className="text-sm font-medium">{item.name}</div>
            <ProgressBar value={item.value} />
            </div>
        ))}
        </div>


            {/* Review Cards */}
            <div className="space-y-4 mb-8">
            {reviews.map((review, idx) => (
                <div key={idx} className="p-4 bg-white shadow-md rounded-lg mb-4">
                <div className="flex items-start gap-4">
                    {/* Dynamically set the avatar for each review */}
                    <img
                    src={review.avatar} // Directly use the imported avatar
                    alt={review.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                    />
                    
                    <div>
                    <div className="font-medium">{review.name}</div>
                    <div className="flex mb-1">
                        {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                        />
                        ))}
                    </div>
                    <p className="text-sm font-medium">{review.comment}</p>
                    <p className="text-sm text-gray-500">{review.subComment}</p>
                    </div>
                </div>
                </div>
            ))}
            </div>

          <button className="w-full bg-[#E7FF8C] text-gray-800 hover:bg-[#d9ff66] p-2 rounded-lg">
            Write a Review
          </button>
        </div>
      </div>
    </div>
  );
}
