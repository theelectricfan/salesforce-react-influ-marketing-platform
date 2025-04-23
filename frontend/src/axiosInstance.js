import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // this works with Vite's proxy in development!
});

export {axiosInstance};
