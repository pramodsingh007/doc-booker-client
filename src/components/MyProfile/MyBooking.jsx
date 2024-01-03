import { useEffect, useState } from "react";
import { authAction } from "../../../store/authSlice";
import { BASE_URL } from "../../../config";
import { getCookie } from "../../../utils/getCookie";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";

function MyBooking() {
  const [appointment, setAppointment] = useState([]);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  useEffect(() => {
    dispatch(authAction.setLoading(true));
    const getUserAppointment = async () => {
      const res = await fetch(`${BASE_URL}/api/v1/bookings`, {
        method: "GET",
        credentials: "include",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getCookie("token"),
        },
      });
      const result = await res.json();
      if (!res.ok) {
        throw Error(result.message);
      }
      setAppointment(result.data);
      dispatch(authAction.setLoading(false));
    };
    getUserAppointment();
  }, [dispatch]);

  return (
    <div>
      {isLoading ? (
        <Skeleton height={40} count={7} />
      ) :appointment.length>0&& (
        <div>
          <h1 className=" font-semibold text-xl mb-3">My Bookings</h1>
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
                APPOINTMENT DATE
              </th>
              <th scope="col" className="px-6 py-3">
                BOOKING ID
              </th>
              <th scope="col" className="px-6 py-3">
                TICKET PRICE
              </th>
              <th scope="col" className="px-6 py-3">
                BOOKED ON
              </th>
            </tr>
          </thead>
          <tbody>
            {appointment?.map((apt, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="px-6 py-4 capitalize font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {index+1}
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 capitalize font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {apt?.doctorName}
                </th>
                <td className="px-6 py-4">{new Date(apt?.appointmentDate).toDateString()}</td>
                <td className="px-6 py-4">{apt?._id}</td>
                <td className="px-6 py-4">₹{apt?.ticketPrice}</td>
                <td className="px-6 py-4 text-right">
                {new Date(apt?.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        </div>
      )}
      {!isLoading&&appointment.length===0&&<h1>Not booking done yet</h1>}
    </div>
  );
}

export default MyBooking;
