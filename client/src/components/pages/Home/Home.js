import { useSelector } from 'react-redux';
import { Spinner, Row, Col, Button, Container } from 'react-bootstrap';
import { getIsLoading } from '../../../redux/isLoadingRedux';
import { getAllAds } from '../../../redux/adsRedux';
import { getUser } from '../../../redux/usersRedux';
import SearchForm from '../../features/SearchForm/SearchForm';
import AllAds from '../../features/AllAds/AllAds';
import { NavLink } from 'react-router-dom';

const Home = () => {
  const ads = useSelector(state => getAllAds(state));
  const isLoading = useSelector(state => getIsLoading(state));
  const user = useSelector(getUser);

  return (
    <Container className='min-vh-100'>
      <Row>
        <Col>
          {user ? (<NavLink className={({ isActive }) => isActive } as={NavLink} to="/ad/addAd"><Button variant='primary' className='my-3'>Add new ad</Button></NavLink>) : null }
        </Col>
        <Col className='my-3 d-flex justify-content-end'>
          <SearchForm />
        </Col>
      </Row>
      <h1 className='m-3 d-flex justify-content-center text-primary'>All ads</h1>
      {ads.length === 0 && !isLoading && <p className='d-flex justify-content-center text-primary'>No ads</p>}
      {isLoading && <Spinner animation='border' variant='primary' />}
      {!isLoading && <AllAds />}
    </Container>
  );
};

export default Home;