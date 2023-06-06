import {Alert} from 'react-native';
import {Axios} from '../../context/AxiosContext';
import {
  addParcel,
  getParcelId,
  getParcelsUrl,
  updateParcelUrl,
} from '../../helpers/urls';
import {ActionType} from '../actionTypes';
import {AdTypes} from '../types/types';
import {consoleParse} from '../../helpers/consoleParse';

export const getParcels = async (params = {}) => {
  return Axios.get(getParcelsUrl, {
    params: {},
  })
    .then(res => {
      (res.data.data);
      if (res.data.code === 200 && !res.data.error) {
        return res.data.data;
      }
    })
    .catch(err => {
      consoleParse(err);
    });
};

export const getParcel = (id: number) => {
  return (dispatch: any) => {
    dispatch({type: ActionType.SET_LOADING, payload: {loading: true}});
    Axios.get(getParcelId(id))
      .then(res => {
        if (res.data.code === 200 && !res.data.error) {
          dispatch({
            type: ActionType.SET_PARCEL,
            payload: {parcel: res.data.data},
          });
        }
        dispatch({type: ActionType.SET_LOADING, payload: {loading: false}});
      })
      .catch(err => Alert.alert('Error', err));
  };
};

export const postParcel = (data: any, callback: any) => {
  Axios.post(addParcel, {...data})
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

export const updateParcel = (
  id: number | null,
  data: AdTypes,
  callback: any,
) => {
  Axios.patch(updateParcelUrl(id), {...data})
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
