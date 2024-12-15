import logo from '../assets/yellow-logo.png';
import instagram from '../assets/instagram.png';
import twitter from '../assets/twitter.png';
import tiktok from '../assets/tiktok.png';
import facebook from '../assets/facebook.png';

const Footer = () => {
    return (

        <section className="min-h-screen flex flex-col ">
             <div className="flex-grow">
             </div>
             <footer className="bg-primary py-10 flex justify-between drop-shadow-2xl">
             <img src={logo} alt="footer" className=' object-cover px-24 py-1' />
                <div className='flex flex-row justify-between gap-12 px-24 py-6'>
                    <h1 className='font-poppins text-primary2'>Home</h1>
                    <h1 className='font-poppins text-primary2'>Venue</h1>
                    <h1 className='font-poppins text-primary2'>How To Book</h1>
                    <h1 className='font-poppins text-primary2'>About Us</h1>
                    <h1 className='font-poppins text-primary2'>Contact Us</h1>
                </div>
                <div className='flex flex-col justify-end'>
                    <div>
                        <h1 className='font-poppins text-primary2 px-36'>Follow Us On</h1>
                    </div>
                    <div className='flex flex-row px-32'>
                        <img src={facebook} alt="footer" className='object-cover' />
                        <img src={instagram} alt="footer" className='object-cover' />
                        <img src={twitter} alt="footer" className='object-cover' />
                        <img src={tiktok} alt="footer" className='object-cover' /> 
                    </div>
                </div>
            </footer>
            <footer className=''>
                <div className='flex flex-row-reverse justify-center bg-primary'>
                    <h1 className='font-poppins  text-hitam py-5 '>Copyright &copy; FITSPACE, 2024</h1>
                </div>
            </footer>
            
        </section>
    );
};

export default Footer;