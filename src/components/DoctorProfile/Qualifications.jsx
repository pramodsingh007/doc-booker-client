/* eslint-disable react/prop-types */
import { Trash} from "lucide-react";
import {useState } from "react";
import {useToasts} from 'react-toast-notifications';

function Qualifications({setFormData,formData}) {
    const [qualifications, setQualifications] = useState(formData);
    const {addToast} = useToasts()
    const handleAddQualification = () => {
      setQualifications([...qualifications, {qualificationStartingDate:'',qualificationEndingDate:'', degree: '', university: '' }]);
    };
  
    const handleQualificationChange = (index, field, value) => {
      const updatedQualifications = [...qualifications];
      updatedQualifications[index][field] = value;
      setQualifications(updatedQualifications);
    };
  
    const handleRemoveQualification = (index) => {
      const updatedQualifications = [...qualifications];
      updatedQualifications.splice(index, 1);
      setQualifications(updatedQualifications);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault()
      setFormData((state)=>{return{...state,qualifications:[...qualifications]}})
    addToast('Qualification data saved',{appearance:'success'})
    };

    
  return (
    <div className=" space-y-3">
          <h1 className=" font-semibold">Qualification*</h1>
          {qualifications.map((field, index) => {
            return (
              <div key={index}>
                <div className=" grid grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="">Starting Date*</label>
                    <input
                        defaultValue={field?.qualificationStartingDate}
                        required={true}
                        onChange={(e)=>{handleQualificationChange(index,'qualificationStartingDate',e.target.value)}}
                        name={"qualificationStartingDate"}
                      className=" w-full h-12   p-2 border rounded-md outline-none"
                      type="date"
                    />
                  </div>
                  <div>
                    <label htmlFor="">Ending Date*</label>
                    <input
                        defaultValue={field?.qualificationEndingDate}
                        required={true}
                        onChange={(e)=>{handleQualificationChange(index,'qualificationEndingDate',e.target.value)}}
                        name={"qualificationEndingDate"}
                      className=" h-12   w-full p-2 border rounded-md outline-none"
                      type="date"
                    />
                  </div>
                </div>
                <div className=" grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="">Degree*</label>
                    <input
                    defaultValue={field?.degree}
                        required={true}
                       onChange={(e)=>{handleQualificationChange(index,'degree',e.target.value)}}
                        name={"degree"}
                      placeholder="Degree"
                      className=" h-12  w-full p-2 border rounded-md outline-none"
                      type="text"
                    />
                  </div>
                  <div>
                    <label htmlFor="">University*</label>
                    <input
                    defaultValue={field?.university}
                        required={true}
                       onChange={(e)=>{handleQualificationChange(index,'university',e.target.value)}}
                      placeholder="University"
                      className=" h-12  w-full p-2 border rounded-md outline-none"
                      type="text"
                      name="university"
                    />
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleRemoveQualification(index)
                  }}
                >
                  <Trash className=" fill-red-700 text-black" />
                </button>
              </div>
            );
          })}
          <div className=" space-x-4">
          <button
            onClick={handleAddQualification}
            className=" bg-black text-white rounded-md px-4 py-2"
          >
            Add Qualification
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className=" bg-black text-white rounded-md px-4 py-2"
          >
            Save
          </button>
          </div>
        </div>
  )
}

export default Qualifications