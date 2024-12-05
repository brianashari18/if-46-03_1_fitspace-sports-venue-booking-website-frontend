import logoImage from '../assets/white-logo.png';

const HowItWorks = () => {
    return (
        <section className="mx-60 my-20">
            <div className="container relative h-[40rem] w-full mb-48 rounded-3xl shadow-inner-dark">
                <div className="absolute top-10 left-10 right-0 bottom-0 h-[45rem] w-full p-16 bg-blue-500 text-[#f5f5f5] rounded-3xl shadow-3xl">
                    <div className="flex items-center justify-between">
                        <div className="font-poppins font-extrabold text-6xl">How it works?</div>
                        <img src={logoImage} alt="logo"/>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default HowItWorks;
