/* eslint-disable react/prop-types */
import { ArrowRight } from "lucide-react"

function ServiceCard({title,content,index}) {
  return (
    <div className=" space-y-4">
            <h1 className=" text-headingColor font-semibold text-lg">{title}</h1>
            <p className=" text-textColor">{content}</p>
            <div className=" flex flex-row justify-between">
             <div>
             <button className=" group hover:bg-primaryColor border border-slate-700 p-1 rounded-full">
              <ArrowRight className=" group-hover:text-white"/>
              </button>
             </div>

              <div>
              <div className=" bg-amber-100  text-center p-2 px-4 ">
                {index}
              </div>
              </div>
            </div>
          </div>
  )
}

export default ServiceCard