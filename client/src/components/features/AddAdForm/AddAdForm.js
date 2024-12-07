import { useNavigate, Navigate } from "react-router-dom";
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
    return today;
  }

 
  
  const handleSubmit = ad => {
    ad.date = getDate();
    ad.user = user.user.id;
    
    dispatch(addAdRequest(ad));
    navigate('/');
  };

  if (!user) return <Navigate to="/" />;

  return (
    <>
      <h1 className='m-3 d-flex justify-content-center text-primary'>Add ads</h1>
      <AdForm action={handleSubmit} actionText='Add ad' />
    </>  
  );
  
};

export default AddAdForm;