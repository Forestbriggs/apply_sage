import { NavLink, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useSelector } from "react-redux";

function Navigation() {
    const navigate = useNavigate();
    const sessionUser = useSelector(state => state.session.user);

    const handleClick = () => {
        window.scroll(0, 0);
        navigate('/');
    }

    return (
        <div id="navbar" className="flex justify-between items-center my-0 mx-auto h-[96px]">
            <div className="flex items-center gap-[20px]">
                <img
                    onClick={handleClick}
                    className="cursor-pointer size-[70px] rounded-full"
                    src="/apply_sage_logo.png"
                    alt="apply_sage_logo"
                />
                <NavLink className='text-[24px]'>
                    ApplySage
                </NavLink>
            </div>
            <div className="flex items-center gap-[20px]">
                {sessionUser && <NavLink to={'/applications'}>Applications</NavLink>}
                {sessionUser && <NavLink to={'/companies'}>Companies</NavLink>}
                <ProfileButton />
            </div>
        </div>
    );
}

export default Navigation;
