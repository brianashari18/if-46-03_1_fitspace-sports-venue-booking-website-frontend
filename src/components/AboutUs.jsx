import bola from '../assets/bola.jpeg';
import Badminton from '../assets/Badminton.png';
import Basketball from '../assets/Basketball.png';
const AboutUs = () => {
    return (
        <section className="">
            <div className="bg-primary2 px-14 py-14">
                 <h1 className="flex font-poppins justify-center text-4xl space-x-10">GET CLOSER WITH
                    <span className="font-poppins font-bold text-4xl ml-2">FITSPACE</span>
                 </h1>
            </div>
             <img src={bola} alt="footer" className='w-full h-64 object-cover'/>
            <div>  
                <h1 className='text-center font-bold text-3xl mt-14 mb-14 font-poppins'>About Us</h1>
                <p className='mr-32 ml-32 font-poppins mb-5'>
                    FitSpace is your ultimate destination for discovering and booking the finest sports venues around you.
                    Whether you’re a seasoned athlete, a casual sports enthusiast, or someone just beginning your fitness journey, 
                    we are here to make your experience smoother, more convenient, 
                    and enjoyable.</p>
                <p className='mr-32 ml-32 font-poppins mb-5'>
                    We believe that sports and physical activity are not just about staying fit—they’re about fostering community,
                    boosting mental health, and building a healthier lifestyle. Our platform connects you with a wide range of high-quality venues,
                    from futsal courts and basketball arenas to golf courses and swimming pools, 
                    ensuring you have everything you need to pursue your passion for sports.
                </p>
                <p className='mr-32 ml-32 font-poppins mb-5'>
                    At FitSpace, we understand the challenges of finding the right place to play or train, especially in today’s fast-paced world. 
                    That’s why we’ve made it our mission to simplify the process. 
                    With just a few clicks, you can explore, book, and secure your spot at top-rated venues,
                    saving you time and energy to focus on what truly matters—your game.
                </p>
                <p className='mr-32 ml-32 font-poppins mb-20'>
                    Our commitment extends beyond convenience. We strive to support local communities by partnering with trusted sports venues and providing a reliable platform for athletes and enthusiasts alike. 
                        FitSpace is more than just a booking service; it’s a hub for inspiration, motivation, and connection.
                    Join us and make FitSpace your trusted partner in achieving your fitness goals. 
                    Whether it’s a competitive match or a casual game with friends, 
                    we’re here to help you find the perfect space to play, grow, and thrive.
                </p>
            </div>
            <section className='max-w-6xl mx-auto p-6'>
                <h1 className='text-3xl font-bold text-center mb-16'>Our Promise</h1>
                <div className='grid grid-cols-2  md:grid-cols-2 gap-2'>
                    <img src={Badminton} alt="" className='w-2/3 ml-36 rounded-lg object-cover' />
                    <div className='flex items-center space-x-6'>
                      <div className='mr-32'>
                      <h1 className='text-2xl font-bold font-poppins mb-5'>Our Vision</h1>
                        <p className='font-poppins'>
                            To become the leading platform connecting sports enthusiasts with
                            top-tier sports venuefks, fostering a healthy and active community
                            across Indonesia.
                        </p>
                      </div>
                    </div>
                </div>
            </section>
            <section className='max-w-6xl mx-auto p-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 items-center'>
                        <div className='ml-36'>
                        <h1 className='text-2xl font-bold font-poppins mb-5'>Our Vision</h1>
                        <p class="font-poppins mb-4">
                             Provide easy access to a variety of sports venues.
                        </p>
                        <p class="font-poppins mb-4">
                            Deliver a fast and secure booking experience through cutting-edge
                            technology.
                        </p>
                        <p class="font-poppins">
                            Support the sports community with trusted information,
                            recommendations, and reviews.
                        </p>
                        </div>
                    <div className='flex items-center space-x-6'>
                        <div>
                        <img src={Basketball} alt="" className='w-2/3 ml-36 rounded-lg object-cover' />
                         </div>
                    </div>
                </div>
            </section>
        </section>   
    );
};
export default AboutUs;