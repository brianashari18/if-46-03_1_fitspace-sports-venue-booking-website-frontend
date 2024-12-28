import { useState } from "react";
import profile from "../assets/profile.png";

const WriteReview = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [file, setFile] = useState(null);

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100 py-10 px-4">
      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center">
        <div className="w-full max-w-xl bg-white rounded-3xl shadow-lg p-12">
          {/* Profile Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 rounded-full overflow-hidden mb-2">
              <img
                src={profile}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">Bobby</h2>
          </div>

          {/* Rating Section */}
          <div className="text-center mb-6">
            <h1 className="text-lg font-bold text-gray-800">How was the facility?</h1>
            <div className="flex justify-center mt-4 space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-3xl ${
                    rating >= star ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          {/* Review Input */}
          <div className="mb-6">
            <textarea
              placeholder="Would you like to write anything about this?"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full h-28 border border-gray-300 rounded-lg p-3 text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-300"
            ></textarea>
          </div>

          {/* File Upload */}
          <div className="text-center mb-6">
            <label
              htmlFor="file-upload"
              className="cursor-pointer px-6 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-700"
            >
              {file ? file.name : "Click here to upload"}
            </label>
            <input
              id="file-upload"
              type="file"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-10 w-full max-w-xl">
          <button className="bg-[#E7FF8C] text-black hover:bg-[#E7FF8C]/90 rounded-full px-8 py-3">
            Back
          </button>
          <button className="bg-[#E7FF8C] text-black hover:bg-[#E7FF8C]/90 rounded-full px-8 py-3">
            Submit Review
          </button>
        </div>
      </main>
    </div>
  );
};

export default WriteReview;
