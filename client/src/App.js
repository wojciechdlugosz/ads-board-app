import { Routes, Route } from 'react-router-dom';
import { fetchAds } from './redux/adsRedux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

// Import pages
import Home from './components/pages/Home/Home';
import AddAd from './components/pages/AddAd/AddAd';
import EditAd from './components/pages/EditAd/EditAd';
import DeleteAd from './components/pages/DeleteAd/DeleteAd';
import Ad from './components/pages/Ad/Ad';
import SearchPage from './components/pages/SearchPage/SearchPage';
import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';
import Logout from './components/pages/Logout/Logout';
import NotFound from './components/pages/NotFound/NotFound';
import Mainlayout from './components/layout/MainLayout/MainLayout';

function App() {
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchAds()), [dispatch]);

  return (
    <div>
      <Mainlayout>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/ad/:id" element={<Ad/>} />
          <Route path="/ad/addAd" element={<AddAd/>} />
          <Route path="/ad/editAd/:id" element={<EditAd/>} />
          <Route path="/ad/deleteAd/:id" element={<DeleteAd/>} />
          <Route path="/ads/search/:searchPhrase" element={<SearchPage/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/logout" element={<Logout/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </Mainlayout>
    </div>
  );
}

export default App;
