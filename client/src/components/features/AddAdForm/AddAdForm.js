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
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const hour = today.getHours();
    const min = today.getMinutes();
    return `${hour}:${min} ${day}-${month}-${year}`;
  }

  const title = 'Add ad'
  
  const handleSubmit = ad => {
    ad.date = getDate()
    dispatch(addAdRequest(ad));
    navigate('/');
  };

  if (!user) return <Navigate to="/" />;

  return (
    <AdForm action={handleSubmit} pageTitle={title} actionText='Add ad' />
  );
  
};

export default AddAdForm;