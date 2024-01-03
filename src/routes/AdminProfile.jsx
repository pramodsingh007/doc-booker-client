import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../../store/authSlice";
import { BASE_URL } from "../../config";
import { getCookie } from "../../utils/getCookie";
import AdminProfileSettings from "../components/AdminProfile/AdminProfileSettings";
import ManageBookings from "../components/AdminProfile/ManageBookings";
import ManageDoctors from "../components/AdminProfile/ManageDoctors";
import ManagePatients from "../components/AdminProfile/ManagePatients";
import { useNavigate } from "react-router";


function AdminProfile() {
    const [selectedMenu, setSelectedMenu] = useState("myprofile");
    const isLoading = useSelector(state=>state.auth.isLoading)
    const [fechedData,setFechedData] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logOutHandler = ()=>{
            const cnf = confirm('Do You Want To Logout?')
            if(cnf){
                dispatch(authAction.logout())
                navigate('/login')
            }
    }

    useEffect(()=>{
        dispatch(authAction.setLoading(true))
        const getUserProfile = async () => {
          const res = await fetch(`${BASE_URL}/api/v1/admin/profile`, {
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
    
      },[dispatch])


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
            <h1 className=" text-center">{fechedData?.name} <span className=" font-semibold">(Admin)</span></h1>
            <p className=" text-center">{fechedData?.email}</p>
          </div>
          <div className=" space-y-4">
            
            <button
              onClick={() => {
                setSelectedMenu("myprofile");
              }}
              className= {`text-headingColor w-full font-semibold rounded-md border-2 border-slate-400 py-2 px-3 ${selectedMenu==='myprofile'?' bg-primaryColor text-white':null} `}
            >
              Profile Settings
            </button>
            <button
              onClick={() => {
                setSelectedMenu("bookings");
              }}
              className={`text-headingColor w-full font-semibold rounded-md border-2 border-slate-400 py-2 px-3 ${selectedMenu==='bookings'?' bg-primaryColor text-white':null} `}
            >
              Manage Bookings
            </button>
            <button
              onClick={() => {
                setSelectedMenu("doctors");
              }}
              className={`text-headingColor w-full font-semibold rounded-md border-2 border-slate-400 py-2 px-3 ${selectedMenu==='doctors'?' bg-primaryColor text-white':null} `}
            >
              Manage Doctors
            </button>
            <button
              onClick={() => {
                setSelectedMenu("patients");
              }}
              className={`text-headingColor w-full font-semibold rounded-md border-2 border-slate-400 py-2 px-3 ${selectedMenu==='patients'?' bg-primaryColor text-white':null} `}
            >
              Manage Patients
            </button>
            <button
              onClick={logOutHandler}
              className=" px-8 py-4 bg-red-500 text-white w-full rounded-md"
            >
              Logout
            </button>
          </div>
        </div>}
        <div className=" col-span-2">
          <div className=" space-x-4">
           
            <div className=" mt-8">
              
              {selectedMenu === "myprofile" && <AdminProfileSettings/>}
              {selectedMenu === "bookings" && <ManageBookings/>}
              {selectedMenu === "doctors" && <ManageDoctors/>}
              {selectedMenu === "patients" && <ManagePatients />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminProfile