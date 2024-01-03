import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config";
import { useToasts } from "react-toast-notifications";
import { useEffect, useState } from "react";
import { uploadFile } from "../../utils/uploadFile";



function Register() {
  const navigate = useNavigate()
  const user = localStorage.getItem('user')
  const [profileImage, setProfileImage] = useState(null);
  useEffect(()=>{
    if(user){
      return navigate('/doctor')
    }
  },[user,navigate])
  const {addToast} = useToasts()
 const onSubmitHandler = async(e)=>{
    e.preventDefault()
    const {name,email,password,role,gender} = e.target
    const data = {
      name:name.value,
      email:email.value,
      password:password.value,
      role:role.value,
      gender:gender.value,
      photo:profileImage
    }
    const res = await fetch(`${BASE_URL}/api/v1/auth/register`,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(data)
    })

    const result = await res.json()
    if(!res.ok){
      addToast(result.message,{appearance:'error'})
      throw new Error(result.message)
    }

    addToast(result.message,{appearance:'success'})
    return navigate('/login')
    

  }
  const profileImageHandler = async (e) => {
    const file = e.target.files[0];
    const downloadUrl = await uploadFile(file);
    setProfileImage(downloadUrl);
    
  };
 
  return (
    <div className=" px-5 sm:px-10 relative lg:px-32 py-24 flex justify-center  items-center">
      
      <div className=" grid grid-cols-1 md:grid-cols-2 z-10 relative  bg-white overflow-hidden  rounded-md max-w-[60rem]">
        <div className=" md:flex hidden">
          <img src="/images/signup.gif" alt="signup" />
        </div>
        <form onSubmit={onSubmitHandler} method="POST" className=" p-8 space-y-4">
          <h1 className=" text-2xl">
            Create an <span className=" text-primaryColor">account</span>
          </h1>
          <input
            required={true}
            name="name"
            className=" outline-none border-b-2 w-full h-12"
            type="text"
            placeholder="Full Name"
          />
          <input
            required={true}
            name="email"
            className=" outline-none border-b-2 w-full h-12"
            type="email"
            placeholder="Enter your email"
          />
          <input
            required={true}
            name="password"
            className=" outline-none border-b-2 w-full h-12"
            type="password"
            placeholder="Password"
          />

          <div className=" flex justify-between">
            <div>
              <label className=" font-semibold" htmlFor="">
                Are you a:
              </label>
              <select   className=" outline-none mx-3" name="role" id="">
                <option defaultChecked={true} value="patient">Patient</option>
                <option value="doctor">Doctor</option>
              </select>
            </div>
            <div>
              <label className=" font-semibold" htmlFor="">
                Gender:
              </label>
              <select className=" outline-none mx-3" name="gender" id="gender">
                <option defaultChecked={true} value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
           
          </div>
          
          <div>
          <label className=" font-semibold" htmlFor="">
                Profile Image:
              </label>
          <div className=" flex items-center gap-4">
        <div>
          {profileImage && (
           <div>
             <img
              className=" rounded-full w-[52px] h-[52px]"
              src={profileImage}
              alt="patientavatar"
            />
           </div>
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
          </div>
          
          <button type="submit" className=" py-4 bg-primaryColor text-white w-full rounded-md ">
            SignUp
          </button>
          <p className=" text-center">
            Already have an account?{" "}
            <Link to={"/login"} className=" text-primaryColor">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
