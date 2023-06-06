import {Alert} from 'react-native';
import {Axios} from '../../context/AxiosContext';
import {setAccessTokenAS, setRefreshTokenAS} from '../../helpers/dataStorage';
import {
  updateUser,
  userLogin,
  userVerify,
  userAds,
  userFavoritesUrl,
  userFavoriteAddUrl,
  userFavoriteDeleteUrl,
  getUserUrl,
  deleteUser,
  deleteUserCodeVerify,
} from '../../helpers/urls';
import {ActionType} from '../actionTypes';
//getdi
export const userLoginAction = (phone: string, callback: any) => {
  Axios.post(userLogin, {phone})
    .then(res => {
      if (res.data.data.status === 'SMS_SENT') {
        return callback({bool: true, msg: res.data.uz});
      } else {
        return callback({bool: false, msg: res.data.uz});
      }
    })
    .catch(err => Alert.alert('Error', err));
};
//getdi
export const userVerifyCodeAction = (
  data: {phone: string; otp: string},
  callback: any,
) => {
  Axios.post(userVerify, {...data})
    .then(res => {
      if (res.data.data && !res.data.error) {
        return callback({bool: true, msg: res.data.data});
      }
      if (!res.data.data && res.data.error) {
        callback({bool: false, msg: res.data.error.status});
      }
    })
    .catch(err => {
      if (err) {
        callback({bool: false, msg: err.response.data.error.status});
      }
    });
};

export const userUpdateAction = (
  id: number | null,
  data: {
    phone: string | undefined;
    name: string | undefined;
    avatar: string | undefined;
  },
  callback: any,
) => {
  Axios.patch(updateUser(id), {...data})
    .then(res => {
      if (res.data.data) {
        return callback({bool: true, data: res.data.data});
      } else if (res.data.error !== null) {
        return callback({bool: false, data: res.data.error.message});
      }
    })
    .catch(err => {
      if (err) {
        callback({bool: false, msg: err.response.data.error.message.status});
      }
    });
};

export const getUserAds = (id: number | null) => {
  return (dispatch: any) => {
    dispatch({type: ActionType.SET_LOADING, payload: {loading: true}});

    Axios.get(userAds(id))
      .then(res => {
        if (res.data.data && res.data.error === null) {
          dispatch({
            type: ActionType.SET_USER_ADS,
            payload: {ads: res.data.data.ads},
          });
          dispatch({type: ActionType.SET_LOADING, payload: {loading: false}});
        } else {
          (res);
        }
      })
      .catch(err => {
        (err);
        dispatch({type: ActionType.SET_LOADING, payload: {loading: false}});
      });
  };
};
//getdi
export const getUser = (id: number | null) => {
  return (dispatch: any) => {
    Axios.get(getUserUrl(id))
      .then(res => {
        (res.data, 'resass');
        if (res.data.data && res.data.error === null) {
          dispatch({
            type: ActionType.SET_USER,
            payload: {user: res.data.data},
          });
        } else {
          (res);
        }
      })
      .catch(err => {
        (err);
      });
  };
};

export const getUserFavorites = (id: number | null) => {
  return (dispatch: any) => {
    dispatch({type: ActionType.SET_LOADING, payload: {loading: true}});

    Axios.get(userFavoritesUrl(id))
      .then(res => {
        if (res.data.data && res.data.error === null) {
          dispatch({
            type: ActionType.SET_USER_FAVORITES,
            payload: {
              favourites: res.data.data,
            },
          });
          dispatch({type: ActionType.SET_LOADING, payload: {loading: false}});
        } else {
          (res);
        }
      })
      .catch(err => {
        (err);
        dispatch({type: ActionType.SET_LOADING, payload: {loading: false}});
      });
  };
};

export const userFavoriteAdd = (
  userId: number | null,
  adId: number,
  callback: any,
) => {
  Axios.post(userFavoriteAddUrl(userId, adId))
    .then(res => {
      if (res.data.data && res.data.error === null) {
        return callback({bool: true});
      } else {
        (res);
      }
    })
    .catch(err => {
      return callback({
        bool: false,
        msg: err.response.data.error.message.status,
      });
    });
};

export const userFavoriteDelete = (
  userId: number | null,
  adId: number,
  callback: any,
) => {
  Axios.delete(userFavoriteDeleteUrl(userId, adId))
    .then(res => {
      (res);
      if (res.data.data && res.data.error === null) {
        return callback({bool: true});
      } else {
        (res);
      }
    })
    .catch(err => {
      (err);
      return callback({
        bool: false,
        msg: err.response.data.error.message.status,
      });
    });
};

export const setUserTokensAction = (
  accessToken: string,
  refreshToken: string,
) => {
  return (dispatch: any) => {
    setAccessTokenAS(accessToken);
    setRefreshTokenAS(refreshToken);
    dispatch({
      type: ActionType.SET_TOKENS,
      payload: {
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    });
  };
};

export const deleteAccount = async (phone: string) => {
  return Axios.delete(deleteUser(), {
    data: {
      phone,
    },
  })
    .then(res => {
      (res.data);
      return {
        error: res.data.error === null ? false : true,
        message: res.data.error,
        data: res.data.data,
        success: res.data.data === null ? false : true,
      };
    })
    .catch(err => {
      return {
        error: err,
        success: false,
      };
    });
};

export const deleteAccountCodeVerify = async (
  phone?: string,
  code?: string,
) => {
  return Axios.post(deleteUserCodeVerify(), {
    phone: phone,
    otp: code,
  })
    .then(res => {
      (res.data, 'asdsad');
      if (res.data.code === 201 && res.data.error === null) {
        return true;
      } else {
        return false;
      }
    })
    .catch(() => {
      return false;
    });
};
