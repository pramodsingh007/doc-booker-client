/* eslint-disable react/prop-types */
import { Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import { authAction } from "../../../store/authSlice";
import { useEffect, useState } from "react";
import { getCookie } from "../../../utils/getCookie";
import { BASE_URL } from "../../../config";

function Overview({fechedData}) {
  const isLoading = useSelector(state=>state.auth.isLoading)
  const docId = useSelector(state=>state.auth.user)
  const [reviewStats,setReviewStats] = useState({})
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authAction.setLoading(true));
    const getReviewStats = async () => {
      const res = await fetch(
        `${BASE_URL}/api/v1/reviews/stats/${docId}`,
        {
          method: "GET",
          credentials: "include",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getCookie("token"),
          },
        }
      );
      const data = await res.json();
        if(!res.ok){
          throw Error(data.message)
        }
      setReviewStats(data.data);
      dispatch(authAction.setLoading(false));
    };
    getReviewStats();
  }, [dispatch,docId]);



  return (
    <>
    {isLoading?<Skeleton count={50} />:<div>
      <div>
        <div className="flex sm:flex-row flex-col  gap-8">
          <img className=" sm:w-[250px] w-40" src={fechedData?.photo} alt="profile" />
          <div>
            <h1 className=" capitalize font-semibold">{fechedData?.name}</h1>
            <p className=" flex gap-2">
              <Star className=" text-transparent fill-yellow-500" />
              <span className=" font-semibold">{reviewStats?.averageRating?.toFixed(1)||0}</span>({reviewStats?.numOfRating||0})
            </p>
          </div>
        </div>
        <div className=" mt-4">
        <h1 className=" text-headingColor text-xl font-semibold">About of <span className=" text-irisBlueColor capitalize"> { fechedData?.name}</span></h1>
        <p className=" mt-2">{fechedData?.bio}</p>
        <div>
            <h1  className=" font-semibold my-4">Education</h1>
            {fechedData?.qualifications.map((i,index)=><div key={index} className=" flex justify-between  mt-4">
                <div className=" text-textColor">
                    <p>{new Date(i.qualificationStartingDate).toDateString()} - {new Date(i.qualificationEndingDate).toDateString()}</p>
                    <p>{i.degree.toUpperCase()}</p>
                </div>
                <p className=" text-textColor">{i.university.toUpperCase()}</p>
            </div>)}
            <div>
                <h1 className=" font-semibold my-4">Experience</h1>
                <div className=" flex sm:flex-row flex-col gap-6">
                    {fechedData?.experiences.map((exp,index)=>(<div key={index} className=" max-w-[20rem] rounded-md p-5 bg-orange-100">
                        <p className=" text-yellow-500 font-semibold">{new Date(exp.experienceStartingDate).toDateString()} - {new Date(exp.experienceEndingDate).toDateString()}</p>
                        <p>{exp.position.toUpperCase()}</p>
                        <p>{exp.hospital.toUpperCase()}</p>
                    </div>))}
                </div>
            </div>

        </div>
    </div>
      </div>
    </div>}
    </>
  );
}

export default Overview;
