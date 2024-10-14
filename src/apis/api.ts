import axios from 'axios';
import {GET_API} from './GET/getApis';

const axiosInstance = axios.create({
  baseURL: `http://localhost:3000/`
});

export {axiosInstance,GET_API} 