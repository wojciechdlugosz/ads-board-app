import 'bootstrap/dist/css/bootstrap.css';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsLoading } from '../../../redux/isLoadingRedux';
import { getAds } from '../../../redux/adsRedux';
import Spinner from 'react-bootstrap/Spinner';
import SearchForm from '../../features/SearchForm/SearchForm';
import Ads from '../../features/Ads/Ads';

const Home = () => {
  const ads = useSelector(state => getAds(state));
  const isLoading = useSelector(state => getIsLoading(state));

  return (
    <Container>
        <Row>
            <SearchForm />
            <Col>
                <h1 className='m-3 d-flex justify-content-center text-primary'>All Notices</h1>
            </Col>
            <Col className='align-self-center m-4 d-flex justify-content-end'>
                <Button as={NavLink} to='/ads/add' variant='primary'> Create New Advert </Button>
            </Col>
        </Row>
        {ads.length === 0 && !isLoading && <p className='text-primary d-flex justify-content-center'>No notices</p>}
        {isLoading && <Spinner animation='border' variant='primary' />}
        {!isLoading && <Ads />}
    </Container>
  );
};

export default Home;