import React, { useState } from "react";

const Review = () => {
  const [reviewStatus, setReviewStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = Math.random() > 0.5; // Simulasi sukses/gagal
    setReviewStatus(success ? "success" : "fail");
  };

  return (
    <section className="p-4 bg-white">
      <h2 className="text-xl font-semibold mb-4">Write a Review</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          placeholder="Write your review here..."
          className="border rounded p-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Submit Review
        </button>
      </form>

      {/* Popup Status */}
      {reviewStatus && (
        <div className="mt-4 p-4 rounded shadow text-center">
          {reviewStatus === "success" ? (
            <div className="text-green-500 font-semibold">
              ✅ Review Submitted!
            </div>
          ) : (
            <div className="text-red-500 font-semibold">
              ❌ Submit Failed. Try Again!
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Review;