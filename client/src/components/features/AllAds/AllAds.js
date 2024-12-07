import { useSelector } from 'react-redux';
import { getAllAds } from '../../../redux/adsRedux';
import AdCard from '../AdCard/AdCard';
import { Row } from 'react-bootstrap';

const AllAds = () => {
  const ads = useSelector(getAllAds);

    return (
      <Row className='py-4'>
        {ads.map(ad => (
          <AdCard key={ad._id} ad={ad}  />
        ))}
      </Row>
    );
};

export default AllAds;