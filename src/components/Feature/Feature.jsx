
function Feature() {
  return (
    <section className="px-5 sm:px-10 lg:px-32 pt-24 ">
      <div className=" grid grid-cols-1 gap-12 items-center md:grid-cols-2">
        <div className=" space-y-4">
          <h1 className=" text-3xl font-semibold text-headingColor">Get virtual treatment anytime.</h1>
          <p className=" text-textColor">1. Schedule the appointment  directly.</p>
          <p className=" text-textColor">2. Search for your physician here.and contact their office.</p>
          <p className=" text-textColor">3. View our physician who are accepting who are accepting new patients, use the online scheduling tool to select an appointment time.</p>
          <button className=" text-white font-medium bg-primaryColor py-3 px-5 rounded-full">Learn More</button>
        </div>
        <div className=" flex justify-center">
          <div>
            <img className=" rounded-2xl max-w-xs" src="/images/feature-img.jpg" alt="featureimg" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Feature