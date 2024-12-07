import { Alert, Button, Row, Col, Container } from "react-bootstrap";
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useParams } from 'react-router';
import { removeAdRequest, getAdById } from "../../../redux/adsRedux";
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../../redux/usersRedux';

const DeleteAd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const  {id}  = useParams();

  const ad = useSelector(state => getAdById(state, id));
  const user = useSelector(getUser);
  
  const handleAction = e => {
    e.preventDefault();
    dispatch(removeAdRequest(id));
    navigate('/');
  };

  if (!ad) return <Navigate to="/" />;
  if (user.user.id !== ad.user._id) return <Navigate to="/" />;

  return (
    <Container className='col-12 col-sm-3 mx-auto min-vh-100'>
      <h1 className='m-3 d-flex justify-content-center text-primary'>Delete ad</h1>
      <Alert variant='danger'>
          <Alert.Heading>Are you sure?</Alert.Heading>
          <p>Do you want to permanently delete this ad?</p>
      </Alert>
      <Row className="d-flex justify-content-center">
        <Col>
          <Button className="w-100 p-3" variant="primary" as={Link} to={"/ad/" + id}>NO</Button>
        </Col>
        <Col>
          <Button className="w-100 p-3" variant="danger" onClick={handleAction}>YES</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default DeleteAd;