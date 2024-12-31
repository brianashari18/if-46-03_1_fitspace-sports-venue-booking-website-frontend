import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {useState} from "react";

import Venues from "./components/Venues";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ForgotPassword from "./components/ForgotPassword";
import VerificationCode from "./components/VerificationCode";
import ResetPassword from "./components/ResetPassword";
import ResetSuccess from "./components/ResetSuccess";
import EditProfile from "./components/EditProfile";
import ChangePassword from "./components/ChangePassword";
import Order from "./components/Order";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Homepage from "./components/Homepage.jsx";
import WriteReview from "./components/WriteReview.jsx";
import ReviewSuccess from "./components/ReviewSuccess.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import VenueDetail from "./components/VenueDetail.jsx";
import Payment from "./components/Payment.jsx";

function App() {
    // State global untuk user
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const handleLogin = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        console.log(`DATA: ${JSON.stringify(userData)}`);
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("expired_at");
    };

    return (<Router>
        <div className="min-h-screen bg-gray-100">
            {/* Navbar menerima user dan handleLogout sebagai props */}
            <Navbar user={user}/>
            {/* Define Routes */}
            <Routes>
                <Route
                    path="/sign-in"
                    element={<SignIn onLogin={handleLogin}/>}
                />
                <Route path="/sign-up" element={<SignUp onLogin={handleLogin}/>}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
                <Route path="/verification-code" element={<VerificationCode/>}/>
                <Route path="/reset-success" element={<ResetSuccess/>}/>
                <Route path="/reset-password" element={<ResetPassword/>}/>
                <Route path="/" element={<SignIn onLogin={handleLogin}/>}/>

                {/* <Route element={<ProtectedRoute/>}> */}
                    <Route path="/about-us" element={<AboutUs/>}/>
                    <Route path="/contact-us" element={<ContactUs/>}/>
                    <Route path="/venue" element={<Venues/>}/>
                    <Route path="/venueDetail/:name" element={<VenueDetail/>}/>
                    <Route path="/edit-profile" element={<EditProfile onLogout={handleLogout} user={user}/>}/>
                    <Route path="/change-password" element={<ChangePassword onLogout={handleLogout} user={user}/>}/>
                    <Route path="/order" element={<Order onLogout={handleLogout}/>}/>
                    <Route path="/home" element={<Homepage/>}/>
                    <Route path="/write-review" element={<WriteReview/>}/>
                    <Route path="/review-success" element={<ReviewSuccess/>}/>
                    <Route path="/payment" element={<Payment/>}/>                        
                {/* </Route> */}
                {/* Or any default route */}
            </Routes>

            {/* Footer */}
            <Footer/>
        </div>
    </Router>);
}

export default App;