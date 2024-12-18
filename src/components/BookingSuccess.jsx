import SMS from "../assets/SMS.png";
import { useState } from "react";
import { Link } from "react-router-dom";

const BookingSuccess = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-16 mt-16">
        <h1 className="text-4xl font-bold text-center mb-12">
          BOOKING SUCCESSFULL
        </h1>

        <div className="max-w-2xl mx-auto bg-[#738FFD] rounded-lg p-8 text-center text-white">
        <div className="flex justify-center mb-6">
            <img src={SMS} alt="Success Icon" className="w-16 h-16" />
        </div>
          <h2 className="text-3xl font-bold mb-4">Lorem Ipsum</h2>
          <p className="text-sm leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec
            odio enim. Nullam pellentesque mauris quis tristique sollicitudin.
            Maecenas ac lacus eget mi condimentum pretium ac quis mi. Fusce
            viverra a ante at tempor. Nam feugiat at enim scelerisque semper.
            Phasellus sit amet finibus arcu. Phasellus sed ultricies libero, ac
            iaculis purus. Phasellus.
          </p>
        </div>
      </main>
    </div>
  );
};

export default BookingSuccess;

