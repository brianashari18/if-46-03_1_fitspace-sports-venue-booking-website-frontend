<<<<<<< HEAD
import Header from './components/Header';
import Venues from './components/Venues';
import About from './components/About';
import HowItWorks from './components/HowItWorks';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactUs from './components/ContactUs';

function App() {
    return (
        <div>
            <Navbar/>
            <ContactUs/>
            <Footer/>
        </div>
    );
=======
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

function App() {
  return (
    <Router>
      <div>
        <ChangePassword/>
      </div>
    </Router>
  );
>>>>>>> 3ad5f005cfacc6d8935faae3682ce2dcb825d09a
}

export default App;
