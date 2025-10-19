import ChangeProfilePicture from "./Settings/ChangeProfile";
import DeleteAccount from "./Settings/DeleteAccount";
import EditProfile from "./Settings/EditProfile";
import UpdatePassword from "./Settings/updatePassword";


const Setting=()=>{


    return (
        <div className="w-11/12 text-white">
            {/* profile pic  */}
            <ChangeProfilePicture></ChangeProfilePicture>
            <EditProfile></EditProfile>
            <UpdatePassword></UpdatePassword>
            <DeleteAccount></DeleteAccount>
        </div>
    );
}
export default Setting;