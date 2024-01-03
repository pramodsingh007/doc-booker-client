import { useToasts } from 'react-toast-notifications';
import {BASE_URL} from '../../config';


function Contact() {

  const {addToast} = useToasts()
  const sendEmailHandler = async(e)=>{
    e.preventDefault()

    const form = new FormData(e.target)
    let data = {}
    for(const [key,value] of form.entries()){
        data[key] = value
    }
    
   
    const res = await fetch(`${BASE_URL}/api/v1/emails`, {
      method: "POST",
      credentials: "include",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify(data)
    });
    const result = await res.json();
    if(!res.ok){
      return addToast(result.message,{appearance:'error'})
    }
    addToast(result.message,{appearance:'success'})
    e.target.reset()
  }
  return (
    <div className="px-5 sm:px-10 flex justify-center lg:px-32 pt-24">
        <form onSubmit={sendEmailHandler} method="POST" className=" max-w-[60rem] space-y-3">
              <h1 className=" text-3xl text-headingColor text-center font-semibold">Contact Us</h1>
              <p className=" text-center">Got a technical issue? Want to send feedback about a beta feature? Let us know.</p>
              <div>
              <label className=" text-textColor font-semibold" htmlFor="email">Your Email</label>
              <input name="email" placeholder="example@gmail.com" type="text" className=" w-full border-2 outline-none p-2 h-12" />
              </div>
              <div>
              <label className=" text-textColor font-semibold" htmlFor="email">Subject</label>
              <input name="subject" placeholder="Let us know how we can help you" type="text" className=" w-full outline-none border-2 p-2 h-12" />
              </div>
              <div>
              <label className=" text-textColor font-semibold" htmlFor="email">Your Message</label>
              <textarea name="message" placeholder="Leave a comment" className=" border-2 p-2 resize-none w-full outline-none"  id="" cols="30" rows="10"></textarea>
              </div>
              <button type="submit" className=" bg-primaryColor text-white py-2 rounded-md px-4">Submit</button>
        </form>
    </div>
  )
}

export default Contact