import { Form, Button, Row, Col } from "react-bootstrap";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const SearchForm = () => {
  const navigate = useNavigate();
  const [searchPhase, setSearchPhase] = useState('');
 

  const handleSubmit = e => {
    e.preventDefault()
    let adress = '/ads/search/' + searchPhase;
    navigate(adress);
  };
  
  return (
    <Form onSubmit={handleSubmit} className="d-flex justify-content-end">
      <Row className="">
        <Col>
          <Form.Group className="mb-3" controlId="formSearchPhase">
            <Form.Control
              value={searchPhase}
              onChange={e => setSearchPhase(e.target.value)}
              type='search' placeholder='Search ad'
            />
          </Form.Group>
        </Col>
        <Col>
          <Button variant="primary" type="submit">
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchForm;