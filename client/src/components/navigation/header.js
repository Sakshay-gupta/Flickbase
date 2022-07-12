import { Link } from "react-router-dom";
import SideDrawer from "./sideNavigation"
import { useDispatch, useSelector} from 'react-redux';
import { clearNotification } from "../../store/reducers/notification";
import { useEffect } from "react";
import { ShowToast } from "../../utils/tools"
import { signOut } from "../../store/actions/users"
import { useLocation } from "react-router-dom";
import { setLayout } from "../../store/reducers/site";

const Header = () => {
    const users = useSelector(state => state.users)
    const notification = useSelector(state => state.notifications)
    const dispatch = useDispatch();
    let location = useLocation()
    const site = useSelector(state => state.site)

    
    useEffect(() => {
        let pathname = location.pathname.split('/');
        if(pathname[1] === 'dashboard'){
            dispatch(setLayout('dash_layout'))
        } else{
            dispatch(setLayout(''))
        }
    }, [location.pathname, dispatch])
    useEffect(() => {
        let { global } = notification;
        if(notification && global.error){
            const msg = global.msg ? global.msg : 'error';
            ShowToast('ERROR', msg);
            dispatch(clearNotification())
        }
        else if(notification && global.success){
            const msg = global.msg ? global.msg : 'sucess';
            ShowToast('SUCCESS', msg);
            dispatch(clearNotification())
        }
    }, [notification])

    const signOutUser = () => {
        dispatch(signOut())
    }
    return(
        <>
            { !users.data.verified && users.auth ?
                <div className='not_verified'>Not Verified</div>
            :null}
            <nav className={`navbar fixed-top ${site.layout}`}>
                <Link to="/" className="navbar-brand d-flex align-items-center fredoka_ff">
                    Flickbase
                </Link>
                <SideDrawer users={users} signOutUser={signOutUser}/>
            </nav>
        </>
    )
}

export default Header;