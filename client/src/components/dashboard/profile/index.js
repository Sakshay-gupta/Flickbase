import { AdminTitle } from "../../../utils/tools";
import UserProfile from "./profile";
import AuthProfile from "./auth";


const AdminProfle = () => {
    return(
        <>
            <AdminTitle title="Profile" />
            <AuthProfile />
            <UserProfile />
        
        </>
    )
}

export default AdminProfle;