import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import styles from './NavBar.module.scss'
import { Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <Navbar className='me-auto d-flex justify-content-between align-items-center bg-primary'>
			<Nav.Link className='text-white' as={NavLink} to='/'>
				NoticeBoard.app
			</Nav.Link>
			<Nav>
				<Nav.Link as={NavLink} to='/'>
				<Button variant='light' className='text-primary'>Register</Button>
				</Nav.Link>
				<Nav.Link as={NavLink} to='/'>
				<Button variant='light' className='text-primary'>Login</Button>
				</Nav.Link>
			</Nav>
		</Navbar>
    );
};

export default NavBar;