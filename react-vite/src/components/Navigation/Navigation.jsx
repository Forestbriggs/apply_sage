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
        <div id="navbar">
            <div id="logo_brand__container">
                <img
                    onClick={handleClick}
                    id="logo"
                    src="/apply_sage_logo.png"
                    alt="apply_sage_logo"
                />
                <NavLink id="brand">
                    ApplySage
                </NavLink>
            </div>
            <div id='login_signup'>
                {sessionUser && <NavLink to={'/applications'}>Applications</NavLink>}
                {sessionUser && <NavLink to={'/companies'}>Companies</NavLink>}
                <ProfileButton />
            </div>
        </div>
    );
}

export default Navigation;
