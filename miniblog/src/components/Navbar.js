//Import CSS
import styles from './Navbar.module.css';

//Import react router dom
import { NavLink } from 'react-router-dom';

//Import my hooks
import { useLogOut } from '../hooks/useLogOut';

//import context
import { useAuthValue } from '../context/AuthContext';


const Navbar = () => {
    const { user } = useAuthValue();
    const { logout } = useLogOut();

    return (
        /* Navbar testing if is active or not */
        <nav className={styles.navbar}>
            <ul className={styles.links_list}>

                <li>
                    <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : "")}>Home</NavLink>
                </li>

                {!user && (
                    <>
                        <li>
                            <NavLink to="/register" className={({ isActive }) => (isActive ? styles.active : "")}>Register</NavLink>
                        </li>
                        <li>
                            <NavLink to="/login" className={({ isActive }) => (isActive ? styles.active : "")}>Login</NavLink>
                        </li>
                    </>

                )}

                {user && (
                    <>
                         <li>
                            <NavLink to="/post/create" className={({ isActive }) => (isActive ? styles.active : "")}>Create Post</NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? styles.active : "")}>Dashboard</NavLink>
                        </li>
                        <li><button onClick={logout}>Logout</button></li>
                        <li><span>{user.displayName}</span></li>
                    </>
                )}
            </ul>
        </nav>
    )
}

export default Navbar