
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
import Footer from "./components/footer";
import Navbar from "./components/Navbar";
import ContactUs from "./components/ContactUs";
import AboutUs from "./components/AboutUs";

function App() {
  return (
    <Router>
      <div>
       <Navbar/>
       <ContactUs/> 
      <Footer/>
      </div>
    </Router>
  );
}

export default App;
