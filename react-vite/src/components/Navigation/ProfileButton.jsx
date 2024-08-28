import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from 'react-icons/fa';
import { thunkLogout } from "../../redux/session";
import { NavLink, useNavigate } from "react-router-dom";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import handleFutureFeatureClick from '../../utils/handleFutureFeatureClick';

function ProfileButton() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const user = useSelector((store) => store.session.user);
    const ulRef = useRef();

    const toggleMenu = (e) => {
        e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const logout = (e) => {
        e.preventDefault();
        dispatch(thunkLogout()).then(() => {
            navigate('/');
        })
        return closeMenu();
    };

    return (
        <>
            <FaUserCircle onClick={toggleMenu} className="text-4xl cursor-pointer" />
            {showMenu && (
                <ul className="profile-dropdown top-16 sm:top-24" ref={ulRef}>
                    {user ? (
                        <>
                            <li className="not_link">{user.username}</li>
                            <li className="not_link">{user.email}</li>
                            <NavLink
                                className='sm:hidden'
                                to={'/applications'}>Applications</NavLink>
                            <NavLink
                                className='sm:hidden'
                                to={'/companies'}>Companies</NavLink>
                            <NavLink onClick={handleFutureFeatureClick} to={'/settings'}>Settings</NavLink>
                            <li>
                                <button className="text-main-color bg-btn-main py-[.5px] px-2 hover:bg-btn-main-hover" onClick={logout}>Log Out</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <OpenModalMenuItem
                                itemText="Log In"
                                onItemClick={closeMenu}
                                modalComponent={<LoginFormModal />}
                            />
                            <OpenModalMenuItem
                                itemText="Sign Up"
                                onItemClick={closeMenu}
                                modalComponent={<SignupFormModal />}
                            />
                        </>
                    )}
                </ul>
            )}
        </>
    );
}

export default ProfileButton;
