function Hero() {
  return (
    <section className=" bg-heroBg bg-cover bg-fixed bg-center">
      <div className=" px-5 sm:px-10 lg:px-32 pt-12 grid grid-cols-1 gap-16 lg:grid-cols-2">
        <div className=" space-y-10">
          <h1 className=" text-headingColor text-4xl md:text-5xl lg:text-6xl font-semibold">We help patients live a healthy, longer life.</h1>
          <p className=" text-textColor">Welcome to our innovative and user-friendly doctor appointment booking platform, where your healthcare is just a click away! At DocBooker, we understand the importance of seamless access to medical care, and our website is designed to simplify the process of scheduling appointments with healthcare professionals.</p>
          <button className=" bg-primaryColor text-white font-semibold rounded-full py-3 px-5">Request an Appointment</button>
          <div className=" flex flex-col sm:flex-row gap-12">
            <div className=" relative">
              <h1 className=" z-10 relative text-3xl font-semibold">30+</h1>
              <div className=" bg-yellowColor absolute top-[26px] w-20 h-2 rounded-full"></div>
              <p className=" text-textColor">Years of Experiance</p>
            </div>
            <div className=" relative">
              <h1 className=" z-10 relative text-3xl font-semibold">15+</h1>
              <div className=" bg-purpleColor absolute top-[26px] w-20 h-2 rounded-full"></div>
              <p className=" text-textColor">Clinic Location</p>
            </div>
            <div className=" relative">
              <h1 className=" z-10 relative text-3xl font-semibold">100%</h1>
              <div className=" bg-irisBlueColor absolute top-[26px] w-20 h-2 rounded-full"></div>
              <p className=" text-textColor">Patient Satisfaction</p>
            </div>
          </div>
        </div>
        <div>
          <div className=" grid gap-12 grid-cols-2">
            <div>
                <img className=" rounded-2xl" src="/images/hero-img01.jpg" alt="heroimg01" />
            </div>
            <div className=" space-y-12 mt-16">
              <img className=" rounded-2xl" src="/images/hero-img02.jpg" alt="heroimg02" />
              <img className=" rounded-2xl" src="/images/hero-img03.jpg" alt="heroimg03" />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Hero