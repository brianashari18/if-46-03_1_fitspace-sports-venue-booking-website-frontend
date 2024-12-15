import logo from '../assets/yellow-logo.png';
const Navbar = () => {
    return (
        <section className="bg-primary flex justify-between items-center px-10 py-5">  
            <div className= "text-primary2 flex justify-start gap-16">
            <img src={logo} alt="navbar" className='w-20  h-auto object-cover' />
                <h1 className=' font-poppins '>Home</h1>
                <h1 className=' font-poppins'>Venue</h1>
                <h1 className='font-poppins'>About Us</h1>
                <h1 className='font-poppins'>Contact Us</h1>
            </div>
            <div className='text-primary2 flex justify-center gap-5'>
            <h1 className='font-poppins p-2'> Sign In</h1>
            <h1 className='text-hitam font-poppins font-bold  rounded-lg px-3 py-2   bg-primary2'>Sign Up</h1>
            </div>
        </section>  
    );
};

export default Navbar;
