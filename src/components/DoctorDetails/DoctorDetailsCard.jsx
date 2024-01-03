/* eslint-disable react/prop-types */
import { Star } from "lucide-react"
import { useEffect, useState } from "react"
import { BASE_URL } from "../../../config"
import { useParams } from "react-router"
import { getCookie } from "../../../utils/getCookie"

function DoctorDetailsCard({fetchedData}) {
    const {docId} = useParams()
    const [rating,setRating] = useState({})
    useEffect(()=>{
        const fetchReviewStats = async()=>{
            const res  = await fetch(`${BASE_URL}/api/v1/reviews/stats/${docId}`,{
                method: "GET",
                credentials: "include",
                mode: "cors",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + getCookie("token"),
                },
            })
            const data = await res.json()
            
            if(!res.ok){
                throw Error(data.message)
            }
            setRating(data.data)
        }

        fetchReviewStats()
    },
   
    [docId])

  return (
   
        <div className=" flex flex-col sm:flex-row  gap-6">
            <div className=" flex justify-center">
            <div> <img className=" max-w-[12rem]" src={fetchedData?.photo} alt="docimg" /></div>
            </div>
            <div className=" flex justify-center">
            <div className=" space-y-2">
                <div className=" flex"><p className=" bg-green-300  rounded-md text-green-700 px-4 py-2">{fetchedData?.specialization}</p></div>
                <h1 className=" font-semibold capitalize">{fetchedData?.name}</h1>
                <div className=" flex gap-2">
                    <Star className=" fill-amber-500 text-transparent"/>
                    <span className=" font-semibold">{rating?.averageRating?.toFixed(1)||0}</span>
                    <span className=" text-textColor">({rating?.numOfRating||0})</span>
                </div>
                <p>{fetchedData?.bio}</p>
            </div>
            </div>
        </div>
  
  )
}

export default DoctorDetailsCard