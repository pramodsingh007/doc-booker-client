import "./App.css";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./routes/Home";
import FindADoctor from "./routes/FindADoctor";
import { RouterProvider } from "react-router";
import DoctorDetails from "./routes/DoctorDetails";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Contact from "./routes/Contact";
import PrivateRoute from "../privateRoute/PrivateRoute";
import MyProfile from "./routes/MyProfile";
import Services from "./routes/Services";
import DoctorProfile from "./routes/DoctorProfile";
import AdminProfile from "./routes/AdminProfile";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "doctor",
        element: (
          <PrivateRoute allowedAccess={["patient","doctor","admin"]}>
            <FindADoctor />
          </PrivateRoute>
        ),
      },
      {
        path: "doctor/:docId",
        element: (
          <PrivateRoute allowedAccess={["patient","doctor","admin"]}>
            <DoctorDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "patient/profile/me",
        element: (
          <PrivateRoute allowedAccess={["patient"]}>
            <MyProfile/>
          </PrivateRoute>
        ),
      },
      {
        path: "doctor/profile/me",
        element: (
          <PrivateRoute allowedAccess={["doctor"]}>
            <DoctorProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "admin/profile/me",
        element: (
          <PrivateRoute allowedAccess={["admin"]}>
            <AdminProfile />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

function App() {
  return <>
  <RouterProvider router={router} />
  </>;
}

export default App;
