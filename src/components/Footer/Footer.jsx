import {Youtube,Github,Instagram,Linkedin} from 'lucide-react';
import {Link} from 'react-router-dom';


function Footer() {
  return (
    <footer className={' flex justify-center w-full px-5 sm:px-10 lg:px-32 mt-24 pb-12'}>
      <div className=' grid gap-12 grid-cols-3 md:grid-cols-6'>

            <div className=' col-span-3'>
              <ul className={' space-y-4'}>
                <li> <h1 className="text-2xl md:text-3xl text-headingColor font-extrabold items-center">
            <span className=" text-primaryColor font-extrabold text-3xl">
              +
            </span>
            DocBooker
          </h1></li>
                <li>Copyright@2023 devloped by pramod singh all right reserved</li>
                <li className='flex gap-3'>
                  <button className=' border border-slate-600 p-2 box-border rounded-full' ><Youtube  width={20} height={20} /></button>
                  <button className=' border border-slate-600 p-2 box-border rounded-full'><Github width={20} height={20} /></button>
                  <button className=' border border-slate-600 p-2 box-border rounded-full' > <Instagram width={20} height={20} /></button>
                 <button className=' border border-slate-600 p-2 box-border rounded-full'> <Linkedin width={20} height={20} /></button>
                </li>
              </ul>
            </div>
            <div>
              <ul className={' space-y-2'}>
                <li className=' font-semibold'>Quick Links</li>
                <li className=' text-sm text-textColor'><Link to={'/'}>Home</Link></li>
                <li className=' text-sm text-textColor'><Link to={'/about'}>About Us</Link></li>
                <li className=' text-sm text-textColor'><Link to={'/services'}>Services</Link></li>
                <li className=' text-sm text-textColor'><Link to={'/blog'}>Blog</Link></li>
              </ul>
            </div>
            <div>
              <ul className={' space-y-2'}>
                <li className=' font-semibold'>I want to:</li>
                <li className=' text-sm text-textColor'>Find a Doctor</li>
                <li className=' text-sm text-textColor'>Request an Appointment</li>
                <li className=' text-sm text-textColor'>Find a Location</li>
                <li className=' text-sm text-textColor'>Get a Option</li>
              </ul>
            </div>
            <div>
              <ul className={' space-y-2'}>
                <li className=' font-semibold'>Support</li>
                <li className=' text-sm text-textColor'>Donate</li>
                <li className=' text-sm text-textColor'>Contact Us</li>
              </ul>
            </div>

      </div>
    </footer>
  )
}

export default Footer