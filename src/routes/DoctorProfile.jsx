import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../../store/authSlice";
import { BASE_URL } from "../../config";
import { getCookie } from "../../utils/getCookie";
import Overview from "../components/DoctorProfile/Overview";
import Appointment from "../components/DoctorProfile/Appointment";
import Profile from "../components/DoctorProfile/Profile";
import { useToasts } from "react-toast-notifications";
import { useNavigate } from "react-router";

function DoctorProfile() {
  const role = useSelector((state) => state.auth.role);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [fechedData, setFechedData] = useState();
  const [selectedMenu, setSelectedMenu] = useState("overview");
  const {addToast} = useToasts()
  const navigate = useNavigate()
 
  const logOutHandler = () => {
    const cnf = confirm("Do You Sure, Want To Logout?")
    if(cnf){
      dispatch(authAction.logout());
      navigate('/login')
    }
  };

  useEffect(() => {
    dispatch(authAction.setLoading(true));
    const getUserProfile = async () => {
      const res = await fetch(
        `${BASE_URL}/api/v1/doctors/profile`,
        {
          method: "get",
          credentials: "include",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getCookie("token"),
          },
        }
      );
      const data = await res.json();
      setFechedData(data.data);
      console.log(data.data)
      dispatch(authAction.setLoading(false));
    };
    getUserProfile();
  }, [dispatch, role]);

  const deleteDoctorProfile = async()=>{
    
      const ifSure = confirm('Are You Sure? You Want To Delete Account.')
      if(ifSure){
        const res = await fetch(`${BASE_URL}/api/v1/doctors/${user}`, {
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
      <div className=" min-w-full md:min-w-0 md:max-w-[70rem] md:gap-x-12 md:gap-y-12 gap-y-12 gap-x-0 grid grid-cols-1 md:grid-cols-3  pt-24">
        
       
          <div className=" space-y-5">
            <div className=" space-y-4">
              <button onClick={()=>{setSelectedMenu('overview')}} className= {`w-full rounded-md  py-3 ${selectedMenu==='overview'?' bg-slate-200 font-semibold text-primaryColor':null}`}>
                Overview
              </button>
              <button onClick={()=>{setSelectedMenu('appointment')}} className= {`w-full rounded-md py-3 ${selectedMenu==='appointment'?' bg-slate-200 font-semibold text-primaryColor':null}`}>Appointment</button>
              <button onClick={()=>{setSelectedMenu('profile')}} className={`w-full rounded-md py-3 ${selectedMenu==='profile'?' bg-slate-200 font-semibold text-primaryColor':null}`}>Profile</button>
            </div>
            <div className=" space-y-4">
              <button
                onClick={logOutHandler}
                className=" px-8 py-4 bg-black text-white w-full rounded-md"
              >
                Logout
              </button>
              <button onClick={deleteDoctorProfile} className=" px-8 py-4 bg-red-600 text-white w-full rounded-md">
                Delete account
              </button>
            </div>
          </div>
        
        <div className=" col-span-2">
          <div className=" mt-8">
            {fechedData?.isApproved==='pending'&&<p className=" text-red-700 font-semibold mb-4">Note: your profile is under verification you will be active when admin will approved you.</p>}
            {fechedData?.isApproved==='cancelled'&&<p className=" text-red-700 font-semibold mb-4">Your application is rejected by the admin contact admin for further inquery.</p>}
            {selectedMenu === "overview" && <Overview fechedData={fechedData}/>}
            {selectedMenu === "appointment" && <Appointment />}
            {selectedMenu === "profile" && <Profile />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorProfile;
