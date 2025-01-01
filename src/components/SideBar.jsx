import {Link, useNavigate} from "react-router-dom";
import ProfileIcon from "../assets/ProfileIcon.png";
import OrderIcon from "../assets/OrderIcon.png";
import AddVenue from "../assets/AddVenue.png";
import ChangePass from "../assets/ChangePass.png";
import LogOutIcon from "../assets/LogOutIcon.png";
import axios from "axios";

const SideBar = ({onLogout}) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const token = localStorage.getItem("token");

        try {
            await axios.delete("http://localhost:8080/api/auth/logout", {
                headers: {
                    Authorization: token,
                },
            });

            localStorage.removeItem("token");
            localStorage.removeItem("tokenType");

            onLogout();

            navigate("/sign-in");
        } catch (error) {
            console.error("Failed to logout:", error);
            alert("Logout failed. Please try again.");
        }
    };

    return (
        <div className="min-h-svh bg-white border w-full h-full rounded-lg shadow-xl sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-[25rem] p-6">
            <h1 className="text-xl font-bold text-gray-400 text-start mb-6 ml-3 mt-5">
                Profile
            </h1>
            <div className="flex flex-col space-y-4">
                <Link to="/edit-profile"
                    className="font-semibold flex items-center px-5 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                    <img src={ProfileIcon} alt="Edit Icon" className="w-6 h-6 mr-3"/>
                    Edit Profile
                </Link>
                <Link to="/order"
                    className="font-semibold flex items-center px-5 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                    <img src={OrderIcon} alt="Order Icon" className="w-6 h-6 mr-3"/>
                    Order
                </Link>
                <Link to="/my-venue"
                    className="font-semibold flex items-center px-5 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                    <img src={AddVenue} alt="Store Icon" className="w-6 h-6 mr-3"/>
                    Venue
                </Link>
            </div>

            <h1 className="text-xl font-bold text-gray-400 text-start mt-28 mb-6 ml-3">
                Secure
            </h1>
            <div className="flex flex-col space-y-4">
                <Link to="/change-password"
                      className="font-semibold flex items-center px-5 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                    <img
                        src={ChangePass}
                        alt="Change Password"
                        className="w-6 h-6 mr-3"
                    />
                    Change Password
                </Link>
                <button onClick={handleLogout}
                        className="font-semibold flex items-center px-5 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                    <img src={LogOutIcon} alt="Log Out" className="w-6 h-6 mr-3"/>
                    Log Out
                </button>
            </div>
        </div>
    );
};

export default SideBar;