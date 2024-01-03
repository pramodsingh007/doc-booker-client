import { useEffect, useState } from "react";
import DoctorDetailsCard from "../components/DoctorDetails/DoctorDetailsCard";
import AboutDoctor from "../components/DoctorDetails/AboutDoctor";
import Feedback from "../components/DoctorDetails/Feedback";
import Slotes from "../components/DoctorDetails/Slotes";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../../store/authSlice";
import { BASE_URL } from "../../config";
import { getCookie } from "../../utils/getCookie";
import Skeleton from "react-loading-skeleton";

function DoctorDetails() {
  const [selected, setSelecte] = useState("about");
  const { docId } = useParams();
  const [fetchedData, setFetchedData] = useState({});
  const [fetchedReview, setFetchedReview] = useState({});
  const isLoading = useSelector((state) => state.auth.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authAction.setLoading(true));
    const getUserProfile = async () => {
      const res = await fetch(`${BASE_URL}/api/v1/doctors/${docId}`, {
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
      setFetchedData(data.data);
      dispatch(authAction.setLoading(false));
    };
    getUserProfile();
  }, [dispatch, docId]);


  useEffect(() => {
    dispatch(authAction.setLoading(true));
    const getUserProfile = async () => {
      const res = await fetch(
        `${BASE_URL}/api/v1/reviews/${docId}`,
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
      
      setFetchedReview(data.data);
      dispatch(authAction.setLoading(false));
    };
    getUserProfile();
  }, [dispatch,docId]);

  const selectionHandler = (select) => {
    setSelecte(select);
  };

  return (
    <>
      <section className="px-5 sm:px-10 lg:px-32 pt-24 flex justify-center">
        <div className=" sm:max-w-[80rem] max-w-full ">
          {isLoading?<Skeleton width={600} count={50}/>:<div>
            <div className=" grid grid-cols-1 gap-6 lg:grid-cols-2">
              <DoctorDetailsCard fetchedData={fetchedData} />
              <Slotes fetchedData={fetchedData} />
            </div>
            <div>
              <div className=" border-b space-x-12 mt-12">
                <button
                  onClick={() => {
                    selectionHandler("about");
                  }}
                  className={`py-2 px-2 font-[600]  border-b-slate-400 text-headingColor ${
                    selected === "about" ? "border-b-[3px]" : ""
                  }`}
                >
                  About
                </button>
                <button
                  onClick={() => {
                    selectionHandler("feedback");
                  }}
                  className={`py-2 px-2 font-[600]  border-b-slate-400 text-headingColor ${
                    selected === "feedback" ? "border-b-[3px]" : ""
                  }`}
                >
                  Feedback
                </button>
              </div>
            </div>

            {selected === "about" ? (
              <AboutDoctor fetchedData={fetchedData} />
            ) : (
              ""
            )}
            {selected === "feedback" ? <Feedback fetchedReview={fetchedReview} setFetchedReview={setFetchedReview} /> : ""}
          </div>}
        </div>
      </section>
    </>
  );
}

export default DoctorDetails;
