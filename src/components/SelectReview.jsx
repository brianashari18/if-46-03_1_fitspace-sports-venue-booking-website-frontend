import { useState } from "react";
import profile from "../assets/profile.png";

const facilities = ["Futsal", "Basketball", "Badminton", "Voli"];

const SelectReview = () => {
  const [selectedFacility, setSelectedFacility] = useState(null);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-center">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-12">
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 rounded-full overflow-hidden mb-2">
              <img
                src={profile}
                alt="Profile"
                className="w-38 h-38 object-cover"
              />
            </div>
            <h2 className="text-2xl font-semibold">Bobby</h2>
          </div>

          <div className="space-y-8">
            <h1 className="text-2xl font-bold text-center">
              What facility would you like to review?
            </h1>
            <div className="flex flex-wrap justify-center gap-6">
              {facilities.map((facility) => (
                <button
                  key={facility}
                  className={`px-8 py-3 rounded-full ${
                    selectedFacility === facility
                      ? "bg-[#E7FF8C] text-black hover:bg-[#E7FF8C]/90"
                      : "border-2"
                  }`}
                  onClick={() => setSelectedFacility(facility)}
                >
                  {facility}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Centered buttons with spacing between */}
        <div className="flex justify-between items-center mt-12 max-w-2xl mx-auto w-full">
          <button className="bg-[#E7FF8C] text-black hover:bg-[#E7FF8C]/90 rounded-full px-10 py-4">
            Back
          </button>
          <button className="bg-[#E7FF8C] text-black hover:bg-[#E7FF8C]/90 rounded-full px-10 py-4">
            Next
          </button>
        </div>
      </main>
    </div>
  );
};

export default SelectReview;
