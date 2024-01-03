/* eslint-disable react/prop-types */
function PersonalInformation({ setFormData,formData }) {
  return (
    <div>
      <div>
        <label htmlFor="">Name*</label>
        <input
            defaultValue={formData?.name}
          required={true}
          onChange={(e) => {
            setFormData((state) => {
              return { ...state, name: e.target.value };
            });
          }}
          name="name"
          type="text"
          className=" w-full h-12 outline-none border rounded-md p-2"
        />
      </div>
      <div>
        <label htmlFor="">Email*</label>
        <input
            defaultValue={formData?.email}
          required={true}
          onChange={(e) => {
            setFormData((state) => {
              return { ...state, email: e.target.value };
            });
          }}
          name="email"
          type="text"
          className=" w-full h-12 outline-none border rounded-md p-2"
        />
      </div>
      <div>
        <label htmlFor="">Phone*</label>
        <input
            defaultValue={formData?.phone}
          required={true}
          onChange={(e) => {
            setFormData((state) => {
              return { ...state, phone: e.target.value };
            });
          }}
          name="phone"
          type="text"
          className=" w-full h-12 outline-none border rounded-md p-2"
        />
      </div>
      <div>
        <label htmlFor="">Bio*</label>
        <input
            defaultValue={formData?.bio}
          required={true}
          onChange={(e) => {
            setFormData((state) => {
              return { ...state, bio: e.target.value };
            });
          }}
          name="bio"
          type="text"
          className=" w-full h-12 outline-none border rounded-md p-2"
        />
      </div>
      <div className=" grid grid-cols-3 gap-4">
        <div>
          <label htmlFor="">Gender</label>
          <select
          defaultValue={formData?.gender}
            required={true}
            onChange={(e) => {
              setFormData((state) => {
                return { ...state, gender: e.target.value };
              });
            }}
            className=" h-12 w-full border p-2 rounded-md"
            name="gender"
            id=""
          >
            <option value="">-SELECT-</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label htmlFor="">Specialization*</label>
          <select
          defaultValue={formData?.specialization}
            required={true}
            onChange={(e) => {
              setFormData((state) => {
                return { ...state, specialization: e.target.value };
              });
            }}
            className=" h-12 w-full border p-2 rounded-md"
            name="specialization"
            id=""
          >
            <option value="">-SELECT-</option>
            <option value="Dermatology">Dermatology</option>
            <option value="Neurology">Neurology</option>
            <option value="Endocrinologist">Endocrinologist</option>
            <option value="Oncologist">Oncologist</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Surgeon">Surgeon</option>
          </select>
        </div>
        <div>
          <label htmlFor="">Ticket Price*</label>
          <select
             defaultValue={formData?.ticketPrice}
            required={true}
            onChange={(e) => {
              setFormData((state) => {
                return { ...state, ticketPrice: e.target.value };
              });
            }}
            className=" h-12 w-full border p-2 rounded-md"
            name="ticketPrice"
            id=""
          >
            <option value="">-SELECT-</option>
            <option value="200">200</option>
            <option value="500">500</option>
            <option value="1000">1000</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default PersonalInformation;
