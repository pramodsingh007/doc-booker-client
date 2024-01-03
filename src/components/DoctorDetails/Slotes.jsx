/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useState } from "react";
import SlotesModel from "./SlotsModel"

function Slotes({fetchedData}) {
  const [modalIsOpen, setIsOpen] = useState(false);
  
  const openSlotsModel = ()=>{
      setIsOpen(true)
  }
  return (
    <div className=' shadow-panelShadow p-6 text-textColor sm:max-w-[20rem] max-w-full  rounded-md  space-y-4'>
                <SlotesModel setIsOpen={setIsOpen} modalIsOpen={modalIsOpen}  />
                <div className=' flex justify-between'>
                  <p>Ticket Price</p>
                  <p className=' font-semibold'>₹{fetchedData?.ticketPrice}</p>
                </div>
                <p>Available Time Slotes</p>
                {fetchedData.timeSlots?.map((slot,index)=><div key={index} className=" flex justify-between">
                    <p>{slot?.timeSlotDay}</p>
                    <p>{new Date('1970-01-01T' + slot?.timeSlotStartingTime + 'Z').toLocaleTimeString('en-US',{timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'})} - {new Date('1970-01-01T' + slot?.timeSlotEndingTime + 'Z').toLocaleTimeString('en-US',{timeZone:'IST',hour12:true,hour:'numeric',minute:'numeric'})}</p>
                </div>)}
               
               
                <button onClick={openSlotsModel} className=" bg-primaryColor w-full rounded-md text-white py-2 px-4">Book Appointment</button>
    </div>
  )
}

export default Slotes