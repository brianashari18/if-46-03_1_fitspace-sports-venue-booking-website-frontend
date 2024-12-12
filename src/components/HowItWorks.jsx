import logoImage from '../assets/white-logo.png';
import searchIcon from '../assets/search-icon.png';
import calendarIcon from '../assets/calendar-icon.png';
import securityIcon from '../assets/security-icon.png';
import starIcon from '../assets/star-icon.png';

const HowItWorks = () => {
    return (
        <section className="mx-60 my-20">
            <div className="container relative h-[40rem] w-full mb-96 rounded-3xl shadow-inner-dark">
                <div
                    className="absolute top-10 left-10 right-0 bottom-0 h-[48rem] w-full p-16 bg-blue-500 text-[#f5f5f5] rounded-3xl shadow-3xl">
                    <div className="flex items-center justify-between mb-20">
                        <div className="font-poppins font-extrabold text-6xl">How it works?</div>
                        <img src={logoImage} alt="logo"/>
                    </div>
                    <div className="grid grid-cols-2 gap-x-10 gap-y-32">
                        <div className="flex flex-row gap-8">
                            <img src={searchIcon} alt="search-icon" className="w-36 h-36 transform -translate-y-6"/>
                            <div className="relative flex flex-col items-left gap-2">
                                <p className="absolute -top-8 -left-5 font-poppins text-2xl font-bold text-[#f5f5f5]">1</p>
                                <h2 className="font-poppins text-4xl font-bold text-[#f5f5f5]">
                                    Easily find sports venues near you
                                </h2>
                                <div className="w-4/5">
                                    <p className="font-poppins text-sm text-[#f5f5f5] text-opacity-75">
                                        Use our search bar to find the perfect venue by location, sport type, or
                                        available date. or just go to the venue page using the navigation bar.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row gap-8 transform translate-y-24">
                            <div className="relative flex flex-col items-left gap-2">
                                <p className="absolute -top-8 -right-5 font-poppins text-2xl font-bold text-[#f5f5f5]">2</p>
                                <h2 className="text-right font-poppins text-4xl font-bold text-[#f5f5f5]">
                                    Check real-time availability
                                </h2>
                                <div className="">
                                    <p className="text-right font-poppins text-sm text-[#f5f5f5] text-opacity-75">
                                        Choose the date and time that fits your schedule. Our platform gives you
                                        real-time updates on venue availability, so you can book with confidence.
                                    </p>
                                </div>
                            </div>
                            <img src={calendarIcon} alt="search-icon" className="w-36 h-36 transform -translate-y-6"/>

                        </div>
                        <div className="flex flex-row gap-6">
                            <img src={securityIcon} alt="search-icon" className="w-36 h-36 transform -translate-y-6"/>
                            <div className="relative flex flex-col items-left gap-2">
                                <p className="absolute -top-8 -left-5 font-poppins text-2xl font-bold text-[#f5f5f5]">3</p>
                                <h2 className="font-poppins text-4xl font-bold text-[#f5f5f5]">
                                    Fast and secure booking process
                                </h2>
                                <div className="w-4/5">
                                    <p className="font-poppins text-sm text-[#f5f5f5] text-opacity-75">
                                        Finalize your booking with a few clicks. We offer secure online payments,
                                        ensuring your reservation is confirmed instantly.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row gap-4 transform translate-y-24">
                            <div className="relative flex flex-col items-right gap-2">
                                <p className="absolute -top-8 -right-5 font-poppins text-2xl font-bold text-[#f5f5f5]">4</p>
                                <h2 className="text-right font-poppins text-4xl font-bold text-[#f5f5f5]">
                                    Play and have fun!
                                </h2>
                                <div className="">
                                    <p className="text-right font-poppins text-sm text-[#f5f5f5] text-opacity-75">
                                        Head to the venue and enjoy your game! everything’s set for you to focus on
                                        having a great time.
                                    </p>
                                </div>
                            </div>
                            <img src={starIcon} alt="search-icon" className="w-36 h-36 transform -translate-y-6"/>

                        </div>
                    </div>


                </div>
            </div>

        </section>
    );
};

export default HowItWorks;
