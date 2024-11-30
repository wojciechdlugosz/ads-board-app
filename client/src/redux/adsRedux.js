import { API_URL } from '../config';
import { setLoading } from './isLoadingRedux';

//selectors
export const getAds = ({ ads }) => ads;
export const getAdById = ({ ads }, adId) => ads.find(ad => ad._id === adId);


//actions
const createActionName = actionName => `app/ads/${actionName}`;
const LOAD_ADS = createActionName('LOAD_ADS');
const EDIT_AD = createActionName('EDIT_AD');
const ADD_AD  = createActionName('ADD_AD');
const REMOVE_AD = createActionName('REMOVE_AD');

export const loadAds = payload => ({type: LOAD_ADS, payload});
export const editAd = payload => ({type: EDIT_AD, payload});
export const addAd = payload => ({type: ADD_AD, payload});
export const removeAd = payload => ({type: REMOVE_AD, payload});

export const fetchAds = () => {
    return(dispatch) => {
      dispatch(setLoading(true));
      fetch(`${API_URL}/ads`)
        .then(res => res.json())
        .then(ads => {
          dispatch(setLoading(false));
          dispatch(loadAds(ads))});
    };
  };

  export const editAdRequest = ( ad ) => {
    return(dispatch) => {
      const fd = new FormData()
          fd.append('title', ad.title)
          fd.append('content', ad.content)
          fd.append('date', ad.date)
          fd.append('picture', ad.picture)
          fd.append('price', ad.price)
          fd.append('location', ad.location)
          fd.append('user', ad.user)
  
      const options = {
        method: 'PUT',
        credentials: 'include',
        body: fd
      };
      fetch(`${API_URL}/ads/${ad._id}`, options)
        //.then(() => {dispatch(updateAd(ad, ad.id))})
        .then(() => {dispatch(fetchAds())})
    };
  };

  export const addAdRequest = ad => {
    return(dispatch) => {
  
      const fd = new FormData()
          fd.append('title', ad.title)
          fd.append('content', ad.content)
          fd.append('date', ad.date)
          fd.append('picture', ad.picture)
          fd.append('price', ad.price)
          fd.append('location', ad.location)
          fd.append('user', ad.user)
  
      const options = {
        method: 'POST',
        credentials: 'include',
        body: fd
      };
      
      fetch(`${API_URL}/ads`, options)
        .then(() => {dispatch(fetchAds())})
        .catch((err) => console.log(err))
    };
  };
  
  export const removeAdRequest = id => {
      return dispatch => {
          const options = {
              method: 'DELETE',
        credentials: 'include',
          }
  
          fetch(`${API_URL}/ads/${id}`, options)
        .then(() => {dispatch(removeAd(id))})
      };
  };

  const adsReducer = (statePart = [], action) => {
    switch (action.type) {
      case LOAD_ADS:
        return [...action.payload];
      case EDIT_AD:
        return statePart.map(ad => (ad._id === action.payload.id ? { ...ad, ...action.payload } : ad));
      case ADD_AD:
        return [...statePart, { ...action.payload }];
      case REMOVE_AD:
        return statePart.filter(ad => ad._id !== action.payload);
      default:
        return statePart;
    };
  };
  
  export default adsReducer;
