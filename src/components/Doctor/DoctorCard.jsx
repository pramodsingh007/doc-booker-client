/* eslint-disable react/prop-types */
import { ArrowRight, Star } from "lucide-react";


function DoctorCard({ name, specialist, img,rating,review }) {
  return (
    <div className=" space-y-3 max-w-[15rem] max-h-[25rem] ">
      <div>
        <img className=" rounded-lg w-[15rem]" src={`/images/${img}`} alt="docimg" />
      </div>
      <h1 className=" capitalize font-semibold text-lg">{name}</h1>
      <div className=" flex justify-between">
        <h1 className=" capitalize rounded-md text-green-700 bg-green-300 p-2">
          {specialist}
        </h1>
        <div className="flex gap-2 items-center">
          <Star className=" fill-amber-400 text-white border-white" />
          <span className=" text-semibold">{rating}</span>
          <span className=" text-textColor">({review})</span>
        </div>
      </div>
      <div className=" flex justify-between items-center">
        <div>
          <h1 className=" font-semibold">+1500 patients</h1>
          <p className=" text-textColor">At AIMS Hospital, Delhi.</p>
        </div>
        <div>
          <button className=" border hover:bg-primaryColor rounded-full border-slate-700 p-2 group">
            <ArrowRight
              className=" group-hover:text-white"
              width={20}
              height={20}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default DoctorCard;
