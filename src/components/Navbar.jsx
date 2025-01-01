import { useNavigate } from "react-router-dom";
import logo from "../assets/yellow-logo.png";
import iconProfile from "../assets/user-icon.png";

    const Navbar = ({ user }) => {
        const navigate = useNavigate();

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
                <div className="text-primary2 flex justify-center gap-5 items-center">
                    {user ? (
                        <>
                            <button
                                onClick={() => navigate("/edit-profile")}
                                className="flex items-center gap-2 hover:underline"
                            >
                                <img
                                    src={iconProfile}
                                    alt="profile"
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                                <span className="font-poppins p-2 text-[#f5f5f5]">{user.email}</span>
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
