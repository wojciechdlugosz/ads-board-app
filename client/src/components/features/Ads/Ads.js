import { useSelector } from 'react-redux';
import { getAds } from '../../../redux/adsRedux';
import AdCard from '../AdCard/AdCard';
import { Row } from 'react-bootstrap';

const Ads = () => {
    const ads = useSelector(getAds);

    return (
      <Row className='py-4'>
        {ads.map(ad => (
          <AdCard key={ad._id} ad={ad}  />
        ))}
      </Row>
    );
};

export default Ads;