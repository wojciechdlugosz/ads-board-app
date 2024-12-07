import styles from './AdCard.module.scss';
import { Link } from 'react-router-dom';
import { Card, Col, Button } from 'react-bootstrap';
import { IMGS_URL } from '../../../config';

const AdCard = ({ ad }) => {

  return (
    <Col xs='12' md='6' lg='4' className='mb-4'>
      <Card className='p-3'>
        <Card.Img variant='top' src={IMGS_URL + ad.picture} className={styles.img} />
			  <Card.Body>
          <Card.Title>{ad.title}</Card.Title>
          <Card.Text>{ad.location}</Card.Text>
          <Button variant="primary" as={Link} to={"/ad/" + ad._id}>Read more...</Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default AdCard;