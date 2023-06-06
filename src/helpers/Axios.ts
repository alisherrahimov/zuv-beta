import axios from 'axios';
import {domain} from './urls';

const Axios = axios.create({
  baseURL: domain,
});

export default Axios;
