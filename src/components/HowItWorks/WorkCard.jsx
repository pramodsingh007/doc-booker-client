/* eslint-disable react/prop-types */
import { ArrowRight } from "lucide-react";

function WorkCard({img,title,content}) {
  return (
    <div className=" space-y-3 text-center">
      <div className=" flex justify-center"><img  src={`/images/${img}`} alt="img" /></div>
      <h1 className=" font-semibold text-3xl text-headingColor">{title}</h1>
      <p className=" text-textColor">
      {content}
      </p>
      <button className="p-1 group  hover:bg-primaryColor border border-slate-700  rounded-full ">
        <ArrowRight className=" group-hover:text-white"/>
      </button>
    </div>
  );
}

export default WorkCard;
