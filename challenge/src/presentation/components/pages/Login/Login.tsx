import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Services
import { useUser } from '../../../../infrastructure/providers/User';

// Components
import LoginForm, { Form } from '../../organisms/LoginForm';

const Login = () => {
  // Hooks
  const navigate = useNavigate();
  const { data, methods: { login } } = useUser();

  // Methods
  const methods = {
    redirect: () => navigate('/'),
    onSubmit: async (form: Form) => {
      const { email, password } = form;
      await login(email, password);
    }
  };

  // On data change
  useEffect(() => {
    if (data?.name) methods.redirect();
  }, [data]);

  return (
    <div className="mt-8">
      <LoginForm onSubmit={methods.onSubmit}/>
    </div>
  );
};

export default Login;