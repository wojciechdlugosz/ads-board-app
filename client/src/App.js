import './App.css';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout/MainLayout';
import Home from './components/pages/Home/Home';
import Ad from './components/pages/Ad/Ad';
import AddAd from './components/pages/AddAd/AddAd';
import EditAd from './components/pages/EditAd/EditAd';
import SearchPage from './components/pages/SearchPage/SearchPage';
import Register from './components/pages/Register/Register';
import Login from './components/pages/Login/Login';
import Logout from './components/pages/Logout/Logout';
import NotFound from './components/pages/NotFound/NotFound';

function App() {
  
  return (
    <MainLayout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/ads/:id' element={<Ad />} />
        <Route path='/ads/add' element={<AddAd />} />
        <Route path='/ads/edit/:id' element={<EditAd />} />
        <Route path='/ads/search/:searchPhrase' element={<SearchPage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
