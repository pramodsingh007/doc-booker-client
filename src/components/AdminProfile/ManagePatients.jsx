import { useEffect, useState } from "react";
import { authAction } from "../../../store/authSlice";
import { BASE_URL } from "../../../config";
import { getCookie } from "../../../utils/getCookie";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import { useToasts } from "react-toast-notifications";

function ManagePatients() {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const {addToast} = useToasts()
  useEffect(() => {
    dispatch(authAction.setLoading(true));
    const getUsers = async () => {
      const res = await fetch(`${BASE_URL}/api/v1/users`, {
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
      setUsers(result.data);
      dispatch(authAction.setLoading(false));
    };
    getUsers();
  }, [dispatch]);

  const deleteUserHandler = async(id)=>{
    const res = await fetch(`${BASE_URL}/api/v1/users/${id}`, {
      method: "DELETE",
      credentials: "include",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("token"),
      },
    });
    const result = await res.json();
    if(!res.ok){
      return addToast(result.message,{appearance:'error'})
    }
    setUsers(()=>users.filter((user)=>user._id!==id))
    addToast(result.message,{appearance:'success'})
  }
  return (
    <div>
      {isLoading ? (
        <Skeleton height={40} count={7} />
      ) :users.length>0&& (
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
                PATIENTS NAME
              </th>
              <th scope="col" className="px-6 py-3">
                EMAIL
              </th>
              <th scope="col" className="px-6 py-3">
              GENDER
              </th>
              <th scope="col" className="px-6 py-3">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
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
                  {user?.name}
                </th>
                <td className="px-6 py-4">{user?.email}</td>
                <td className="px-6 py-4">{user?.gender}</td>
                <td className="px-6 py-4"><button className=" bg-red-500 p-2 rounded-md text-white" onClick={()=>{deleteUserHandler(user?._id)}}>DELETE</button></td>
               
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        </div>
      )}
      {!isLoading&&users.length===0&&<h1 className=" font-semibold">No users yet</h1>}
    </div>
  );
}

export default ManagePatients;
