import { NavLink } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
    return (
        <div id='footer'>
            <div>
                <p>© 2024 ApplySage</p>
            </div>
            <div id='footer_links'>
                <NavLink>LinkedIn</NavLink>
                <NavLink>GitHub</NavLink>
            </div>
        </div>
    )
}