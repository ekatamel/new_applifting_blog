import axios, { HeadersDefaults } from 'axios';
import { LoginType } from '../types/LoginType';

interface Params {
  baseURL: string;
  headers: {
    'X-API-KEY': string;
    Authorization: string;
  };
}

const xapikey = process.env.REACT_APP_XAPIKEY ?? '';
const Authorization = process.env.REACT_APP_AUTHORIZATION ?? '';

export const axiosInstance = axios.create({
  baseURL: 'https://fullstack.exercise.applifting.cz',
  headers: {
    'X-API-KEY': xapikey,
    Authorization: Authorization
  }
});
