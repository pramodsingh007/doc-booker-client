/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "../../../utils/getCookie";
import { BASE_URL } from "../../../config";
import { useNavigate, useParams } from "react-router";
import { useToasts } from "react-toast-notifications";


const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function SlotesModel({ modalIsOpen, setIsOpen }) {
 

  const {addToast} = useToasts()
  const [fetchedDoctorData, setFetchedDoctorData] = useState({});
  const user = useSelector(state=>state.auth.user)
  const navigate = useNavigate()
  const { docId } = useParams();
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDay, setSelectedDay] = useState('');

 

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    const getDoctorProfile = async () => {
      const res = await fetch(`${BASE_URL}/api/v1/doctors/${docId}`, {
        method: "GET",
        credentials: "include",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getCookie("token"),
        },
      });
      const data = await res.json();
      if(!res.ok){
        throw Error(data.message)
      }

      setFetchedDoctorData(data.data);
    };
    getDoctorProfile();
  }, [dispatch, docId]);

  const bookAppointment = async (e) => {
    e.preventDefault()
    const appointmentData = {
        doctor:fetchedDoctorData._id,
        user:user,
        ticketPrice:fetchedDoctorData.ticketPrice,
        appointmentDate:selectedDate
    
    }


    const res = await fetch(`${BASE_URL}/api/v1/bookings`, {
          method: "POST",
          credentials: "include",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getCookie("token"),
          },
          body:JSON.stringify(appointmentData)
        });
    
        const result = await res.json();
        if(!res.ok){
                return addToast(result.message,{appearance:"error"})
            }
            setIsOpen(false)
            addToast(result.message,{appearance:"success"})
  //   const res = await fetch(`${BASE_URL}/api/v1/bookings/checkout`, {
  //     method: "POST",
  //     credentials: "include",
  //     mode: "cors",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + getCookie("token"),
  //     },
  //     body:JSON.stringify({name:'pramod singh',price:fetchedDoctorData.ticketPrice})
  //   });

  //   const data = await res.json();
  //   if(!res.ok){
  //       return addToast(data.message,{appearance:"error"})
  //   }
  //   setIsOpen(false)
  //  location.href = data.url
   
   
    
  };


  const handleDayChange = (e)=>{
      setSelectedDay(e.target.value)
  }

  const handleDateChange = (event) => {
    const inputDate = new Date(event.target.value);

    // Check if the selected day is a Monday (where Sunday is 0 and Monday is 1)
    let dayToShow = 0
    let day = ''
    switch(selectedDay){
      case "Monday":
        dayToShow=1
        day="Monday"
        break;
      case "Tuesday":
        dayToShow=2
        day="Tuesday"
        break;
      case "Wednesday":
        dayToShow=3
        day="Wednesday"
        break;
      case "Thursday":
        dayToShow=4
        day="Thursday"
        break;
      case "Friday":
        dayToShow=5
        day="Friday"
        break;
      case "Saturday":
        dayToShow=6
        day="Saturday"
        break;
      case "Sunday":
        dayToShow=0
        day="Sunday"
        break;


    }
    if (inputDate.getDay() === dayToShow) {
      setSelectedDate(inputDate.toISOString().split('T')[0]);
      // Continue with your logic
    } else {
      alert(`Invalid day. Please select a ${day} only.`);
      // Clear the input field or handle the invalid selection
      setSelectedDate('');
    }
  };

  return (
    <div>
      <Modal
      ariaHideApp={false}
        isOpen={modalIsOpen}
        
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h1 className=" font-semibold mb-4">Choose Time Slot*</h1>

        <form onSubmit={bookAppointment} method="POST" action="">

        <div className=" grid grid-cols-2 gap-4 ">
          <div>
            <label htmlFor="">Day*</label>
            <select
              onChange={handleDayChange}
              required={true}
              className=" h-12 w-full border p-2 outline-none rounded-md"
              name="timeSlotDay"
              
            >
              <option defaultChecked value="null">-SELECT-</option>
              {fetchedDoctorData?.timeSlots?.map((field, index) => (
                <option  key={index} value={field?.timeSlotDay}>
                  {field?.timeSlotDay}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="">Date*</label>
            <input
        className='h-12 w-full border p-2 outline-none rounded-md'
        type="date"
        id="mondayOfMonth"
        value={selectedDate}
        onChange={handleDateChange}
      />
          </div>
        </div>

        <div className=" space-x-3">
          <button
           
            type="submit"
            className="  bg-primaryColor text-white mt-4  rounded-md px-4 py-2"
          >
            Book Appointment
          </button>
        </div>
        </form>
      </Modal>
    </div>
  );
}

export default SlotesModel;
