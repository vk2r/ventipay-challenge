import { Glow } from '@codaworks/react-glow';

// Components
import Card from '../../atoms/Card';
import Link from '../../atoms/Link';
import Button from '../../atoms/Button';

// Definitions
export type Props = {
  loggedIn?: boolean;
};

const RegisterForm = (props: Props) => {
  // Props
  const { loggedIn } = props;
  return (
    <Glow color='#6366f1' className="min-w-96">
      <Card className="glow:ring-1 glow:border-glow glow:ring-glow glow:bg-glow/[.15]">
        <form className="space-y-6" action="/api/user" method="post">
          <h5 className="text-xl font-bold leading-none text-white text-center">New Account</h5>
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-white">
              Full name
            </label>
            <input type="text" name="name" id="name"
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required/>
          </div>
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
          <div className="flex items-start"/>
          <Button type="submit" value="OK"
            className="w-full text-white bg-black glow:bg-indigo-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 glowable-text">
            Sign Up
          </Button>
          {!loggedIn && (
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300 text-center">
              <Link href="/login" target="_self" className="text-indigo-700 glow:text-glow">
                Sign In
              </Link>
            </div>
          )}
        </form>
      </Card>
    </Glow>
  );

};

export default RegisterForm;