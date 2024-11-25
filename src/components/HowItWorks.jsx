const HowItWorks = () => {
    return (
        <section className="p-10 bg-blue-500 text-white">
            <h2 className="text-center text-2xl font-bold mb-6">How It Works?</h2>
            <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                    <h3 className="font-bold text-lg mb-2">1. Find Venues</h3>
                    <p>Easily find sports venues near you.</p>
                </div>
                <div className="text-center">
                    <h3 className="font-bold text-lg mb-2">2. Real-time Booking</h3>
                    <p>Check availability in real-time.</p>
                </div>
                <div className="text-center">
                    <h3 className="font-bold text-lg mb-2">3. Play and Enjoy</h3>
                    <p>Book and enjoy with your friends.</p>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
