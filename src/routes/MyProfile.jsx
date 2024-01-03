import { useEffect, useState } from "react";
import MyBooking from "../components/MyProfile/MyBooking";
import ProfileSettings from "../components/MyProfile/ProfileSettings";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../../store/authSlice";
import { BASE_URL } from "../../config";
import { getCookie } from "../../utils/getCookie";
import Skeleton from "react-loading-skeleton";
import { useToasts } from "react-toast-notifications";
import { useNavigate } from "react-router";


function MyProfile() {
  const role = useSelector((state) => state.auth.role);
  const user = useSelector((state) => state.auth.user);
  const {addToast} = useToasts()
  const isLoading = useSelector((state) => state.auth.isLoading);
  const dispatch = useDispatch();
  const [fechedData,setFechedData] = useState({})
  const [selectedMenu, setSelectedMenu] = useState("booking");

  const navigate = useNavigate()
  const onClickHandler = (selection) => {
    setSelectedMenu(selection);
  };
  const logOutHandler = () => {
   const cnf = confirm("Do You Sure, Want To Logout?")
   if(cnf){
    dispatch(authAction.logout());
    navigate('/login')
   }

  };

  useEffect(()=>{
    dispatch(authAction.setLoading(true))
    const getUserProfile = async () => {
      const res = await fetch(`${BASE_URL}/api/v1/${role==='doctor'?'doctors':'users'}/profile`, {
        method: "GET",
        credentials: "include",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer '+getCookie('token'),
        },
      });
      const data = await res.json();
      setFechedData(data.data)
      dispatch(authAction.setLoading(false))
      
    };
    getUserProfile()

  },[dispatch,role])
  
  const deleteUserAccount = async()=>{
    const ifSure = confirm('Are You Sure? You Want To Delete Account.')
    if(ifSure){
      const res = await fetch(`${BASE_URL}/api/v1/users/${user}`, {
        method: "DELETE",
        credentials: "include",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer '+getCookie('token'),
        },
      });
      const result = await res.json();
      setFechedData(result.data)
     if(!res.ok){
        return addToast(result.message,{appearance:'error'})
     }
     dispatch(authAction.logout())
     addToast(result.message,{appearance:'success'})
     navigate('/')
    }

  } 

  return (
    <div className=" flex justify-center w-full  px-5 sm:px-10 lg:px-32">
      <div className=" max-w-[70rem]  md:gap-x-12 md:gap-y-12 gap-y-12 gap-x-0 grid grid-cols-1 md:grid-cols-3  pt-24">
        {isLoading?<Skeleton width={100} count={10}/>:<div className=" space-y-5">
          <div className="flex justify-center">
            <img
              className=" rounded-full w-28 h-28 border border-blue-500"
              
              src={fechedData?.photo}
              alt=""
            />{" "}
          </div>
          <div>
            <h1 className=" text-center">{fechedData?.name}</h1>
            <p className=" text-center">{fechedData?.email}</p>
            <p className=" text-center">
              Blood Type: <span>{fechedData?.bloodType?fechedData.bloodType:"unknown"}</span>
            </p>
          </div>
          <div className=" space-y-4">
            <button
              onClick={logOutHandler}
              className=" px-8 py-4 bg-black text-white w-full rounded-md"
            >
              Logout
            </button>
            <button onClick={deleteUserAccount} className=" px-8 py-4 bg-red-600 text-white w-full rounded-md">
              Delete account
            </button>
          </div>
        </div>}
        <div className=" col-span-2">
          <div className=" space-x-4">
            <button
              onClick={() => {
                onClickHandler("booking");
              }}
              className=" text-headingColor font-semibold rounded-md border-2 border-slate-400 py-2 px-3 "
            >
              My Bookings
            </button>
            <button
              onClick={() => {
                onClickHandler("profile");
              }}
              className="text-headingColor font-semibold rounded-md border-2 border-slate-400 py-2 px-3 "
            >
              Profile Settings
            </button>
            <div className=" mt-8">
              {selectedMenu === "booking" && <MyBooking />}
              {selectedMenu === "profile" && <ProfileSettings />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
