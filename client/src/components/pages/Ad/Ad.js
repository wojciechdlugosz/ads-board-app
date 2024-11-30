import styles from './Ad.module.scss'
import { getAdById } from "../../../redux/adsRedux";
import { Navigate, Link } from "react-router-dom";
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { getUser } from '../../../redux/usersRedux';
import { Button, Row, Col } from 'react-bootstrap';
import { IMGS_URL } from '../../../config';

const Ad = () => {
  const user = useSelector(getUser);

  const  {id}  = useParams();
  const ad = useSelector(state => getAdById(state, id));

  if (!ad) return <Navigate to="/" />;
  return (
    <div className='min-vh-100 px-4'>
      <h2 className='my-4' >Ad page</h2>
      <Row>
        <Col xs='12' md='6' lg='6' className='p-3 border rounded'>
          <div className={styles.imageBox}>
            <img 
              className={styles.image}
              alt={ad.title}
              src={ IMGS_URL + ad.picture } />
          </div>
        </Col>
        <Col xs='12' md='6' lg='6' className='p-3'>
          <h3>{ad.title}</h3>
          <p>{ad.date}</p>
          <p>{ad.price}</p>
          <p>{ad.location}</p>
          <p>{ad.seller}</p>
          <p>{ad.content}</p>
          {user === ad.seller && (
          <Row className="d-flex justify-content-center">
            <Col>
              <Button className="w-100 p-3" variant="primary" as={Link} to={"/ad/editAd/" + ad._id}>Edit</Button>
            </Col>
            <Col>
              <Button className="w-100 p-3" variant="danger" as={Link} to={"/ad/deleteAd/" + ad._id}>Delete</Button>
            </Col>
          </Row>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Ad;