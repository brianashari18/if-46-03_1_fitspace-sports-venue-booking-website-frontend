import venueImage from '../assets/venue.png';

const Venues = () => {
    const venues = [
        { name: 'FUTSAL', image: venueImage },
        { name: 'BASKET', image: venueImage },
        { name: 'GOLF', image: venueImage },
        { name: 'DUGEM', image: venueImage },
    ];

    return (
        <section className="mx-60 my-20">
            <h2 className="text-center text-4xl font-bold mb-4">VENUES</h2>
            <p className="text-center text-primary mb-8">
                Find the best sports venues near you for your fitness journey.
            </p>
            <div className="bg-primary py-12 px-32 rounded-2xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">
                {venues.map((venue, index) => (
                    <div
                        key={index}
                        className="h-80 rounded-lg shadow-lg relative overflow-hidden"
                    >
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
    );
};

export default Venues;
