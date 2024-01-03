/* eslint-disable react/prop-types */
import { Star } from "lucide-react"

function TestimonialsCard({name,img}) {
  return (
    <div className=" p-4 hover:bg-primaryColor border duration-300 hover:text-white rounded-md space-y-3">
        <div className=" flex gap-2 items-center">
            <img src={`/images/${img}`} className=" rounded-md w-[50px] h-[50px]" alt="patient-avatar" />
            <div className=" ">
                <h1 className=" font-semibold">{name}</h1>
                <div className="flex">
                    <Star className=" fill-amber-400 text-transparent shadow-panelShadow"/>
                    <Star className=" fill-amber-400 text-transparent shadow-panelShadow"/>
                    <Star className=" fill-amber-400 text-transparent shadow-panelShadow"/>
                    <Star className=" fill-amber-400 text-transparent shadow-panelShadow"/>
                    <Star className=" fill-amber-400 text-transparent shadow-panelShadow"/>
                </div>
            </div>
        </div>
        <p>
          {"I have taken medical services from them They treat so well and they are provding the best medical servies."}
        </p>
    </div>
  )
}

export default TestimonialsCard