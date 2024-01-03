import { useEffect, useState } from "react";
import { uploadFile } from "../../../utils/uploadFile";
import { BASE_URL } from "../../../config";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "../../../utils/getCookie";
import { useToasts } from "react-toast-notifications";
import { authAction } from "../../../store/authSlice";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function ProfileSettings() {
  const user = useSelector((state) => state.auth.user);
  const role = useSelector((state) => state.auth.role);
  const [formData,setFormData] = useState({})
  const isLoading = useSelector((state) => state.auth.isLoading);
  const dispatch = useDispatch()
  const [profileImage, setProfileImage] = useState(formData?.photo);


  const { addToast } = useToasts();

  const profileImageHandler = async (e) => {
    const file = e.target.files[0];
    const downloadUrl = await uploadFile(file);
    setProfileImage(downloadUrl);
    setFormData((state)=>{return{...state,photo:downloadUrl}})
  };

  useEffect(() => {
    dispatch(authAction.setLoading(true))
    const getUserProfile = async () => {
      const res = await fetch(
        `${BASE_URL}/api/v1/users/profile`,
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
      setFormData(data.data);
      dispatch(authAction.setLoading(false))
    };
    getUserProfile();
  }, [role,dispatch]);

  const updateUserHandler = async (e) => {
    e.preventDefault();
    

    const res = await fetch(
      `${BASE_URL}/api/v1/${role === "doctor" ? "doctors" : "users"}/${user}`,
      {
        method: "put",
        credentials: "include",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getCookie("token"),
        },
        body: JSON.stringify(formData),
      }
    );
    const responseData = await res.json();
    if (!res.ok) {
      return addToast(responseData.message, { appearance: "error" });
    }
    addToast(responseData.message, { appearance: "success" });
    
  };
  return (
    <>
    {isLoading?<Skeleton count={8}/>:<div>
      <h1 className=" font-semibold text-xl ">Profile Settings</h1>
    <form onSubmit={updateUserHandler} method="POST" className="space-y-4">
      <input
        onChange={(e) => {
          setFormData((state) => {
            return { ...state, name: e.target.value };
          });
        }}
        defaultValue={formData?.name}
        name="name"
        className=" outline-none border-b-2 w-full h-12"
        type="text"
        placeholder="Full Name"
      />
      <input
        onChange={(e) => {
          setFormData((state) => {
            return { ...state, email: e.target.value };
          });
        }}
        defaultValue={formData?.email}
        name="email"
        className=" outline-none border-b-2 w-full h-12"
        type="email"
        placeholder="Enter your email"
      />
      <input
      onChange={(e) => {
        setFormData((state) => {
          return { ...state, password: e.target.value };
        });
      }}
        name="password"
        className=" outline-none border-b-2 w-full h-12"
        type="password"
        placeholder="Update Password"
      />
      <input
      onChange={(e) => {
        setFormData((state) => {
          return { ...state, bloodType: e.target.value };
        });
      }}
        defaultValue={formData?.bloodType}
        required={true}
        name="bloodType"
        className=" outline-none border-b-2 w-full h-12"
        placeholder="Blood Type"
      />
      <div>
        <label className=" font-semibold" htmlFor="">
          Gender:
        </label>
        <select
          onChange={(e) => {
            setFormData((state) => {
              return { ...state, gender: e.target.value };
            });
          }}
          defaultChecked={formData?.gender}
          className=" outline-none mx-3"
          name="gender"
          id="gender"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div className=" flex items-center gap-4">
        <div>
          {profileImage && (
            <img
              className=" rounded-full w-[52px] h-[52px]"
              src={profileImage}
              alt="patientavatar"
            />
          )}
        </div>
        <input
          onChange={profileImageHandler}
          name="profileImage"
          className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
          id="formFileLg"
          type="file"
        />
      </div>
      <button
        type="submit"
        className=" bg-primaryColor text-white py-2 w-full rounded-md"
      >
        Update
      </button>
    </form>
      </div>}
    </>
  );
}

export default ProfileSettings;
