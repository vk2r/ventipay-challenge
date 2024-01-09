import { FormEvent } from 'react';
import { Glow } from '@codaworks/react-glow';

// Components
import Card from '../../atoms/Card';
import Link from '../../atoms/Link';
import Button from '../../atoms/Button';

// Definitions
export type Form = {
  email: string;
  password: string;
  remember?: string;
}

export type Props = {
  onSubmit?: (form: Form) => void;
};

const LoginForm = (props: Props) => {
  // Props
  const { onSubmit } = props;

  // Methods
  const methods = {
    onSubmit: (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const form = new FormData(event.target as HTMLFormElement);
      const remember = form.getAll('remember');
      if (remember?.length) form.append('remember', 'true');
      const data = Object.fromEntries(form.entries()) as unknown as Form;
      onSubmit?.(data);
    },
  };

  return (
    <Glow color='#6366f1' className="min-w-96">
      <Card className="glow:ring-1 glow:border-glow glow:ring-glow glow:bg-glow/[.15]">
        <form onSubmit={methods.onSubmit} encType="multipart/form-data" className="space-y-6">
          <h5 className="text-xl font-bold leading-none text-white text-center">Login</h5>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">
              Email
            </label>
            <input type="email" name="email" id="email"
              className="glow:text-black bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required/>
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">
              Password
            </label>
            <input type="password" name="password" id="password"
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required/>
          </div>
          <div className="flex items-start">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input id="remember" name="remember" type="checkbox"
                  className="w-4 h-4 border border-gray-300 bg-indigo-500 rounded focus:ring-3 focus:ring-indigo-500"
                />
              </div>
              <label htmlFor="remember" className="ms-2 text-sm font-medium text-white">
                Remember me
              </label>
            </div>
          </div>
          <Button type="submit" value="OK"
            className="w-full text-white bg-black glow:bg-indigo-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 glowable-text">
            Sign In
          </Button>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300 text-center">
            <Link href="/register" target="_self" className="text-indigo-700 glow:text-glow">
              Sign Up
            </Link>
          </div>
        </form>
      </Card>
    </Glow>
  );

};

export default LoginForm;