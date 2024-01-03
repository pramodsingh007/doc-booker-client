/* eslint-disable react/prop-types */
function About({setFormData,formData}) {

  return (
    <div>
      <label className=" font-semibold" htmlFor="">
        About*
      </label>
      <textarea
      defaultValue={formData?.about}
        onChange={(e)=>{setFormData((state)=>{return{...state,about:e.target.value}})}}
        required={true}
        className=" w-full outline-none border p-2 resize-none rounded-md"
        name="about"
        id=""
        cols="30"
        rows="10"
      ></textarea>
    </div>
  );
}

export default About;
