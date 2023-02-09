//Import CSS
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
    return (
        /* Navbar testing if is active or not */
        <nav className={styles.navbar}>
            <ul className={styles.links_list}>
                <li>
                    <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : "")}>Home</NavLink>
                </li>
                <li>
                    <NavLink to="/register" className={({ isActive }) => (isActive ? styles.active : "")}>Register</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar