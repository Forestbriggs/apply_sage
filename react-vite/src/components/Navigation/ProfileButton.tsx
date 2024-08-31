import { useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { FaUserCircle } from 'react-icons/fa';
import { thunkLogout } from "../../redux/session";
import { NavLink, useNavigate } from "react-router-dom";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import handleFutureFeatureClick from '../../utils/handleFutureFeatureClick';
import { toast } from "react-toastify";

function ProfileButton() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const user = useAppSelector((store) => store.session.user);
    const ulRef: any = useRef();

    const toggleMenu = (e: MouseEvent) => {
        e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e: MouseEvent) => {
            if (ulRef.current instanceof HTMLElement && !ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const logout = async (e: MouseEvent) => {
        e.preventDefault();
        try {
            await dispatch(thunkLogout());
            navigate('/');
        } catch (e) {
            toast.error('There was an error logging out');
        }
        return closeMenu();
    };

    return (
        <>
            <FaUserCircle onClick={toggleMenu} className="text-4xl cursor-pointer" aria-label="Profile" />
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
