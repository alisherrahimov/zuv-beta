import React, {createContext} from 'react';
import axios from 'axios';
import {domain, mediaDomain, userRefreshToken} from '../helpers/urls';

import {
  getRefToken,
  getToken,
  setRefToken,
  setToken,
} from '../helpers/dataStorage';

import {handleEncrypted} from '../helpers/helpers';

export const AxiosContext = createContext({});
const {Provider} = AxiosContext;

export const Axios = axios.create({
  baseURL: domain,
});

export const MediaAxios = axios.create({
  baseURL: mediaDomain,
});

const AxiosProvider = ({children}: any) => {
  let token = getToken();
  let refToken = getRefToken();

  Axios.interceptors.request.use(
    config => {
      if (token !== '' && token !== null) {
        if (config?.headers) {
          config.headers.Authorization = `Bearer ${token}`;
          config.headers['x-client-key'] = `${token}`;
        }
      }

      return config;
    },
    error => {
      Promise.reject(error);
    },
  );

  Axios.interceptors.response.use(
    response => {
      const originalRequest = response.config;
      let data = response?.data?.error;
      console.log(data);

      if (
        data?.message?.code === 401 &&
        data?.message?.status === 'JWT_EXPIRED'
      ) {
        console.log(refToken, 'ref');
        // console.log('response');
        return Axios.post(userRefreshToken, {
          refresh_token: refToken,
        })
          .then(res => {
            console.log(res.data, 'response');
            if (res.data.data && res.data.error === null) {
              let _accessToken = res.data.data.access_token;
              let _refreshToken = res.data.data.refresh_token;
              setToken(_accessToken);
              setRefToken(_refreshToken);
              return Axios(originalRequest);
            }
          })
          .catch(err => {
            console.log(err);
            console.log(JSON.stringify(err, null, 2), 'post error');
          });
      }
      return response;
    },
    async function (error) {
      console.log(error, 'erorrrrr');
      return Promise.reject(error);
    },
  );

  MediaAxios.interceptors.request.use(
    config => {
      if (config?.headers) {
        config.headers['x-client-key'] = handleEncrypted();
      }
      return config;
    },
    error => {
      Promise.reject(error);
    },
  );

  return (
    <Provider
      value={{
        Axios,
      }}>
      {children}
    </Provider>
  );
};

export default AxiosProvider;
