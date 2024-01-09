import Client, { Controller } from '../client';

// Axios controller
const { signal, abort } = Controller;

// Definitions
export interface UserDef {
  name: string;
  email: string;
}

export interface UserLogin {
  error?: number;
  info?: {
    name: string;
    email: string;
    token: string;
  },
}

const User = {
  cancel: () => abort?.(),
  getAll: () => Client.get<UserDef[]>('/user/list', { signal }),
  getInfo: async (email: string, token: string) => {
    const authorization = `Bearer ${token}`;
    const headers = { headers: { authorization }, signal };
    return await Client.post<UserLogin>(`/user/${email}`, {}, headers);
  },
  login: async (email: string, password: string) => {
    const data = { email, password };
    return await Client.post<UserLogin>('/login', data, { signal });
  }
};

export default User;