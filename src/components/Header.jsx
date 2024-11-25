const Header = () => {
    return (
        <header className="mx-60 my-20 rounded-2xl bg-hero-pattern bg-cover">
            <div className="text-white py-20 px-10 w-2/5">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Find and Book Your Perfect Sports Venue.
                </h1>
                <p className="text-lg md:text-sm mb-8">
                    From football fields to swimming pools, we've got it all. Explore
                    top-rated venues and secure your spot with just a few clicks!
                </p>
                <div className="flex gap-4">
                    <button className="bg-white text-black px-6 py-2 rounded-md font-medium shadow-md hover:bg-gray-200">
                        BOOK NOW
                    </button>
                    <button className="bg-lime-500 text-black px-6 py-2 rounded-md font-medium shadow-md hover:bg-lime-400">
                        EXPLORE
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
