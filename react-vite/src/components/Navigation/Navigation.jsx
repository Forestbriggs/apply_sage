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
                <p id="logo" onClick={handleClick}>
                    {/* TODO change to logo */}
                    <img src="/favicon.ico" alt="apply_sage_logo" />
                </p>
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
