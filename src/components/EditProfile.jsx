import { useState, useEffect } from "react";

import Profile from "../assets/Profile.png";
import SideBar from "./SideBar.jsx";
import {updateProfile} from "../services/user-service.js";

const EditProfile = ({ onLogout, user, onUserUpdate }) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [emailError, setEmailError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");

  const [isUpdate, setIsUpdate] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (user) {
      setEmail(user.email || "");
      setFirstName(user.first_name || "");
      setLastName(user.last_name || "");
    }
  }, [user]);

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdate(true);

    // Reset errors
    setEmailError("");
    setFirstNameError("");

    // Validasi input
    let isValid = true;

    if (firstName.trim() === "") {
      setFirstNameError("First name is required");
      isValid = false;
    }

    if (email.trim() === "" || !isValidEmail(email)) {
      setEmailError("Enter a valid email address");
      isValid = false;
    }

    if (!isValid) {
      setIsUpdate(false);
      return;
    }

    // Data yang akan dikirim ke server
    const profileData = {
      first_name: firstName,
      last_name: lastName,
    };

    try {
      const token = localStorage.getItem("token"); // Ambil token dari localStorage
      const response = await updateProfile(token, profileData);

      if (response) {
        // Update state di komponen induk
        const updatedUser = { ...user, ...profileData };
        onUserUpdate(updatedUser); // Update state di App
        localStorage.setItem("user", JSON.stringify(updatedUser)); // Update localStorage

        setSuccessMessage("Profile updated successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
      }

    } catch (error) {
      alert(error.message || "Failed to update profile.");
    } finally {
      setIsUpdate(false);
    }
  };


  return (
      <div className="flex justify-start h-screen bg-[#F5F5F5]">
        {/*Menu*/}
        <SideBar onLogout={onLogout}/>

        <div className="p-6 w-full">
          <h1 className="text-2xl font-bold text-black text-start mb-6 ml-36">
            Edit Profile
          </h1>
          <div
              className="bg-white rounded-lg shadow-xl w-full sm:w-2/4 md:w-1/3 lg:w-1/2 xl:w-[60rem] h-[40rem] flex flex-wrap ml-36">
            <div className="w-full h-48 border-b-[1px] border-gray-900 border-opacity-35 shadow-lg p-6">
              <p className="text-start text-gray-400 font-medium ml-[6rem]">
                Your Profile
              </p>
              <img src={Profile} alt="Profile" className="w-28 h-28 mt-3 ml-20"/>
            </div>

            {/* Success Message */}
            {successMessage && (
                <div
                    className="w-full bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-lg text-center my-4">
                  <p>{successMessage}</p>
                </div>
            )}

            <div className="w-full border text-center h-[calc(100%-12rem)] flex justify-center items-center">
              <form className="w-[40rem] h-full flex flex-wrap items-center">
                <div className="flex items-center w-full mt-20">
                  <label
                      htmlFor="email"
                      className="w-1/6 text-left mr-5 text-gray-500 font-medium"
                  >
                    Email
                  </label>
                  <input
                      id="email"
                      type="email"
                      placeholder="Email"
                      className="w-3/4 p-3 rounded-lg bg-[#738FFD] bg-opacity-35 placeholder-gray-500 border-[#738FFD] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={email}
                      readOnly
                  />
                </div>
                {emailError && (
                    <div className="text-sm text-red-600 mb-2">{emailError}</div>
                )}

                <div className="flex items-center w-full">
                  <label
                      htmlFor="firstName"
                      className="w-1/6 text-left mr-5 text-gray-500 font-medium"
                  >
                    First Name
                  </label>
                  <input
                      id="firstName"
                      type="text"
                      placeholder="First Name"
                      className="w-3/4 p-3 rounded-lg bg-[#738FFD] bg-opacity-35 placeholder-gray-500 border-[#738FFD] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                {firstNameError && (
                    <div className="text-sm text-red-600 mb-3">
                      {firstNameError}
                    </div>
                )}

                <div className="flex items-center w-full mb-10">
                  <label
                      htmlFor="lastName"
                      className="w-1/6 text-left mr-5 text-gray-500 font-medium"
                  >
                    Last Name
                  </label>
                  <input
                      id="lastName"
                      type="text"
                      placeholder="Last Name"
                      className="w-3/4 p-3 rounded-lg bg-[#738FFD] bg-opacity-35 placeholder-gray-500 border-[#738FFD] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                  />
                </div>

                <div className="w-full flex justify-end mb-20 mr-8">
                  <button
                      type="button"
                      className="w-60 p-3 rounded-lg bg-[#E6FDA3] text-[#738ffd] font-semibold hover:bg-[#F2FA5A] transition"
                      disabled={isUpdate}
                      onClick={handleSubmit}
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>


  );
};

export default EditProfile;
