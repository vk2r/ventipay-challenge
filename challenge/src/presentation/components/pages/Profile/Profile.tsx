import { useEffect } from 'react';
import { Glow } from '@codaworks/react-glow';
import { useNavigate } from 'react-router-dom';

// Services
import { useUser } from '../../../../infrastructure/providers/User';

// Components
import ProfileForm from '../../organisms/ProfileForm';

const Profile = () => {
  // Hooks
  const navigate = useNavigate();
  const { data } = useUser();

  // On data change
  useEffect(() => {
    if (!data?.name) navigate('/');
  }, [data]);

  return (
    <div className="mt-8">
      <Glow color='#6366f1' className="min-w-96">
        <ProfileForm name={data?.name} email={data?.email}/>
      </Glow>
    </div>
  );
};

export default Profile;