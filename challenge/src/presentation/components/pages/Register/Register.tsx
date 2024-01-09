// Services
import { useUser } from '../../../../infrastructure/providers/User';

// Components
import RegisterForm from '../../organisms/RegisterForm';

const Register = () => {
  // Hooks
  const { data } = useUser();
  return (
    <div className="mt-8">
      <RegisterForm loggedIn={!!data?.email}/>
    </div>
  );
};

export default Register;