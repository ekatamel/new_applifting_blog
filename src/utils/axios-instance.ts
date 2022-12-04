import axios from 'axios';

const xapikey = process.env.REACT_APP_XAPIKEY;
const Authorization = process.env.REACT_APP_AUTHORIZATION;

export const axiosInstance = axios.create({
  baseURL: 'https://fullstack.exercise.applifting.cz',
  headers: {
    'X-API-KEY': '2280ed69-0200-4cbd-8cb1-aa7bfa735644',
    Authorization: '72cb065e-68c3-44ee-820a-4716d27abb25'
  }
});
