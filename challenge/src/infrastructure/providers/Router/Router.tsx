import { Routes, Route } from 'react-router-dom';

// Layout
import Layout from '../../../presentation/other/Layout';

// Pages
import Home from '../../../presentation/components/pages/Home';
import Users from '../../../presentation/components/pages/Users';
import Login from '../../../presentation/components/pages/Login';
import Profile from '../../../presentation/components/pages/Profile';
import Register from '../../../presentation/components/pages/Register';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path="users" element={<Users/>}/>
        <Route path="register" element={<Register/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="profile" element={<Profile/>}/>
      </Route>
    </Routes>
  );
};

export default Router;