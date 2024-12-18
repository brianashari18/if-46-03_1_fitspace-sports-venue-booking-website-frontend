
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
import Footer from "./components/footer";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Homepage from "./components/Homepage.jsx";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Navbar will be outside of the Routes */}
        <Navbar />
        {/* Define Routes */}
        <Routes>
          <Route path="/about-us" element={<AboutUs />}/>
          <Route path="/contact-us" element={<ContactUs />}/>
          <Route path="/venue" element={<Venues />}/>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verification-code" element={<VerificationCode />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/reset-success" element={<ResetSuccess />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/order" element={<Order />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/" element={<SignIn />} />  {/* Or any default route */}
        </Routes>
        {/* Footer will be outside of the Routes */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
