import { useNavigate } from "react-router-dom";
import logo from "../assets/yellow-logo.png";
import axios from "axios";

const Navbar = ({ user, onLogout }) => {
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
        <section className="bg-primary flex justify-between items-center px-10 py-5">
            <div className="text-primary2 flex justify-start gap-16">
                <a href="/home">
                    <img src={logo} alt="navbar" className="w-20 h-auto object-cover" />
                </a>
                <a href="/home">
                    <button className="font-poppins">Home</button>
                </a>
                <a href="/venue">
                    <button className="font-poppins">Venue</button>
                </a>
                <a href="/about-us">
                    <button className="font-poppins">About Us</button>
                </a>
                <a href="/contact-us">
                    <button className="font-poppins">Contact Us</button>
                </a>
            </div>
            <div className="text-primary2 flex justify-center gap-5">
                {user ? (
                    <>
                        <span className="font-poppins p-2 text-[#f5f5f5]">{user.email}</span>
                        <button
                            onClick={handleLogout}
                            className="font-poppins p-2 hover:bg-red-500 text-red-600"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <a href="/sign-in">
                            <button className="font-poppins p-2">Sign In</button>
                        </a>
                        <a href="/sign-up">
                            <button className="text-hitam font-poppins font-bold rounded-lg px-3 py-2 hover:bg-secondaryK bg-primary2">
                                Sign Up
                            </button>
                        </a>
                    </>
                )}
            </div>
        </section>
    );
};

export default Navbar;
