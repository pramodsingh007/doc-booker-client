/* eslint-disable react/prop-types */
import { ArrowRight, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../config";
import { getCookie } from "../../../utils/getCookie";

function FindDoctorCard({ id, name, specialist, img }) {
  const [rating, setRating] = useState({});

  useEffect(() => {
    const fetchReviewStats = async () => {
      const res = await fetch(`${BASE_URL}/api/v1/reviews/stats/${id}`, {
        method: "GET",
        credentials: "include",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getCookie("token"),
        },
      });
      const data = await res.json();

      if (!res.ok) {
        throw Error(data.message);
      }
      setRating(data.data);
    };

    fetchReviewStats();
  }, [id]);

  return (
    <div className=" space-y-3 max-w-[15rem] max-h-[25rem] ">
      <div>
        <img className=" rounded-lg w-[15rem] h-[15rem]" src={img} alt="docimg" />
      </div>
      <h1 className=" capitalize font-semibold text-lg">{name}</h1>
      <div className=" flex justify-between">
        <h1 className=" capitalize rounded-md text-green-700 bg-green-300 p-2">
          {specialist}
        </h1>
        <div className="flex gap-2 items-center">
          <Star className=" fill-amber-400 text-white border-white" />
          <span className=" text-semibold">{rating?.averageRating?.toFixed(1)||0}</span>
          <span className=" text-textColor">({rating?.numOfRating||0})</span>
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

export default FindDoctorCard;
