import DoctorCard from "./DoctorCard";

function DoctorSection() {
  return (
    <section className="px-5 sm:px-10 lg:px-32 pt-24 ">
      <div>
        <div className=" flex justify-center">
          <div className=" max-w-md space-y-4">
            <h1 className=" text-3xl font-semibold text-center text-headingColor">
              Our great doctors
            </h1>
            <p className=" text-textColor text-center">
              World class care for everyone Out health System offers unmatched,
              expert health care
            </p>
          </div>
        </div>

        <div className=" grid place-items-center mt-12 gap-8 grid-cols-1 sm:grid-cols-3">
              <DoctorCard name={'Dr. Vishal Mishra'} img={'doctor-img01.png'} specialist={'Surgeon'} rating={'4.8'} review={'300'}/>
              <DoctorCard name={'Dr. Sandeep Patel'} img={'doctor-img02.png'} specialist={'Neurologist'} rating={'4.3'} review={'253'}/>
              <DoctorCard name={'Dr. RishiKesh Jha'} img={'doctor-img03.png'} specialist={'Dermatologist'} rating={'4.4'} review={'422'}/>
              
          </div>
      </div>
    </section>
  );
}

export default DoctorSection;
