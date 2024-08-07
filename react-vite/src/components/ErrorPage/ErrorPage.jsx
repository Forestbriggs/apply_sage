import { NavLink } from 'react-router-dom';
import './ErrorPage.css';

export default function ErrorPage() {
    return (
        <div id='error_page'>
            <h1>Whoops... looks like what you&apos;re searching for couldn&apos;t be found</h1>
            <h2>Return home</h2>
            <NavLink to={'/'}>Home</NavLink>
        </div>
    )
}