import { Link} from "react-router-dom";
import { useEffect, useState } from "react";
import { authAction } from "../../store/authSlice";
import { BASE_URL } from "../../config";
import { getCookie } from "../../utils/getCookie";
import { useDispatch, useSelector } from "react-redux";
import FindDoctorCard from "../components/FindDoctorCard/FindDoctorCard";
import Spinner from 'react-spinner-material';

function FindADoctor() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const role = useSelector((state) => state.auth.role);
  const [fetchedData, setFetchedData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    dispatch(authAction.setLoading(true));
    const getUserProfile = async () => {
      const res = await fetch(`${BASE_URL}/api/v1/doctors/approved`, {
        method: "GET",
        credentials: "include",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getCookie("token"),
        },
      });
      const data = await res.json();
      setFetchedData(data.data);
      dispatch(authAction.setLoading(false));
    };
    getUserProfile();
  }, [dispatch]);

 

  const searchDoctor = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    dispatch(authAction.setLoading(true));
    const res = await fetch(`${BASE_URL}/api/v1/doctors/find-doctor`, {
      method: "POST",
      credentials: "include",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("token"),
      },
      body: JSON.stringify({ query }),
    });
    const data = await res.json();
    
    setSearchData(data.data);
    dispatch(authAction.setLoading(false));
  };

  return (
    <section className=" ">
      <div className=" justify-center bg-orange-100  py-20">
        <div>
          <div className=" space-y-3  ">
          {role==='admin'?<p className=" text-5xl text-center font-semibold mb-4">Welcome Admin</p>:null}
            <h1 className=" text-3xl text-center font-semibold">
              Find a Doctor
            </h1>
            <form
              onSubmit={searchDoctor}
              method="POST"
              className=" w-full grid place-content-center justify-center"
            >
              <div className=" min-w-[20rem]">
                <input
                  onChange={searchDoctor}
                  placeholder="Search By Name or Specialization"
                  type="text"
                  name="search"
                  className=" h-10 w-full p-2 row-span-full bg-slate-300 outline-none rounded-md"
                />
                <div className=" flex justify-center">
                  <button className=" bg-primaryColor mt-2 text-white py-2 rounded-md px-6">
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className=" w-full  flex justify-center items-center"><Spinner  size={120} spinnercolor={"#333"} spinnerwidth={2} visible={true} /></div>
      ) : (
        <div className="px-5 sm:px-10 lg:px-32 pt-24">
          <div className=" flex flex-wrap gap-4 justify-center sm:justify-start place-items-center">
            {(searchQuery.trim().length === 0 ? fetchedData : searchData)?.map(
              (doctor, index) => (
                <Link key={index} to={doctor?._id}>
                  <FindDoctorCard
                    id={doctor?._id}
                    name={doctor?.name}
                    img={doctor?.photo}
                    specialist={doctor?.specialization}
                  />
                </Link>
              )
            )}
          </div>
          {searchQuery.trim().length !== 0 && searchData.length === 0 && (
            <p className=" text-center font-semibold">
              Oops.. No Search Result
            </p>
          )}
          {searchQuery.trim().length == 0 && searchData.length === 0 && fetchedData.length===0&& (
            <p className=" text-center font-semibold">
              No Doctors Found
            </p>
          )}
        </div>
      )}
    </section>
  );
}

export default FindADoctor;
