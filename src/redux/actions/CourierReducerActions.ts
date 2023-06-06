import {Alert} from 'react-native';
import {Axios} from '../../context/AxiosContext';
import {
  getCouriersUrl,
  getCourierId,
  addCourier,
  updateCourierUrl,
  callCountUrl,
} from '../../helpers/urls';
import {ActionType} from '../actionTypes';
import {AdTypes} from '../types/types';

export const getCouriers = async (params = {}, type?: string) => {
  return Axios.get(`${getCouriersUrl}`, {
    params: {
      ...params,
      status: 'active',
      limit: 10,
    },
  })
    .then(res => {
      if (res.data.code === 200 && !res.data.error) {
        return res.data.data;
      }
    })
    .catch(err => Alert.alert('Error', err));
};

export const getCourier = (id: number) => {
  return (dispatch: any) => {
    dispatch({type: ActionType.SET_LOADING, payload: {loading: true}});
    Axios.get(getCourierId(id))
      .then(res => {
        if (res.data.code === 200 && !res.data.error) {
          dispatch({
            type: ActionType.SET_COURIER,
            payload: {courier: res.data.data},
          });
        }
        dispatch({type: ActionType.SET_LOADING, payload: {loading: false}});
      })
      .catch(err => Alert.alert('Error', err));
  };
};

export const postCourier = (data: any, callback: any) => {
  Axios.post(addCourier, {...data})
    .then(res => {
      if (res.data.data && res.data.error === null) {
        return callback({bool: true});
      } else {
        return callback({boole: false, msg: res.data.error.message});
      }
    })
    .catch(err => {
      return callback({boole: false, msg: err.data.data.error.message});
    });
};

export const updateCourier = (
  id: number | null,
  data: AdTypes,
  callback: any,
) => {
  Axios.patch(updateCourierUrl(id), {...data})
    .then(res => {
      if (res.data.data && res.data.error === null) {
        return callback({bool: true});
      } else {
        return callback({boole: false, msg: res.data.error.message});
      }
    })
    .catch(err => {
      callback({boole: false, msg: err.data.error.message});
    });
};

export const callCount = async (id: number) => {
  const {data} = await Axios.post(callCountUrl(id));
  return data;
};
