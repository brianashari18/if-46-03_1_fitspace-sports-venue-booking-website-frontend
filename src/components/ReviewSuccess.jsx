import React from "react";

const ReviewSuccess = () => {
  const handleOkClick = () => {
    // Tambahkan logika jika diperlukan (misalnya navigasi ke halaman lain)
    console.log("OK clicked");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-lg p-12 max-w-md w-full text-center">
        <div className="flex justify-center mb-9">
          <div className="w-32 h-32 bg-blue-200 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-blue-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-4">Review Submitted</h1>
        <button
          onClick={handleOkClick}
          className="bg-[#E6FDA3] text-black px-8 py-2 rounded-full hover:bg-[#E6FDA3]"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default ReviewSuccess;
