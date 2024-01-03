import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../../config";
import { authAction } from "../../../store/authSlice";
import { getCookie } from "../../../utils/getCookie";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

function Appointment() {
  const dispatch = useDispatch()
  const isLoading = useSelector(state=>state.auth.isLoading)
  const [appointment,setAppointment] = useState([])

  useEffect(() => {
    dispatch(authAction.setLoading(true));
    const getDoctorProfile = async () => {
      const res = await fetch(
        `${BASE_URL}/api/v1/bookings`,
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


  return (
    <>
    {isLoading?<Skeleton height={40} count={7}/>:appointment.length>0&&<div className=" w-full">
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-orange-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              PATIENT NAME
            </th>
            <th scope="col" className="px-6 py-3">
              GENDER
            </th>
            <th scope="col" className="px-6 py-3">
              Booking Id
            </th>
            <th scope="col" className="px-6 py-3">
              TICKET PRICE
            </th>
            <th scope="col" className="px-6 py-3">
            APPOINTMENT DATE
            </th>
          </tr>
        </thead>
        <tbody>
          {appointment?.map((apt,index)=><tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th
              scope="row"
              className="px-6 capitalize py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {apt?.userName}
            </th>
            <td className="px-6 capitalize py-4">{apt?.userGender}</td>
            <td className="px-6 py-4">{apt?._id}</td>
            <td className="px-6 py-4">₹{apt?.ticketPrice}</td>
            <td className="px-6 py-4 text-right">
                {new Date(apt?.appointmentDate).toLocaleDateString()}
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

export default Appointment;
