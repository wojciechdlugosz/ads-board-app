import { Container } from 'react-bootstrap';

const NotFound = () => {
    return (
      <Container className='min-vh-100'>
        <h1 className='m-3 d-flex justify-content-center text-primary'><strong>URL not found</strong></h1>
      </Container>
    );
};

export default NotFound;