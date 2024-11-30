import { Form, Button } from "react-bootstrap";
import { useState } from 'react';
import { useForm } from "react-hook-form";

const AdForm = ({ action, actionText, ...props }) => {

  const [title, setTitle] = useState(props.title || '');
  const [content, setContent] = useState(props.content || '');
  const [picture, setPicture] = useState(props.picture || '');
  const [price, setPrice] = useState(props.price || '');
  const [location, setLocation] = useState(props.location || '');
  const [seller] = useState(props.seller);

  const { register, handleSubmit: validate, formState: { errors } } = useForm();
  
  const handleSubmit = () => {
    
    if(content ) {
      action({ title, content, picture, price, location, seller });
    }
  };
  
  return (
    <Form onSubmit={validate(handleSubmit)} className='col-12 col-sm-3 mx-auto'>

      <h2 className='my-4' >{props.pageTitle}</h2>

      <Form.Group  controlId="formtitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          {...register("title", { required: true, minLength: 10, maxLength: 50 })}
          value={title}
          onChange={e => setTitle(e.target.value)}
          type='text' placeholder='Enter title'
        />
        {errors.title && <small className="d-block form-text text-danger mt-2">Title length is incorrect (min is 10, max is 50)</small>}
      </Form.Group>

      <Form.Group  controlId="formContent">
        <Form.Label>Content</Form.Label>
        <Form.Control 
          {...register("content", { required: true, minLength: 20, maxLength: 1000 })}
          as="textarea" placeholder="Enter content" rows={3} 
          value={content} 
          onChange={e => setContent(e.target.value)} />
          {errors.content && <small className="d-block form-text text-danger mt-2">Content length is incorrect (min is 20, max is 1000)</small>}
      </Form.Group>

      <Form.Group  controlId="formpicture">
        <Form.Label>Picture</Form.Label>
        <Form.Control
          {...register("picture", { required: true })}
          value={picture}
          onChange={e => setPicture(e.target.value)}
          type='text' placeholder='Chose picture'
        />
        {errors.picture && <small className="d-block form-text text-danger mt-2">Picture can't be empty</small>}
      </Form.Group>

      <Form.Group  controlId="formprice">
        <Form.Label>Price</Form.Label>
        <Form.Control
          {...register("price", { required: true })}
          value={price}
          onChange={e => setPrice(e.target.value)}
          type='text' placeholder='Enter price'
        />
        {errors.price && <small className="d-block form-text text-danger mt-2">Price can't be empty</small>}
      </Form.Group>

      <Form.Group  controlId="formlocation">
        <Form.Label>Location</Form.Label>
        <Form.Control
          {...register("location", { required: true })}
          value={location}
          onChange={e => setLocation(e.target.value)}
          type='text' placeholder='Enter location'
        />
        {errors.location && <small className="d-block form-text text-danger mt-2">Location can't be empty</small>}
      </Form.Group>

      <Button className='my-3' variant="primary" type="submit">
      {actionText}
      </Button>
    </Form>
  );
};

export default AdForm;