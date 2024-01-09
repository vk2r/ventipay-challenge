import { Outlet } from 'react-router-dom';
import { GlowCapture } from '@codaworks/react-glow';

// Services
import { useUser } from '../../../infrastructure/providers/User';

// Components
import Navbar from '../../components/organisms/Navbar';

const Layout = () => {
  // Hooks
  const { data, methods: { logout } } = useUser();
  return (
    <GlowCapture>
      <Navbar name={data?.name} loggedIn={!!data?.name} onLogout={logout}/>
      <div className="flex items-center justify-center">
        <Outlet/>
      </div>
    </GlowCapture>
  );
};

export default Layout;