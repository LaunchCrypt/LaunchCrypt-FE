import { DELETE_API } from './DELETE/deleteApis';
import axios from 'axios';
import { GET_API } from './GET/getApis';
import { POST_API } from './POST/postApis';
import { PATCH_API } from './PATCH/patchApis';

const axiosInstance = axios.create({
  baseURL: `http://localhost:3000/`
});

export { axiosInstance, GET_API, POST_API, PATCH_API, DELETE_API } 