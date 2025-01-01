import { useState } from "react";
import Profile from "../assets/Profile.png";
import SideBar from "./SideBar.jsx";
import { changePassword } from "../services/auth-service.js";

const ChangePassword = ({ onLogout, user }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [currentPasswordError, setCurrentPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState("");

  const [isUpdate, setIsUpdate] = useState(false);

  const [successMessage, setSuccessMessage] = useState(""); // Add success message state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdate(true);

    // Reset errors
    setCurrentPasswordError("");
    setNewPasswordError("");
    setConfirmNewPasswordError("");

    // Validasi input
    let isValid = true;

    if (currentPassword.trim() === "") {
      setCurrentPasswordError("Password cannot be empty");
      isValid = false;
    }

    if (newPassword.trim() === "") {
      setNewPasswordError("Password cannot be empty");
      isValid = false;
    } else if (newPassword.length < 8 || newPassword.length > 100) {
      setNewPasswordError("Password must be between 8 and 100 characters");
      isValid = false;
    }

    if (confirmNewPassword.trim() === "") {
      setConfirmNewPasswordError("Confirm Password cannot be empty");
      isValid = false;
    } else if (confirmNewPassword.length < 8 || confirmNewPassword.length > 100) {
      setConfirmNewPasswordError("Confirm Password must be between 8 and 100 characters");
      isValid = false;
    }

    if (newPassword !== confirmNewPassword) {
      setConfirmNewPasswordError("Passwords do not match");
      isValid = false;
    }

    if (!isValid) {
      setIsUpdate(false);
      return;
    }

    const userData = {
      current_password: currentPassword,
      new_password: newPassword,
      confirmation_password: confirmNewPassword,
    };

    try {
      const response = await changePassword(userData);
      if (response.status === 200) {
        setSuccessMessage("Password changed successfully!"); // Set success message
        setTimeout(() => setSuccessMessage(""), 3000); // Clear the success message after 3 seconds
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      } else {
        setCurrentPasswordError(response.data.errors);
      }
    } catch (error) {
      alert(error);
    }
    setIsUpdate(false);
  };

  return (
      <div className="flex justify-start h-screen bg-[#F5F5F5]">
        {/*Menu*/}
        <SideBar onLogout={onLogout} />

        <div className="p-6">
          <h1 className="text-2xl font-bold text-black text-start mb-6 ml-36">
            Change Password
          </h1>
          <div className="bg-white rounded-lg shadow-xl w-full sm:w-2/4 md:w-1/3 lg:w-1/2 xl:w-[60rem] h-[40rem] flex flex-wrap ml-36">
            <div className="w-full h-48 border-b-[1px] border-gray-900 border-opacity-35 shadow-lg p-6 flex items-center">
              {/* Profile Image */}
              <img
                  src={Profile}
                  alt="Profile"
                  className="w-28 h-28 ml-16"
              />

              {/* User Details */}
              <div className="ml-6 w-full">
                <p className="text-xl text-black font-bold">
                  {user.first_name} {user.last_name}
                </p>
                <p className="text-sm text-gray-400 font-semibold mt-2">{user.email}</p>
              </div>
            </div>

            <div className="w-full h-[calc(100%-12rem)] flex flex-col items-center justify-center px-4">
              {/* Header Section */}
              <div className="w-full max-w-3xl mb-6">
                <h1 className="text-2xl font-bold text-black text-start mb-2">
                  Password
                </h1>
                <p className="text-sm font-medium text-gray-400 text-start">
                  Please enter your current password to change your password
                </p>
              </div>

              {/* Form Section */}
              <form className="w-full max-w-3xl space-y-6">
                {/* Input Current Password */}
                <div className="flex items-center">
                  <label
                      htmlFor="currentPassword"
                      className="w-1/3 text-left pr-4 text-gray-500 font-medium"
                  >
                    Current Password
                  </label>
                  <div className="w-3/4">
                    <input
                        type="password"
                        id="currentPassword"
                        placeholder="Current Password"
                        className="w-full p-3 rounded-lg bg-[#738FFD] bg-opacity-35 placeholder-gray-500 border-[#738FFD] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    {currentPasswordError && (
                        <div className="text-sm text-red-600 mt-1">
                          {currentPasswordError}
                        </div>
                    )}
                  </div>
                </div>

                {/* Input New Password */}
                <div className="flex items-center">
                  <label
                      htmlFor="newPassword"
                      className="w-1/3 text-left pr-4 text-gray-500 font-medium"
                  >
                    New Password
                  </label>
                  <div className="w-3/4">
                    <input
                        type="password"
                        id="newPassword"
                        placeholder="New Password"
                        className="w-full p-3 rounded-lg bg-[#738FFD] bg-opacity-35 placeholder-gray-500 border-[#738FFD] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    {newPasswordError && (
                        <div className="text-sm text-red-600 mt-1">
                          {newPasswordError}
                        </div>
                    )}
                  </div>
                </div>

                {/* Input Confirm New Password */}
                <div className="flex items-center">
                  <label
                      htmlFor="confirmNewPassword"
                      className="w-1/3 text-left pr-4 text-gray-500 font-medium"
                  >
                    Confirm New Password
                  </label>
                  <div className="w-3/4">
                    <input
                        type="password"
                        id="confirmNewPassword"
                        placeholder="Confirm New Password"
                        className="w-full p-3 rounded-lg bg-[#738FFD] bg-opacity-35 placeholder-gray-500 border-[#738FFD] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                    {confirmNewPasswordError && (
                        <div className="text-sm text-red-600 mt-1">
                          {confirmNewPasswordError}
                        </div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                  <button
                      type="button"
                      className="w-1/4 p-3 rounded-lg bg-[#E6FDA3] text-[#738ffd] font-semibold hover:bg-[#F2FA5A] transition"
                      disabled={isUpdate}
                      onClick={handleSubmit}
                  >
                    Update
                  </button>
                </div>
              </form>

              {/* Success Message */}
              {successMessage && (
                  <div className="w-full text-center mt-4 text-green-600">
                    <p>{successMessage}</p>
                  </div>
              )}
            </div>
          </div>
        </div>
      </div>
  );
};

export default ChangePassword;
