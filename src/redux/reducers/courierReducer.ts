import {createSlice} from '@reduxjs/toolkit';
import {getCouriersAction} from '../apis/courier';

export interface courierProps {
  couriers: any[];
}

const initialState: courierProps = {
  couriers: [],
};

export const couriersSlice = createSlice({
  initialState: initialState,
  name: 'couriersSlice',
  reducers: {
    setLikedCourier: (state, action) => {
      let a = state.couriers.find(val => val.id === action.payload.id);
      if (action.payload.is) {
        a.is_liked = true;
      } else {
        a.is_liked = false;
      }
    },
    setFavDelCourLocal: (state, action) => {
      let a = state.couriers.find(val => val.id === action.payload.id);
      a.is_liked = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(getCouriersAction.fulfilled, (state, action) => {
      state.couriers = action.payload;
    });
  },
});

export const {setLikedCourier, setFavDelCourLocal} = couriersSlice.actions;
export default couriersSlice.reducer;
