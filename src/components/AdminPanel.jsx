import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader"
const AdminPanel = () =>{
    return(
        <>
        <AdminHeader/>
        <Outlet/>
        </>
    )
}
export default AdminPanel;