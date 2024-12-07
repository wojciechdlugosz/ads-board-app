import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import styles from './NavBar.module.scss'
import { Nav, Navbar } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getUser } from '../../../redux/usersRedux';

const NavBar = () => {

	const user = useSelector(getUser);


    return (
        <Navbar className='me-auto d-flex justify-content-between align-items-center bg-primary'>
			<Nav.Link className={`${styles.logo} text-white`} as={NavLink} to='/'>
				<strong>AdsBoard.app</strong>
			</Nav.Link>
			<Nav>
				{!user ? (<NavLink className={({ isActive }) => isActive ? styles.linkActive : undefined} as={NavLink} to="/register"><Button variant='light' className='mx-3 text-primary'>Register</Button></NavLink>) : null }
				{!user ? (<NavLink className={({ isActive }) => isActive ? styles.linkActive : undefined} as={NavLink} to="/login"><Button variant='light' className='mx-3 text-primary'>Login</Button></NavLink>) : null }
				{user ? (<NavLink className={({ isActive }) => isActive ? styles.linkActive : undefined} as={NavLink} to="/logout"><Button variant='light' className='mx-3 text-primary'>Logout</Button></NavLink>) : null }
			</Nav>
		</Navbar>
    );
};

export default NavBar; 