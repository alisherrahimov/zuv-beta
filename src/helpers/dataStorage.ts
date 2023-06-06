import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

export const setToken = (val: string) => {
  storage.set('token', val);
};

export const setRefToken = (val: string) => {
  storage.set('reftoken', val);
};

export const getToken = () => {
  return storage.getString('token') ?? null;
};

export const getRefToken = () => {
  return storage.getString('reftoken') ?? null;
};

export const setStorage = (key: string, value: string) => {
  storage.set(key, value);
};

export const getStorage = (key: string) => {
  return storage.getString(key) ?? null;
};
