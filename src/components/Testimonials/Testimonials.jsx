import Card from './Card';

function Testimonials() {
  return (
    <section className="px-5 sm:px-10 lg:px-32 pt-24 ">
      <div className=" flex justify-center mb-8">
        <div className=" max-w-md space-y-4">
          <h1 className=" text-3xl font-semibold text-center text-headingColor">
            What our patients say 
          </h1>
          <p className=" text-textColor text-center">
            World class care for everyone Out health System offers unmatched,
            expert health care
          </p>
        </div>
      </div>
      <Card/>
      
    </section>
  );
}

export default Testimonials;
