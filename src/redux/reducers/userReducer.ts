import {createSlice} from '@reduxjs/toolkit';

import {
  VerifyCodeAction,
  getActiveAds,
  getUserAction,
  getUserFavourite,
} from '../apis/userApi';

export interface userProps {
  user: {
    id: number | undefined;
    name: string;
    phone: string;
    avatar: string;
    status: string;
    otp: string;
    active_ads: number;
    archived_ads: number;
    deleted_ads: number;
    inactive_ads: number;
    pending_ads: number;
    restricted_ads: number;
  };
  favourites: {
    couriers: any[];
    percels: any[];
  };
  activeAds: any[];
  complateAds: any[];
}

const initialState: userProps = {
  user: {
    avatar: '',
    id: undefined,
    name: '',
    otp: '',
    phone: '',
    status: '',
    active_ads: 0,
    archived_ads: 0,
    deleted_ads: 0,
    inactive_ads: 0,
    pending_ads: 0,
    restricted_ads: 0,
  },
  favourites: {
    couriers: [],
    percels: [],
  },
  activeAds: [],
  complateAds: [],
};

export const userSlice = createSlice({
  initialState: initialState,
  name: 'userSlice',
  reducers: {
    onDeleteReducerFuntion: state => {
      state.user.avatar = '';
      state.user.id = undefined;
      state.user.name = '';
      state.user.otp = '';
      state.user.phone = '';
      state.user.status = '';
      state.favourites.couriers = [];
      state.favourites.percels = [];
      state.user.active_ads = 0;
      state.user.active_ads = 0;
      state.user.archived_ads = 0;
      state.user.deleted_ads = 0;
      state.user.inactive_ads = 0;
      state.user.pending_ads = 0;
      state.user.restricted_ads = 0;
    },
    setUserReducerFunc: (state, action) => {
      state.user.id = action.payload.id;
      state.user.avatar = action.payload.avatar;
      state.user.name = action.payload.name;
      state.user.phone = action.payload.phone;
      state.user.status = action.payload.status;
    },
    setFavorites: (state, action) => {
      if (action.payload.type === 'del') {
        state.favourites.percels.push(action.payload.item);
      } else {
        state.favourites.couriers.push(action.payload.item);
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(VerifyCodeAction.fulfilled, (state: userProps, action) => {
      const {id, name, phone, avatar, status, otp} = action.payload.user;

      state.user.id = id;
      state.user.name = name;
      state.user.phone = phone;
      state.user.avatar = avatar;
      state.user.status = status;
      state.user.otp = otp;
    });
    builder.addCase(getUserAction.fulfilled, (state: userProps, action) => {
      const {
        id,
        name,
        phone,
        avatar,
        status,
        otp,
        active_ads,
        archived_ads,
        deleted_ads,
        inactive_ads,
        pending_ads,
        restricted_ads,
      } = action.payload.user;
      state.user.id = id;
      state.user.name = name;
      state.user.phone = phone;
      state.user.avatar = avatar;
      state.user.status = status;
      state.user.otp = otp;
      state.user.active_ads = active_ads;
      state.user.archived_ads = archived_ads;
      state.user.deleted_ads = deleted_ads;
      state.user.inactive_ads = inactive_ads;
      state.user.pending_ads = pending_ads;
      state.user.restricted_ads = restricted_ads;
    });
    builder.addCase(getUserFavourite.fulfilled, (state: userProps, action) => {
      state.favourites.couriers = action?.payload?.couriers;
      state.favourites.percels = action.payload.percels;
    });
    builder.addCase(getActiveAds.fulfilled, (state, action) => {
      if (action.payload?.code === 1) {
        state.activeAds = action.payload ?? [];
      } else {
        state.complateAds = action.payload ?? [];
      }
    });
  },
});

export const {
  onDeleteReducerFuntion,
  setUserReducerFunc,

  setFavorites,
} = userSlice.actions;
export default userSlice.reducer;
