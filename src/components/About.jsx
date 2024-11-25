import aboutImage from '../assets/about.png';

const About = () => {
    return (
        <section className="mx-60 my-20 p-20 flex justify-between">
            <div className="">
                <img src={aboutImage} alt='about'/>
            </div>
            <div className="w-3/5">
                <h2 className="text-right text-5xl font-bold mb-6">About Us</h2>
                <p className="text-right text-gray-700 leading-7">
                    FitSpace is your ultimate destination for discovering and booking the finest sports venues around you. Whether you’re a seasoned athlete, a casual sports enthusiast, or someone just beginning your fitness journey, we are here to make your experience smoother, more convenient, and enjoyable.

                    We believe that sports and physical activity are not just about staying fit—they’re about fostering community, boosting mental health, and building a healthier lifestyle. Our platform connects you with a wide range of high-quality venues, from futsal courts and basketball arenas to golf courses and swimming pools, ensuring you have everything you need to pursue your passion for sports.
                    We provide an easy platform to book your favorite sports venues with
                    real-time availability. Whether you’re looking for a futsal field or a
                    golf course, FitSpace has you covered!
                </p>
            </div>
        </section>
    );
};

export default About;
