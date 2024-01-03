import WorkCard from "./WorkCard"

function HowItWorks() {
  return (
    <section className="px-5 sm:px-10 lg:px-32 pt-24 ">
        <div className="space-y-8 ">
            <div className=" flex justify-center">
            <div className=" max-w-md space-y-4">
              <h1 className=" text-3xl font-semibold text-center text-headingColor">Providing the best medical services</h1>
              <p className=" text-textColor text-center">World class care for everyone Out health System offers unmatched.expert health care</p>
            </div>
            </div>
            <div className=" grid md:grid-cols-3 grid-cols-1 gap-12">
                <WorkCard img={'icon01.png'} title={'Find a Doctor'} content={'World-class care for everyone. Our health System offers unmached, expert health care. From the lab to the clinic'}/>
                <WorkCard img={'icon02.png'} title={'Find a Location'} content={'World-class care for everyone. Our health System offers unmached, expert health care. From the lab to the clinic'}/>
                <WorkCard img={'icon03.png'} title={'Find a Book Appointment'} content={'World-class care for everyone. Our health System offers unmached, expert health care. From the lab to the clinic'}/>
                
            </div>
        </div>
    </section>
  )
}

export default HowItWorks