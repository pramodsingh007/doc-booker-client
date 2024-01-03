/* eslint-disable react/prop-types */
import PersonalInformation from "./PersonalInformation";
import Qualifications from "./Qualifications";
import Experience from "./Experience";
import UploadProfilePhoto from "./UploadProfilePhoto";
import Slots from "./Slots";
import About from "./About";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../config";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "../../../utils/getCookie";
import { authAction } from "../../../store/authSlice";
import Skeleton from "react-loading-skeleton";
import { useToasts } from "react-toast-notifications";

function Profile() {
  const [formData,setFormData] = useState({name:'',email:'',qualifications:[],experiences:[],timeSlots:[],photo:'',about:'',bio:'',gender:'',specialization:'',ticketPrice:''})
  const {addToast} = useToasts()
  const dispatch = useDispatch()
  const user = useSelector(state=>state.auth.user)
  const isLoading = useSelector(state=>state.auth.isLoading)


  useEffect(() => {
    dispatch(authAction.setLoading(true));
    const getDoctorProfile = async () => {
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
      setFormData(data.data)
      dispatch(authAction.setLoading(false));
    };
    getDoctorProfile();
  }, [dispatch]);



  const onFormSubmit =async(e)=>{
    e.preventDefault()
    const res = await fetch(`${BASE_URL}/api/v1/doctors/${user}`,{
      method:"PUT",
      headers:{
        'Authorization':'Bearer '+getCookie('token'),
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formData)
    })

    const data = await res.json()
    if(!res.ok){
      addToast(data.message,{appearance:'error'})
    }
    addToast(data.message,{appearance:'success'})

    
  }
  return (
  <>
      {isLoading?<Skeleton height={40} count={50}/>:<div>
      <h1 className=" text-xl font-semibold">Profile Information</h1>
      <form onSubmit={onFormSubmit} method="POST" className=" text-sm sm:text-base space-y-6 mt-4">
        {/* personal Information */}
        <PersonalInformation formData={formData} setFormData={setFormData}  />
        {/* Qualification */}
        <Qualifications setFormData={setFormData}  formData={formData?.qualifications}/>
        {/* experience selection */}
        <Experience setFormData={setFormData} formData={formData} />
        {/* slot  */}
        <Slots setFormData={setFormData}  formData={formData} />
        {/* about */}
        <About setFormData={setFormData}  formData={formData} />
        {/* upload profile photo */}
        <UploadProfilePhoto setFormData={setFormData}  formData={formData} />
        <button type="submit" className=" w-full bg-primaryColor text-white py-2 rounded-md">
          Update Profile
        </button>
      </form>
    </div>}
  </>
  );
}

export default Profile;
