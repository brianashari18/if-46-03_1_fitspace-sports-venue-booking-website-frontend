import logo from '../assets/yellow-logo.png';
const Navbar = () => {
    return (
        <section className="bg-primary flex justify-between items-center px-10 py-5">  
            <div className= "text-primary2 flex justify-start gap-16">
                 <a href="/home">
                        <img src={logo} alt="navbar" className='w-20  h-auto object-cover' />  
                 </a>
                <a href="/home">
                    <button className='font-poppins'>Home</button>
                </a>  
                <a href="/venue">
                    <button className='font-poppins'>Venue</button>
                </a>
                <a href="/about-us">
                    <button className='font-poppins'>About Us</button>
                </a>
                <a href="/contact-us">
                    <button className='font-poppins'>Contact Us</button>
                </a>
            </div>
            <div className='text-primary2 flex justify-center gap-5'>
                <a href="/sign-in">
                    <button className='font-poppins p-2'> Sign In</button>
                </a>
                <a href="/sign-up">
                    <button className='text-hitam font-poppins font-bold  rounded-lg px-3 py-2 hover:bg-secondaryK  bg-primary2'>Sign Up</button>
                </a>

            </div>
        </section>  
    );
};
export default Navbar;
