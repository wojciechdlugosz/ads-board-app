import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import styles from './NavBar.module.scss'
import { Nav, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchAds } from '../../../redux/adsRedux';
import { getUser } from '../../../redux/usersRedux';

const NavBar = () => {

	const user = useSelector(getUser);


    return (
        <Navbar className='me-auto d-flex justify-content-between align-items-center bg-primary'>
			<Nav.Link className={`${styles.logo} text-white`} as={NavLink} to='/'>
				<strong>NoticeBoard.app</strong>
			</Nav.Link>
			<Nav>
				{!user && (<Nav.Link as={NavLink} to='/register'>
				<Button variant='light' className='text-primary'>Register</Button>
				</Nav.Link>)}
				{!user && (<Nav.Link as={NavLink} to='/login'>
				<Button variant='light' className='text-primary'>Login</Button>
				</Nav.Link>)}
				{user && (<Nav.Link as={NavLink} to='/logout'>
				<Button variant='light' className='text-primary'>Logout</Button>
				</Nav.Link>)}
			</Nav>
		</Navbar>
    );
};

export default NavBar;