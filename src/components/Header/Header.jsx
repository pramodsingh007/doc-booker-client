import { Link, NavLink} from "react-router-dom";
import { Menu, User } from "lucide-react";
import { useEffect} from "react";
import { useSelector } from "react-redux";


const navLinks = [
  {
    path: "/",
    link: "Home",
  },
  {
    path: "/services",
    link: "Services",
  },
  {
    path: "/doctor",
    link: "Find a Doctor",
  },
  {
    path: "/contact",
    link: "Contact",
  },
];

function Header() {
  const user = useSelector(state=>state.auth.user)
  const role = useSelector(state=>state.auth.role)
  const toogleNavbar = () => {
    document.querySelector(".navigation").classList.toggle("hidden");
  };

  useEffect(()=>{
    window.addEventListener('scroll',()=>{
      if(window.scrollY>300){
        document.querySelector('header').classList.add('_sticky')
      }
      if(window.scrollY<300){
        document.querySelector('header').classList.remove('_sticky')
      }
    })

  },[])

  return (
    <header className="w-full z-[999] shadow-panelShadow flex bg-navBg bg-cover bg-center bg-no-repeat py-4  justify-center">
      <div className="w-[70rem]">
        <nav className=" flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl text-headingColor font-extrabold items-center">
            <span className=" text-primaryColor font-extrabold text-3xl">
              +
            </span>
            DocBooker
          </h1>
          <div
            onClick={toogleNavbar}
            className=" navigation z-[999]  md:relative fixed hidden  md:flex justify-center top-0 right-0 w-full  h-full md:bg-transparent bg-[#0000007a]"
          >
            <div className="  md:flex  md:flex-row absolute md:relative h-full w-3/5 top-0 opacity-100 right-0 bg-white md:p-0 p-8 flex flex-col md:space-x-8 space-x-0 justify-center md:space-y-0 space-y-12">
              {navLinks.map((item) => (
                <NavLink
                  className={" text-textColor font-[500]"}
                  key={item.link}
                  to={item.path}
                >
                  {item.link}
                </NavLink>
              ))}
            </div>
          </div>
          <div className=" flex items-center gap-3">
            {!user&&<Link to={'/login'}><button className=" rounded-full px-5 py-2 text-white bg-primaryColor">
              Login
            </button></Link>}
            {user&&<Link to={`/${role}/profile/me`}><button className=" rounded-full border gap-1 flex bg-slate-200 p-2 ">
           <User/> Hello
            </button>
          
            </Link>}
            <button className=" flex md:hidden" onClick={toogleNavbar}>
              <Menu width={30} height={30} />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
