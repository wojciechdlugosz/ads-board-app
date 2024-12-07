import EditAdForm from '../../features/EditAdForm/EditAdForm';
import { Container } from 'react-bootstrap';

const EditAd = () => {
  return (
    <Container className='min-vh-100' >
      <h1 className='m-3 d-flex justify-content-center text-primary'>Edit ad</h1>
      <EditAdForm />
    </Container>
  );
};

export default EditAd;