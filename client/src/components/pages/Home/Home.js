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
    <Container className='min-vh-100'>
        <Row>
            <Col className='align-self-center m-3 d-flex justify-content-start'>
                <Button as={NavLink} to='/ad/add' variant='primary'> Add new ad </Button>
            </Col>
            <Col className='m-3 d-flex justify-content-end'>
                <SearchForm />
            </Col>
            
        </Row>
        <h1 className='m-3 d-flex justify-content-center text-primary'>All ads</h1>
        {ads.length === 0 && !isLoading && <p className='text-primary d-flex justify-content-center '>No ads</p>}
        {isLoading && <Spinner animation='border' variant='primary' />}
        {!isLoading && <Ads />}
    </Container>
  );
};

export default Home;