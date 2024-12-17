import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Venues from "./components/Venues";
import About from "./components/About";
import HowItWorks from "./components/HowItWorks";
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
import BookingSuccess from "./components/BookingSuccess";
import VenueDetail from "./components/VenueDetail";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Navbar will be outside of the Routes */}
        <Navbar />

        {/* Define Routes */}
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verification-code" element={<VerificationCode />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/reset-success" element={<ResetSuccess />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/order" element={<Order />} />
          <Route path="/booking-success" element={<BookingSuccess />} />
          <Route path="/venues" element={<Venues />} />
          <Route path="/venue-detail" element={<VenueDetail />} />
          <Route path="/" element={<SignIn />} />  {/* Or any default route */}
        </Routes>

        {/* Footer will be outside of the Routes */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
