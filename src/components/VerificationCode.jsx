import {useState, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import VerifCode from "../assets/VerifCode.png";
import {forgotPassword, validateOtp} from "../services/auth-service.js";
import {resendCode} from "../services/user-service.js";

const VerificationCode = () => {
    const [codeInputs, setCodeInputs] = useState(["", "", "", ""]);
    const [isVerified, setIsVerified] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [resendMessage, setResendMessage] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const [email] = useState(() => {
        const emailFromState = location.state?.email;
        if (emailFromState) {
            localStorage.setItem("email", emailFromState);
            return emailFromState;
        }
        return localStorage.getItem("email");
    });


    useEffect(() => {
        if (!email) {
            navigate("/forgot-password");
        }
    }, [email, navigate]);

    const handleInputChange = (index, value, event) => {
        if (!/^\d$/.test(value) && value !== "") return;

        const newCodeInputs = [...codeInputs];

        if (event.key === "Backspace" && !value) {
            if (index > 0) {
                document.getElementById(`input-${index - 1}`).focus();
            }
        } else {
            newCodeInputs[index] = value.slice(0, 1);
            setCodeInputs(newCodeInputs);

            if (value.length === 1 && index < 3) {
                document.getElementById(`input-${index + 1}`).focus();
            }
        }
    };

    const handleVerify = async () => {
        const verificationCode = codeInputs.join("");
        if (verificationCode.length === 4) {
            console.log("Verifikasi dengan kode:", verificationCode);

            setIsVerified(true);
            setErrorMessage("");

            const data = {
                otp: verificationCode
            }

            try {
                await validateOtp(data)
                navigate("/reset-password", {state: {email}});
            } catch (e) {
                alert(e.message);
            }
        } else {
            setErrorMessage("Invalid Code!");
        }
        setIsVerified(false);
    };

    const handleResendCode = async () => {
        try {
            const response = await resendCode(email);
            console.log("Mengirim ulang kode ke email:", email);
            console.log(`Data: ${response.data.data}`);
            setResendMessage(`The verification code has been resent to ${email}.`);
            setErrorMessage("");
        } catch (error) {
            console.error('Error:', error.message);
            alert(error.message);
        }

        setTimeout(() => {
            setResendMessage("");
        }, 3000);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div
                className="bg-[#738FFD] rounded-lg shadow-xl w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-[85rem] h-[35rem] flex">
                {/* Left Section */}
                <div className="w-1/2 h-full flex flex-col justify-center items-center text-white p-8 sm:p-16 lg:p-32">
                    <h1 className="font-extrabold text-xl sm:text-3xl text-center mb-5">
                        VERIFICATION CODE
                    </h1>
                    <p className="font-semibold text-sm sm:text-lg text-center sm:mb-20">
                        We have sent your code to{" "}
                        {email && <span className="text-white font-bold">{email}</span>}
                    </p>

                    <div className="flex justify-center gap-5 -mt-10 mb-6">
                        {Array.from({length: 4}).map((_, index) => (
                            <input
                                key={index}
                                id={`input-${index}`}
                                type="text"
                                maxLength="1"
                                value={codeInputs[index]}
                                onChange={(e) =>
                                    handleInputChange(index, e.target.value, e.nativeEvent)
                                }
                                onKeyDown={(e) =>
                                    handleInputChange(index, e.target.value, e.nativeEvent)
                                }
                                className="w-12 h-12 sm:w-14 sm:h-14 text-center text-lg font-bold text-black bg-transparent border border-[#E6FDA3] rounded-2xl shadow focus:outline-none focus:ring-2 focus:ring-[#F2FA5A]"
                            />
                        ))}
                    </div>

                    {errorMessage && (
                        <p className="text-[#E6FDA3] font-semibold text-sm mb-4">
                            {errorMessage}
                        </p>
                    )}

                    {resendMessage && (
                        <p className="text-[#E6FDA3] font-semibold text-sm mb-4">
                            {resendMessage}
                        </p>
                    )}

                    <button
                        onClick={handleVerify}
                        className="w-60 p-3 rounded-lg bg-[#E6FDA3] text-[#738ffd] font-semibold hover:bg-[#F2FA5A] transition mt-6"
                    >
                        {isVerified ? (
                            <span
                                className="loader inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        ) : (
                            "Verify"
                        )}
                    </button>

                    <div className="text-center mt-3">
                        <p className="font-semibold text-xs sm:text-xs text-center">
                            Didn't you receive any code?
                            <a
                                href="#"
                                onClick={handleResendCode}
                                className="font-bold text-white text-xs sm:text-xs hover:underline ml-1"
                            >
                                Resend Code
                            </a>
                        </p>
                    </div>
                </div>

                {/* Right Section */}
                <div
                    className="bg-[#cad7fdb3] rounded-2xl flex justify-center items-center w-1/3 h-3/4 mx-auto my-auto">
                    <img
                        src={VerifCode}
                        alt="Verification Code"
                        className="w-96 h-96 object-contain"
                    />
                </div>
            </div>
        </div>
    );
};

export default VerificationCode;