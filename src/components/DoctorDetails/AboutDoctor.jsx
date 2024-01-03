/* eslint-disable react/prop-types */

function AboutDoctor({fetchedData}) {
  return (
    <div className=" mt-4">
        <h1 className=" text-headingColor text-xl font-semibold">About of <span className=" capitalize text-irisBlueColor">{fetchedData?.name}</span></h1>
        <p className=" mt-2">{fetchedData?.about}</p>
        <div>
            <h1  className=" font-semibold my-4">Education</h1>
            
            {fetchedData?.qualifications?.map((qualification,index)=><div key={index} className=" flex justify-between mt-4">
                <div className=" text-textColor">
                    <p>{new Date(qualification?.qualificationStartingDate).toDateString()} - {new Date(qualification?.qualificationStartingDate).toDateString()}</p>
                    <p className=" uppercase">{qualification?.degree}</p>
                </div>
                <p className=" uppercase text-textColor">{qualification?.university}</p>
            </div>)}
            <div>
                <h1 className=" font-semibold my-4">Experience</h1>
                <div className=" flex sm:flex-row flex-col gap-6">
                {fetchedData?.experiences?.map((exp,index)=>(<div key={index} className=" max-w-[20rem] rounded-md p-5 bg-orange-100">
                        <p className=" text-yellow-500 font-semibold">{new Date(exp.experienceStartingDate).toDateString()} - {new Date(exp.experienceEndingDate).toDateString()}</p>
                        <p className=" capitalize">{exp.position}</p>
                        <p>{exp.hospital.toUpperCase()}</p>
                    </div>))}
                </div>
            </div>

        </div>
    </div>
  )
}

export default AboutDoctor