import styles from './Ad.module.scss'
import { getAdById } from "../../../redux/adsRedux";
import { Navigate, Link } from "react-router-dom";
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { getUser } from '../../../redux/usersRedux';
import { Button, Card, Container } from 'react-bootstrap';
import { IMGS_URL } from '../../../config';

const Ad = () => {
  const user = useSelector(getUser);

  const  {id}  = useParams();
  const ad = useSelector(state => getAdById(state, id));
  
  if (!ad) return <Navigate to="/" />;
  return (

    <Container className='min-vh-100 px-4'>
      <h1 className='m-3 d-flex justify-content-center text-primary'>Single ad</h1>
      <Card className={styles.card}>
        <Card.Img variant='top' src={IMGS_URL + ad.picture} className={styles.img} />
        <Card.Body>
          <Card.Title><h3>{ad.title}</h3></Card.Title>
          <Card.Text>
            <b>Price:</b> $ {ad.price}
          </Card.Text>

          <Card.Text>
            <b>Location:</b> {ad.location}
          </Card.Text>
          <Card.Text>
            <b>Published date / last edited:</b> {ad.date.substring(0, 10)}
          </Card.Text>

          <Card.Text>
            <b>Seller: </b>{ad.user.login}
            <img src={IMGS_URL + ad.user.avatar} className={styles.avatar} alt='user avatar'></img> 
          </Card.Text>

          <Card.Text>
            <b> Telephone no:</b> {ad.user.phone}
          </Card.Text>

          <Card.Text>
            <b>Content:</b>
          </Card.Text>

          <Card className='p-2'>
            {ad.content}
          </Card>
        
          {user && user.user.id === ad.user._id && (
            <div className='mt-3 mb-1 d-flex justify-content-around'>
              <Button className='w-25' variant="primary" as={Link} to={"/ad/editAd/" + ad._id}>Edit</Button>
              <Button className='w-25' variant="danger" as={Link} to={"/ad/deleteAd/" + ad._id}>Delete</Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Ad;