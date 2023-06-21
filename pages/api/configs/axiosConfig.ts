import axios, { AxiosError } from 'axios';

export const api = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:3009/',
});

const errorHandler = (error: AxiosError) => {
  const statusCode = error.response?.status;

  if (statusCode && statusCode !== 401) {
    throw new Error('Something went wrong');
  }

  return Promise.reject(error);
};

api.interceptors.response.use(undefined, (error: AxiosError) => {
  return errorHandler(error);
});
