import { useNavigate, Navigate } from "react-router-dom";
import { Container } from 'react-bootstrap';
import { addAdRequest } from '../../../redux/adsRedux'
import AdForm from "../AdForm/AdForm";
import { getUser } from '../../../redux/usersRedux';
import { useSelector, useDispatch } from 'react-redux';

const AddAdForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getUser);

  function getDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const hour = today.getHours();
    const min = today.getMinutes();
    return `${hour}:${min} ${day}-${month}-${year}`;
  }

  const handleSubmit = ad => {
    ad.date = getDate()
    dispatch(addAdRequest(ad));
    navigate('/');
  };

  if (!user) return <Navigate to="/" />;

  return (
    <Container className='min-vh-100'>
      <h1 className='m-3 d-flex justify-content-center text-primary'>All ads</h1>
      <AdForm action={handleSubmit} actionText='Add new ad' />
    </Container>
  );
  
};

export default AddAdForm;