import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import { Container } from 'react-bootstrap';

const MainLayout = ({children}) => {
    return (
        <div>
            <NavBar />
            <Container>
                {children}
            </Container>
            <Footer />
        </div>
    );
};

export default MainLayout;