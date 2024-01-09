import axios from 'axios';

const Client = axios.create({
  baseURL: '/api',
});

export const Controller = new AbortController();

export default Client;