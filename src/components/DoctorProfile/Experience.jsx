/* eslint-disable react/prop-types */
import { Trash } from "lucide-react";
import { useState } from "react";
import { useToasts } from "react-toast-notifications";

function Experience({setFormData,formData}) {
    const [experiences, setExperiences] = useState(formData?.experiences);
    const {addToast} = useToasts()
    const handleAddExperience = () => {
      setExperiences([...experiences, {experienceStartingDate:'',experienceEndingDate:'', position: '', hospital: '' }]);
    };
  
    const handleExperienceChange = (index, field, value) => {
      const updatedQualifications = [...experiences];
      updatedQualifications[index][field] = value;
      setExperiences(updatedQualifications);
    };
  
    const handleRemoveExperiences = (index) => {
      const updatedExperiences = [...experiences];
      updatedExperiences.splice(index, 1);
      setExperiences(updatedExperiences);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault()
      setFormData((state)=>{return{...state,experiences:[...experiences]}})
    addToast('Experiences data saved',{appearance:'success'})
    };
  return (
    <div className=" space-y-3">
          <h1 className=" font-semibold">Experiences*</h1>
          {experiences?.map((field, index) => {
            return (
              <div key={index}>
                <div className=" grid grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="">Starting Date*</label>
                    <input
                        defaultValue={field?.experienceStartingDate}
                        onChange={(e)=>{handleExperienceChange(index,'experienceStartingDate',e.target.value)}}
                        name="experienceStartingDate"
                      className=" w-full h-12   p-2 border rounded-md outline-none"
                      type="date"
                    />
                  </div>
                  <div>
                    <label htmlFor="">Ending Date*</label>
                    <input
                    defaultValue={field?.experienceEndingDate}
                    onChange={(e)=>{handleExperienceChange(index,'experienceEndingDate',e.target.value)}}
                      name="experienceEndingDate"
                      className=" h-12   w-full p-2 border rounded-md outline-none"
                      type="date"
                    />
                  </div>
                </div>
                <div className=" grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="">Position*</label>
                    <input
                        defaultValue={field?.position}
                         onChange={(e)=>{handleExperienceChange(index,'position',e.target.value)}}
                        name="position"
                      placeholder="Position"
                      className=" h-12  w-full p-2 border rounded-md outline-none"
                      type="text"
                    />
                  </div>
                  <div>
                    <label htmlFor="">Hospital*</label>
                    <input
                    defaultValue={field?.hospital}
                     onChange={(e)=>{handleExperienceChange(index,'hospital',e.target.value)}}
                    name="hospital"
                      placeholder="Hospital"
                      className=" h-12  w-full p-2 border rounded-md outline-none"
                      type="text"
                    />
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleRemoveExperiences(index);
                  }}
                >
                  <Trash className=" fill-red-700 text-black" />
                </button>
              </div>
            );
          })}
          <div className=" space-x-3">
          <button
            onClick={handleAddExperience}
            className=" bg-black text-white rounded-md px-4 py-2"
          >
            Add Exeperiance
          </button>
          <button
            onClick={handleSubmit}
            className=" bg-black text-white rounded-md px-4 py-2"
          >
            Save
          </button>
          </div>
        </div>
  )
}

export default Experience