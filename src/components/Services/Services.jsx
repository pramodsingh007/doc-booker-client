import ServiceCard from "./ServiceCard"

function Services() {
  return (
    <section className="px-5 sm:px-10 lg:px-32 pt-24 ">
        
            <div className=" flex justify-center">
            <div className=" max-w-md space-y-4">
              <h1 className=" text-3xl font-semibold text-center text-headingColor">Our medical services</h1>
              <p className=" text-textColor text-center">World class care for everyone Out health System offers unmatched, expert health care</p>
            </div>
            </div>

          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 mt-12">
              <ServiceCard index={1} title={'Cancer Care'} content={'World-class care for everyone. Our health System offers unmached, expert health care From the lab to the clinic.'}/>
              <ServiceCard index={2} title={'Labor & Delivery'} content={'World-class care for everyone. Our health System offers unmached, expert health care From the lab to the clinic.'}/>
              <ServiceCard index={3} title={'Heart & Vascular'} content={'World-class care for everyone. Our health System offers unmached, expert health care From the lab to the clinic.'}/>
              <ServiceCard index={4} title={'Mental Health'} content={'World-class care for everyone. Our health System offers unmached, expert health care From the lab to the clinic.'}/>
              <ServiceCard index={5} title={'Neurology'} content={'World-class care for everyone. Our health System offers unmached, expert health care From the lab to the clinic.'}/>
              <ServiceCard index={6} title={'Burn Treatment'} content={'World-class care for everyone. Our health System offers unmached, expert health care From the lab to the clinic.'}/>
             
          </div>
    </section>
  )
}

export default Services