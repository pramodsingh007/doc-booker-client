/* eslint-disable react/prop-types */
import { Trash } from "lucide-react";
import { useState } from "react";
import { useToasts } from "react-toast-notifications";

function Slots({setFormData,formData}) {
    const [slots, setSlots] = useState(formData?.timeSlots);
    const {addToast} = useToasts()
    const handleAddSlot = () => {
      setSlots([...slots, {timeSlotDay:'',timeSlotStartingTime:'',timeSlotEndingTime:'',}]);
    };
  
    const handleSlotChange = (index, field, value) => {
      const updatedSlots = [...slots];
      updatedSlots[index][field] = value;
      setSlots(updatedSlots);
    };
  
    const handleRemoveSlot = (index) => {
      const updatedSlots = [...slots];
      updatedSlots.splice(index, 1);
      setSlots(updatedSlots);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault()
      setFormData((state)=>{return{...state,timeSlots:[...slots]}})
    addToast('TimeSlots data saved',{appearance:'success'})
    };
  return (
    <div className=" space-y-3">
      <h1 className=" font-semibold">Time Slots*</h1>
      {slots?.map((field, index) => (
        <div key={index} className=" grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="">Day*</label>
            <select
                defaultValue={field?.timeSlotDay}
                required={true}
                onChange={(e)=>{handleSlotChange(index,'timeSlotDay',e.target.value)}}
              className=" h-12 w-full border p-2 outline-none rounded-md"
              name="timeSlotDay"
              id=""
            >
              <option value="">-SELECT-</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </div>
          <div>
            <label htmlFor="">Starting Time*</label>
            <input
                defaultValue={field?.timeSlotStartingTime}
                required={true}
                 onChange={(e)=>{handleSlotChange(index,'timeSlotStartingTime',e.target.value)}}
              type="time"
              className=" h-12 w-full border p-2 outline-none rounded-md"
              name="timeSlotStartingTime"
              id=""
            />
          </div>
          <div>
            <label htmlFor="">Ending Time*</label>

            <input
            defaultValue={field?.timeSlotEndingTime}
            required={true}
             onChange={(e)=>{handleSlotChange(index,'timeSlotEndingTime',e.target.value)}}
              type="time"
              className=" h-12 w-full border p-2 outline-none rounded-md"
              name="timeSlotEndingTime"
              id=""
            />
          </div>
          <button
            onClick={() => {
              handleRemoveSlot(index);
            }}
          >
            <Trash className=" fill-red-700 text-black" />
          </button>
        </div>
      ))}
     <div className=" space-x-3">
     <button
        onClick={handleAddSlot}
        className=" bg-black text-white mt-4  rounded-md px-4 py-2"
      >
        Add Slot
      </button>
     <button
        onClick={handleSubmit}
        className=" bg-black text-white mt-4  rounded-md px-4 py-2"
      >
       Save
      </button>
     </div>
    </div>
  );
}

export default Slots;
