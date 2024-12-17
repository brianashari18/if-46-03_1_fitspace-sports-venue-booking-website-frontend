const ContactUs = () => {
    return (
        <section className="">
            <div className="bg-primary2  px-14 py-14">
                 <h1 className="flex font-poppins justify-center text-3xl space-x-10">ANY QUESTION TO 
                    <span className="font-poppins font-bold text-3xl ml-2">FITSPACE</span>
                 </h1>
            </div>
            <div className="h-screen flex items-center justify-center bg-putih">
                <div className="w-[80%] max-w-5xl h-[30rem] flex rounded-l-lg shadow-lg">
                    <div class="w-1/2 bg-white flex flex-col justify-center items-center rounded-l-lg p-6">
                         <h1 className="text-3xl font-bold mb-10 text-hitam-800">Contact Us</h1>
                        <form action="w-full space-y-4">
                        <input type="Email"
                             placeholder="Email" 
                             className="w-full border border-gray-300 rounded-3xl p-3 focus:outline-primary focus:ring-primary mb-6 font-poppins"/>
                            <input type="Name"
                            placeholder="Name" 
                            className="w-full border border-gray-300 rounded-3xl p-3 focus:outline-primary focus:ring-primary mb-6 font-poppins"/>
                             <input type="Description"
                             placeholder="Description" 
                            className="w-full border border-gray-300 rounded-3xl p-3 focus:outline-primary focus:ring-primary mb-6 font-poppins"/>
                             <input type="Submit"
                            placeholder="Submit" 
                            className="w-full border text-putih bg-primary border-gray-300 rounded-3xl p-3 focus:outline-primary focus:ring-primary font-poppins"/>
                        </form>
                    </div>
                <div className="w-1/2 bg-primary text-white flex flex-col justify-center rounded-r-lg p-10">
                    <h2 class="font-poppins text-3xl font-bold mb-4">Contact with Fitspace Team</h2>
                    <p class=" font-poppins text-sm mb-4 text-putih font-semibold">
                        Got questions, suggestions, or need assistance? We’re here to help!
                    </p>
                    <p class=" font-poppins text-sm leading-6 text-putih">
                         Our team at FitSpace is dedicated to ensuring your experience is smooth
                        and hassle-free. Whether you need help with bookings, have feedback to
                        share, or just want to learn more about our services, don’t hesitate to
                        reach out.
                    </p>
                </div>
                </div>
            </div>

        </section>   
    );
};
export default ContactUs;