/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/ban-ts-comment */
import { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';

// Services
import { User } from '../../services/Back';

// Definitions
type ProviderProps = {
  children?: ReactNode;
};

export type UserState = {
  methods: {
    getAll: () => Promise<void>;
    getInfo: () => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
  },
  error?: number;
  data: {
    name?: string;
    email?: string;
    token?: string;
  },
  users?: { name: string, email: string }[]
}

// Default values
const Defaults: UserState = {
  methods: {
    getAll: async () => {
    },
    getInfo: async () => {
    },
    // @ts-expect-error
    login: async (email: string, password: string) => {
    },
    logout: () => {
    },
  },
  error: undefined,
  data: {
    name: undefined,
    email: undefined,
    token: undefined,
  },
  users: undefined,
};

// Context
const UserContext = createContext<UserState>(Defaults);

// Provider
const UserProvider = (props: ProviderProps) => {
  // Props
  const { children } = props;

  // State
  const [error, setError] = useState<UserState['error']>(Defaults.error);
  const [data, setData] = useState<UserState['data']>(Defaults.data);
  const [users, setUsers] = useState<UserState['users']>(Defaults.users);

  // Methods
  const methods = {
    getAll: async () => {
      const response = await User.getAll();
      if (response?.data?.length) setUsers(response.data);
    },
    getInfo: async () => {
      const storage = localStorage.getItem('user_logged');
      if (storage) {
        try {
          const { email, token } = JSON.parse(storage);
          const response = await User.getInfo(email, token);
          if (response?.data) {
            const { error, info } = response.data;
            if (info) setData({ ...info });
            if (error) {
              localStorage.removeItem('user_logged');
              setError(error);
            }
          }
        } catch (error) {
          console.log(error);
          localStorage.removeItem('user_logged');
        }
      }
    },
    login: async (email: string, password: string) => {
      const response = await User.login(email, password);
      if (response?.data) {
        const { error, info } = response.data;
        if (error) setError(error);
        if (info) {
          localStorage.setItem('user_logged', JSON.stringify(info));
          setData({ ...info });
        }
      }
    },
    logout: () => {
      localStorage.removeItem('user_logged');
      setData(Defaults.data);
    }
  };

  // Memoized value
  const value = useMemo(() => ({ data, users, error, methods }), [data, users, error, methods]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

// Hook
const useUser = () => {
  // Hook
  const { data, users, methods } = useContext(UserContext);

  // On load
  useEffect(() => {
    methods.getAll();
    methods.getInfo();
  }, []);

  return { data, users, methods };
};

export { useUser };
export default UserProvider;