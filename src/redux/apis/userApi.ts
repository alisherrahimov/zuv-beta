import {
  getUserUrl,
  regions,
  updateUser,
  userAds,
  userFavoritesUrl,
  userFavoriteDeleteUrl,
  callCountUrl,
  domain,
  userRefreshToken,
} from './../../helpers/urls';
import {createAsyncThunk} from '@reduxjs/toolkit';

import {userLogin, userVerify} from '../../helpers/urls';

import axios from 'axios';
import {storage} from '../../helpers/dataStorage';

export const LoginAction = createAsyncThunk(
  'login',
  async (phone: string): Promise<any> => {
    try {
      const {data} = await axios.post(domain + userLogin, {phone});

      if (data.success && data.error == null) {
        return {
          payload: true,
        };
      } else {
        return {
          payload: false,
          error: data.error,
        };
      }
    } catch (error) {
      console.log(error, 'erorroror');
    }
  },
);

export const VerifyCodeAction = createAsyncThunk(
  'verify',
  async ({phone, otp}: {phone: string; otp: string}): Promise<any> => {
    try {
      const {data} = await axios.post(domain + userVerify, {phone, otp});
      console.log(JSON.stringify(data), 'verify action data');
      if (data.success && data.error === null) {
        return {
          user: data.data,
          code: 1,
        };
      } else {
        return {
          code: 2,
        };
      }
    } catch (error) {}
  },
);

export const getUserAction = createAsyncThunk(
  'getUser',
  async (_, {dispatch}): Promise<any> => {
    let tt = storage.getString('token');
    try {
      const {data} = await axios.get(domain + getUserUrl, {
        headers: {Authorization: `Bearer ${tt}`, 'x-client-key': tt ?? ''},
      });

      if (data.success) {
        return {
          user: data.data,
          code: 1,
        };
      } else {
        dispatch(onRefreshTokenAction());
      }
    } catch (error) {
      console.log(JSON.stringify(error), 'error');
    }
  },
);

export const getUserFavourite = createAsyncThunk(
  'favourite',
  async (): Promise<any> => {
    let couriers: any[] = [];
    let percels: any[] = [];
    let tt = storage.getString('token');
    try {
      const {data} = await axios.get(domain + userFavoritesUrl(), {
        headers: {Authorization: `Bearer ${tt}`, 'x-client-key': tt ?? ''},
      });

      if (data.success === true) {
        data.data.forEach((item: any) => {
          if (item.type === 'parcel') {
            percels.push(item);
          }
          if (item.type === 'courier') {
            couriers.push(item);
          }
        });

        return {
          couriers: couriers,
          percels: percels,
        };
      } else {
        return [];
      }
    } catch (error) {}
  },
);

export const updateUserAction = createAsyncThunk('updateUser', async state => {
  const {name, avatar, phone} = state;
  console.log(state, 'State');
  let tt = storage.getString('token');
  try {
    const {data} = await axios.patch(
      domain + updateUser(),
      {name: name, avatar: avatar, phone: phone},
      {headers: {Authorization: `Bearer ${tt}`, 'x-client-key': tt ?? ''}},
    );
    console.log('updateUserAction root', data);
    if (data.data === null && data.success === false) {
      return {
        code: 1,
      };
    }
    if (data.data.verificarion_required) {
      return {
        code: 2,
      };
    }
    if (data.success && data.error === null) {
      return {
        code: 3,
      };
    }
  } catch (error) {}
});

export const getRegion = createAsyncThunk('regions', async (text: string) => {
  let tt = storage.getString('token');
  try {
    const {data, status} = await axios.get(domain + regions, {
      params: {
        query: text,
      },
      headers: {Authorization: `Bearer ${tt}`, 'x-client-key': tt ?? ''},
    });

    if (status === 200) {
      return data;
    } else {
      return [];
    }
  } catch (error) {}
});

export const getActiveAds = createAsyncThunk(
  'getActiveAds',
  async (params?: any) => {
    let tt = storage.getString('token');
    try {
      const {data} = await axios.get(domain + userAds(), {
        params: params,
        headers: {Authorization: `Bearer ${tt}`, 'x-client-key': tt ?? ''},
      });
      console.log(JSON.stringify(data, null, 2));

      if (data.success === true && data.error === null) {
        if (params.status === 'active') {
          return {
            data: data.data,
            code: 1,
          };
        } else {
          return {
            data: data.data,
            code: 2,
          };
        }
      } else {
        return {
          data: [],
        };
      }
    } catch (error) {}
  },
);

export const addFavourite = createAsyncThunk(
  'addFavourite',
  async (state: {add_id: number}) => {
    const {add_id} = state;
    let tt = storage.getString('token');
    try {
      await axios.post(
        domain + userFavoriteDeleteUrl(add_id),
        {},
        {
          headers: {Authorization: `Bearer ${tt}`, 'x-client-key': tt ?? ''},
        },
      );
    } catch (error) {}
  },
);

export const deleteFavourite = createAsyncThunk(
  'deleteFavourite',
  async (state: {add_id: number}) => {
    const {add_id} = state;
    let tt = storage.getString('token');
    try {
      await axios.delete(domain + userFavoriteDeleteUrl(add_id), {
        headers: {Authorization: `Bearer ${tt}`, 'x-client-key': tt ?? ''},
      });
    } catch (error) {}
  },
);

export const increaseCount = createAsyncThunk(
  'increaseCount',
  async (id: number) => {
    let tt = storage.getString('token');
    try {
      await axios.post(
        domain + callCountUrl(id),
        {},
        {
          headers: {Authorization: `Bearer ${tt}`, 'x-client-key': tt ?? ''},
        },
      );
    } catch (error) {}
  },
);

export const onRefreshTokenAction = createAsyncThunk(
  'onRefreshTokenAction',
  async (_, {dispatch}) => {
    let tt = storage.getString('reftoken');
    let token = storage.getString('token');

    try {
      const {data} = await axios.post(
        domain + userRefreshToken,
        {
          refresh_token: tt,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'x-client-key': token ?? '',
          },
        },
      );
      if (data.success && data.error === null) {
        storage.set('token', data.data.access_token);
        storage.set('reftoken', data.data.refresh_token);
        dispatch(getUserAction());
      }
    } catch (error) {}
  },
);

export const onChangePhoneAction = createAsyncThunk(
  'onChangePhoneAction',
  async ({phone, otp}: {phone: string; otp: string}) => {
    let tt = storage.getString('token');

    try {
      const {data} = await axios.post(
        domain + '/user/verifyPhoneChange',
        {
          phone: phone,
          otp: otp,
        },
        {
          headers: {Authorization: `Bearer ${tt}`, 'x-client-key': tt ?? ''},
        },
      );

      if (data.success) {
        return {
          code: 1,
        };
      } else {
        return {
          code: 2,
        };
      }
    } catch (error) {
      console.log(error, 'action errorrrr');
    }
  },
);

export const increaseViewCount = createAsyncThunk(
  'increaseViewCount',
  async (state: {id: number}) => {
    let tt = storage.getString('token');
    try {
      await axios.post(
        domain + `/ads/${state.id}/view`,
        {},
        {
          headers: {Authorization: `Bearer ${tt}`, 'x-client-key': tt ?? ''},
        },
      );
    } catch (error) {}
  },
);

export const getNotification = createAsyncThunk('getNotification', async () => {
  try {
    const {data} = await axios.get(domain + '/notification');
    return {
      data: data,
      code: 1,
    };
  } catch (error) {
    return {
      data: null,
      code: 0,
    };
  }
});
