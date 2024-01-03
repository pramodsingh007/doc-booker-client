function About() {
  return (
    <section className="px-5 sm:px-10 lg:px-32 pt-24 ">
      <div className=" grid grid-cols-1 gap-24 sm:grid-cols-2">
        <div className=" flex justify-center" >
          <div className=" relative">
          <img className=" rounded-2xl max-w-md"  src="/images/about.jpg" alt="aboutpng" />
          <img className=" absolute bottom-10  right-0" src="/images/about-card.png" alt="aboutpng" />
          </div>
        </div>
        <div className=" space-y-6">
          <h1 className=" text-3xl font-semibold ">Proud to be one of the nations best</h1>
          <p className=" text-textColor">For 30 years in a row, INDIA News & World Report has recognized us as one of the best
            publics hospitals in the Nation and #1 in MP. 
          </p>
          <p className=" text-textColor">
            Our best is something we strive for each day, caring for our patients not looking back 
            at what we accomplished but towards what we can do tomorrow Providing the best.
          </p>
          <button className=" bg-primaryColor px-5 py-3 rounded-full text-white font-semibold ">Learn More</button>
        </div>
      </div>
    </section>
  )
}

export default About