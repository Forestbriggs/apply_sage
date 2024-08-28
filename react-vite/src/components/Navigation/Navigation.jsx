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
        <div id="navbar"
            className="
            flex justify-between items-center my-0 mx-auto py-2 h-16
            sm:h-[96px]
            ease-out
            "
        >
            <div
                className="
                flex items-center gap-[20px]
                "
            >
                <img
                    onClick={handleClick}
                    className="
                    cursor-pointer rounded-full size-12
                    sm:size-[70px] 
                    transition-all
                    "
                    src="/apply_sage_logo.png"
                    alt="apply_sage_logo"
                />
                <NavLink
                    className='
                    text-lg
                    sm:text-2xl
                    transition-all
                    '
                >
                    ApplySage
                </NavLink>
            </div>
            <div
                className="
                flex items-center gap-5
                "
            >
                {sessionUser && <NavLink
                    className='hidden sm:inline'
                    to={'/applications'}>Applications</NavLink>}
                {sessionUser && <NavLink
                    className='hidden sm:inline'
                    to={'/companies'}>Companies</NavLink>}
                <ProfileButton />
            </div>
        </div>
    );
}

export default Navigation;
