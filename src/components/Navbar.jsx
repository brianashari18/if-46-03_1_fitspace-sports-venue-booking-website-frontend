import logo from '../assets/yellow-logo.png';
const Navbar = () => {
    return (
        <section className="bg-primary flex justify-between items-center px-10 py-5">  
            <div className= "text-primary2 flex justify-start gap-16">
                 <a href="https://www.instagram.com/rrohhmman/profilecard/?igsh=MWtoOXZxMXd5bmpjeQ==">
                        <img src={logo} alt="navbar" className='w-20  h-auto object-cover' />  
                 </a>
                <a href="https://www.instagram.com/rrohhmman/profilecard/?igsh=MWtoOXZxMXd5bmpjeQ==">
                    <button className='font-poppins'>Home</button>
                </a>  <a href="https://www.instagram.com/rrohhmman/profilecard/?igsh=MWtoOXZxMXd5bmpjeQ==">
                    <button className='font-poppins'>Venue</button>
                </a>
                <a href="https://www.instagram.com/rrohhmman/profilecard/?igsh=MWtoOXZxMXd5bmpjeQ==">
                    <button className='font-poppins'>About Us</button>
                </a>
                <a href="https://www.instagram.com/rrohhmman/profilecard/?igsh=MWtoOXZxMXd5bmpjeQ==">
                    <button className='font-poppins'>Contact Us</button>
                </a>
            </div>
            <div className='text-primary2 flex justify-center gap-5'>
            <button className='font-poppins p-2'> Sign In</button>
            <button className='text-hitam font-poppins font-bold  rounded-lg px-3 py-2   bg-primary2'>Sign Up</button>
            </div>
        </section>  
    );
};
export default Navbar;
