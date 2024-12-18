import { useState } from "react";
import ProfileIcon from "../assets/ProfileIcon.png";
import OrderIcon from "../assets/OrderIcon.png";
import AddVenue from "../assets/AddVenue.png";
import ChangePass from "../assets/ChangePass.png";
import LogOutIcon from "../assets/LogOutIcon.png";
import Profile from "../assets/Profile.png";

const EditProfile = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [emailError, setEmailError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");

  const [isUpdate, setIsUpdate] = useState(false);

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
  };

  return (
    <div className="flex justify-start h-screen bg-[#F5F5F5]">
      {/*Menu*/}
      <div className="bg-white border w-full h-full rounded-lg shadow-xl sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-[25rem] p-6">
        <h1 className="text-xl font-bold text-gray-400 text-start mb-6 ml-3 mt-5">
          Profile
        </h1>
        <div className="flex flex-col space-y-4">
          <button className="font-semibold flex items-center px-5 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
            <img src={ProfileIcon} alt="Edit Icon" className="w-6 h-6 mr-3" />
            Edit Profile
          </button>
          <button className="font-semibold flex items-center px-5 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
            <img src={OrderIcon} alt="Order Icon" className="w-6 h-6 mr-3" />
            Order
          </button>
          <button className="font-semibold flex items-center px-5 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
            <img src={AddVenue} alt="Store Icon" className="w-6 h-6 mr-3" />
            Venue
          </button>
        </div>

        <h1 className="text-xl font-bold text-gray-400 text-start mt-28 mb-6 ml-3">
          Secure
        </h1>
        <div className="flex flex-col space-y-4">
          <button className="font-semibold flex items-center px-5 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
            <img
              src={ChangePass}
              alt="Change Password"
              className="w-6 h-6 mr-3"
            />
            Change Password
          </button>
          <button className="font-semibold flex items-center px-5 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
            <img src={LogOutIcon} alt="Log Out" className="w-6 h-6 mr-3" />
            Log Out
          </button>
        </div>
      </div>

      <div className="p-6">
        <h1 className="text-2xl font-bold text-black text-start mb-6 ml-36">
          Edit Profile
        </h1>
        <div className="bg-white rounded-lg shadow-xl w-full sm:w-2/4 md:w-1/3 lg:w-1/2 xl:w-[60rem] h-[40rem] flex flex-wrap ml-36">
          <div className="w-full h-48 border-b-[1px] border-gray-900 border-opacity-35 shadow-lg p-6">
            <p className="text-start text-gray-400 font-medium ml-[6rem]">
              Your Profile
            </p>
            <img src={Profile} alt="Profile" className="w-28 h-28 mt-3 ml-20"/>
          </div>

          <div className="w-full border text-center h-[calc(100%-12rem)] flex justify-center item ">
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
                  onChange={(e) => setEmail(e.target.value)}
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
