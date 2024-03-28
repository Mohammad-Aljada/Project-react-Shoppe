import { Outlet } from "react-router-dom";
import Sidebar from "../../../Components/Sidbar/Sidebar";
import style from "./profile.module.css";

export default function Profile() {
 
  return (
    <div className={`d-flex gap-4 ${style.profile}`} >
        <Sidebar/>
        <Outlet />
    </div>
  );
}
