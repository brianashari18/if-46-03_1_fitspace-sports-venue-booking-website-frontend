import venueImage from '../assets/venue.png';
import aboutImage from '../assets/about.png';
import logoImage from '../assets/white-logo.png';
import searchIcon from '../assets/search-icon.png';
import calendarIcon from '../assets/calendar-icon.png';
import securityIcon from '../assets/security-icon.png';
import starIcon from '../assets/star-icon.png';
import {useNavigate} from "react-router-dom";

const Homepage = () => {

    const navigate = useNavigate();

    const venues = [
        { name: 'FUTSAL', image: 'https://lapanganfutsal.id/wp-content/uploads/2023/01/raja-futsal-palembang.jpg' },
        { name: 'BASKET', image: 'https://atlanta.urbanize.city/sites/default/files/styles/1140w/public/2021-11/Overtime%20Elite%20Atlantic%20Station%20secondary%20gym.jpg?itok=jN0gzDCw' },
        { name: 'BADMINTON', image: 'https://media.istockphoto.com/id/1040174716/id/foto/garis-di-lapangan-bulu-tangkis-hijau.jpg?s=612x612&w=0&k=20&c=hQV94ocP4qjsRHjBNmnrEG1lfZTzUA6KsmDotvj1U_E=' },
        { name: 'VOLI', image: 'https://media.istockphoto.com/id/1216739474/photo/volleyball-stadium.jpg?s=612x612&w=0&k=20&c=Orn6IBPDjw998_4L7G87yoD45MacoMknDNjPbJ0ZmVU=' },
    ];

    return (
        <div>
            {/* Start Hero Section */}
            <section className="mx-60 my-20 rounded-2xl bg-hero-pattern bg-cover">
                <div className="text-white py-20 px-10 w-2/5">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Find and Book Your Perfect Sports Venue.
                    </h1>
                    <p className="text-lg md:text-sm mb-8">
                        From football fields to swimming pools, we've got it all. Explore
                        top-rated venues and secure your spot with just a few clicks!
                    </p>
                    <div className="flex gap-4">
                        <button className="bg-white text-black px-6 py-2 rounded-md font-medium shadow-md hover:bg-gray-200" onClick={() => navigate("/venue")}>
                            BOOK NOW
                        </button>
                        <button className="bg-lime-500 text-black px-6 py-2 rounded-md font-medium shadow-md hover:bg-lime-400" onClick={() => navigate("/venue")}>
                            EXPLORE
                        </button>
                    </div>
                </div>
            </section>
            {/* End Hero Section */}

            {/* Start Venue Section */}
            <section className="mx-60 my-20">
                <h2 className="text-center text-4xl font-bold mb-4">VENUES</h2>
                <p className="text-center text-primary mb-8">
                    Find the best sports venues near you for your fitness journey.
                </p>
                <div className="bg-primary py-12 px-32 rounded-2xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">
                    {venues.map((venue, index) => (
                        <div key={index} className="h-80 rounded-lg shadow-lg relative overflow-hidden">
                            {/* Background Image */}
                            <div
                                className="absolute inset-0 shadow-lg"
                                style={{
                                    backgroundImage: `url(${venue.image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            ></div>

                            {/* Overlay Gelap */}
                            <div className="absolute inset-0 bg-black bg-opacity-45 shadow-lg"></div>

                            {/* Text Content */}
                            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10 text-center">
                                <h3 className="text-white font-bold text-2xl">{venue.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            {/* End Venue Section */}

            {/* Start About Section */}
            <section className="mx-60 my-20 p-20 flex justify-between">
                <div>
                    <img src={aboutImage} alt="about" />
                </div>
                <div className="w-3/5">
                    <h2 className="text-right text-5xl font-bold mb-6">About Us</h2>
                    <p className="text-right text-gray-700 leading-7">
                        FitSpace is your ultimate destination for discovering and booking the finest sports venues around you. Whether you’re a seasoned athlete, a casual sports enthusiast, or someone just beginning your fitness journey, we are here to make your experience smoother, more convenient, and enjoyable.

                        We believe that sports and physical activity are not just about staying fit—they’re about fostering community, boosting mental health, and building a healthier lifestyle. Our platform connects you with a wide range of high-quality venues, from futsal courts and basketball arenas to golf courses and swimming pools, ensuring you have everything you need to pursue your passion for sports.
                        We provide an easy platform to book your favorite sports venues with real-time availability. Whether you’re looking for a futsal field or a golf course, FitSpace has you covered!
                    </p>
                </div>
            </section>
            {/* End About Section */}

            {/* Start How Section */}
            <section className="mx-60 my-20">
                <div className="container relative h-[40rem] w-full mb-96 rounded-3xl shadow-inner-dark">
                    <div className="absolute top-10 left-10 right-0 bottom-0 h-[48rem] w-full p-16 bg-blue-500 text-[#f5f5f5] rounded-3xl shadow-3xl">
                        <div className="flex items-center justify-between mb-20">
                            <div className="font-poppins font-extrabold text-6xl">How it works?</div>
                            <img src={logoImage} alt="logo" />
                        </div>
                        <div className="grid grid-cols-2 gap-x-10 gap-y-32">
                            <div className="flex flex-row gap-8">
                                <img
                                    src={searchIcon}
                                    alt="search-icon"
                                    className="w-36 h-36 transform -translate-y-6"
                                />
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
                                    <div>
                                        <p className="text-right font-poppins text-sm text-[#f5f5f5] text-opacity-75">
                                            Choose the date and time that fits your schedule. Our platform gives you
                                            real-time updates on venue availability, so you can book with confidence.
                                        </p>
                                    </div>
                                </div>
                                <img
                                    src={calendarIcon}
                                    alt="calendar-icon"
                                    className="w-36 h-36 transform -translate-y-6"
                                />
                            </div>
                            <div className="flex flex-row gap-6">
                                <img
                                    src={securityIcon}
                                    alt="security-icon"
                                    className="w-36 h-36 transform -translate-y-6"
                                />
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
                                    <div>
                                        <p className="text-right font-poppins text-sm text-[#f5f5f5] text-opacity-75">
                                            Head to the venue and enjoy your game! everything’s set for you to focus on
                                            having a great time.
                                        </p>
                                    </div>
                                </div>
                                <img
                                    src={starIcon}
                                    alt="star-icon"
                                    className="w-36 h-36 transform -translate-y-6"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* End How Section */}
        </div>
    );
};

export default Homepage;
