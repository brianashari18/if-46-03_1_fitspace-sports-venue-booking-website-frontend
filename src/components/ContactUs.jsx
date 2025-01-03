import React, { useState } from "react";

const ContactUs = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <section className="">
            <div className="bg-primary2 px-14 py-14">
                <h1 className="flex font-poppins justify-center text-3xl space-x-10">
                    ANY QUESTION TO
                    <span className="font-poppins font-bold text-3xl ml-2">FITSPACE</span>
                </h1>
            </div>
            <div className="h-screen flex items-center justify-center bg-putih">
                <div className="w-[80%] max-w-5xl h-[30rem] flex rounded-l-lg shadow-lg">
                    <div className="w-1/2 bg-white flex flex-col justify-center items-center rounded-l-lg p-6">
                        <h1 className="text-3xl font-bold mb-10 text-hitam-800">Contact Us</h1>
                        <form onSubmit={handleSubmit} className="w-full space-y-4">
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                className="w-full border border-gray-300 rounded-3xl p-3 focus:outline-primary focus:ring-primary mb-6 font-poppins"
                            />
                            <input
                                type="text"
                                placeholder="Name"
                                required
                                className="w-full border border-gray-300 rounded-3xl p-3 focus:outline-primary focus:ring-primary mb-6 font-poppins"
                            />
                            <textarea
                                placeholder="Description"
                                required
                                className="w-full border border-gray-300 rounded-3xl p-3 focus:outline-primary focus:ring-primary mb-6 font-poppins"
                            ></textarea>
                            <button
                                type="submit"
                                className="w-full border text-putih bg-primary border-gray-300 rounded-3xl p-3 focus:outline-primary focus:ring-primary font-poppins"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                    <div className="w-1/2 bg-primary text-white flex flex-col justify-center rounded-r-lg p-10">
                        <h2 className="font-poppins text-3xl font-bold mb-4">Contact with Fitspace Team</h2>
                        <p className="font-poppins text-sm mb-4 text-putih font-semibold">
                            Got questions, suggestions, or need assistance? We’re here to help!
                        </p>
                        <p className="font-poppins text-sm leading-6 text-putih">
                            Our team at FitSpace is dedicated to ensuring your experience is smooth
                            and hassle-free. Whether you need help with bookings, have feedback to
                            share, or just want to learn more about our services, don’t hesitate to
                            reach out.
                        </p>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-8 shadow-lg text-center">
                        <h2 className="text-2xl font-bold mb-4">Email Successfully Sent</h2>
                        <p className="mb-6">Thank you for reaching out to us. We will get back to you shortly.</p>
                        <button
                            onClick={closeModal}
                            className="px-6 py-2 bg-primary text-white rounded-3xl font-poppins"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ContactUs;
