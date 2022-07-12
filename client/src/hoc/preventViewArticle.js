import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const PreventViewArticle = (props) => {
    const users = useSelector(state => state.users);
    let location = useLocation();
    const Navigate = useNavigate();
    if(users.role === "user"){
        return Navigate('profile')
    }
    else{
        return props.children
    }
} 

export default PreventViewArticle;