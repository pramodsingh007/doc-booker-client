/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import { useToasts } from "react-toast-notifications";
import { authAction } from "../store/authSlice";
import { getCookie } from "../utils/getCookie";

function PrivateRoute({ children, allowedAccess }) {
  const role = useSelector((state) => state.auth.role);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  useEffect(() => {
    dispatch(authAction.setLoading(true))
    const getUser = async () => {
      const res = await fetch(`${BASE_URL}/api/v1/auth/verify`, {
        method: "GET",
        credentials: "include",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer '+getCookie('token'),
          
        },

      });
      const authInfo = await res.json();
      
      if (!res.ok || !allowedAccess.includes(authInfo.data.role)) {
        localStorage.clear()
        return navigate("/login");
      }
      dispatch(authAction.login(authInfo.data))
      
    };
    getUser();
  }, [dispatch,addToast,navigate,allowedAccess,role]);

  

  return <>{children}</>;
}

export default PrivateRoute;
