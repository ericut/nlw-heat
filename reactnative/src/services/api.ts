import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://192.168.100.6:4000',
});
