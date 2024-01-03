import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../../config";
import { authAction } from "../../../store/authSlice";
import { getCookie } from "../../../utils/getCookie";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useToasts } from "react-toast-notifications";

function ManageDoctors() {
  const dispatch = useDispatch()
  const isLoading = useSelector(state=>state.auth.isLoading)
  const [appointment,setAppointment] = useState([])
  const {addToast} = useToasts()
  useEffect(() => {
    dispatch(authAction.setLoading(true));
    const getDoctorProfile = async () => {
      const res = await fetch(
        `${BASE_URL}/api/v1/doctors`,
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
      const result = await res.json();
      if(!res.ok){
        throw Error(result.message)
      }
      setAppointment(result.data)      
      dispatch(authAction.setLoading(false));
    };
    getDoctorProfile();
  }, [dispatch]);

  const statusChangeHandler  = async(e,id)=>{
     const status = e.target.value
      const res = await fetch(
        `${BASE_URL}/api/v1/doctors/change-status`,
        {
          method: "POST",
          credentials: "include",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getCookie("token"),
          },
          body:JSON.stringify({id:id,status:status})
        }
      );
      const result = await res.json();
      
      if(!res.ok){
        addToast(result.message,{appearance:'error'})
        throw Error(result.message)
      }
      addToast(result.message,{appearance:'success'})
      
  }

  return (
    <>
    {isLoading?<Skeleton height={40} count={7}/>:appointment.length>0&&<div className=" w-full">
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-orange-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
             SR. NO.
            </th>
            <th scope="col" className="px-6 py-3">
             DOCTOR NAME
            </th>
            <th scope="col" className="px-6 py-3">
              GENDER
            </th>
            <th scope="col" className="px-6 py-3">
              DOCTOR EMAIL
            </th>
            <th scope="col" className="px-6 py-3">
              TICKET PRICE
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {appointment?.map((doc,index)=><tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th
              scope="row"
              className="px-6 capitalize py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {index+1}
            </th>
            <th
              scope="row"
              className="px-6 capitalize py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {doc?.name}
            </th>
            <td className="px-6 capitalize py-4">{doc?.gender}</td>
            <td className="px-6 py-4">{doc?.email}</td>
            <td className="px-6 py-4">₹{doc?.ticketPrice}</td>
            <td className={`px-6 py-4`}>
                <select onChange={(e)=>{statusChangeHandler(e,doc._id)}} className=" outline-none uppercase p-1" defaultValue={doc?.isApproved} name="">
                  <option className=" uppercase" value="approved">approved</option>
                  <option className=" uppercase" value="pending">pending</option>
                  <option className=" uppercase" value="reject">reject</option>
                </select>
            </td>
          </tr>)}
        </tbody>
      </table>
    </div>
  </div>}

  {!isLoading&&appointment.length===0&&<p className=" font-semibold">No Appointments yet</p>}
    </>
  );
}

export default ManageDoctors;
