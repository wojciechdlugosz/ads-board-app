import { Button, Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { IMGS_URL } from '../../../config'

const AdCard = ({ _id, title, location, price, picture}) => {
	return (
		<Card className={styles.card} key={_id}>
			<Card.Img variant='top' src={`${IMGS_URL}/${picture}`} className={styles.img} />
			<Card.Body>
				<Card.Title>{title}</Card.Title>
				<Card.Text>{location}</Card.Text>
				<Card.Text> {price} $</Card.Text>
				<Button variant='light' className='text-primary' as={NavLink} to={'/ads/' + _id}>
					Read more...
				</Button>
			</Card.Body>
		</Card>
	)
};

export default AdCard;