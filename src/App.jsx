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
import OrderSelesai from "./components/Order";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; 

function App() {
  return (
    <Router>
      <div>
        <Navbar/>
        <OrderSelesai/>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
