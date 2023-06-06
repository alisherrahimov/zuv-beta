import {createSlice} from '@reduxjs/toolkit';

import {getPercelsAction} from '../apis/percels';

export interface percelProps {
  percels: any[];
}

const initialState: percelProps = {
  percels: [],
};

export const percelsSlice = createSlice({
  initialState: initialState,
  name: 'percelSlice',
  reducers: {
    setLikedPercel: (state, action) => {
      let a = state.percels.find(val => val.id === action.payload.id);
      if (action.payload.is) {
        a.is_liked = true;
      } else {
        a.is_liked = false;
      }
    },
    setFavDelLocal: (state, action) => {
      let a = state.percels.find(val => val.id === action.payload.id);
      a.is_liked = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(getPercelsAction.fulfilled, (state, action) => {
      state.percels = action.payload;
    });
  },
});
export const {setLikedPercel, setFavDelLocal} = percelsSlice.actions;
export default percelsSlice.reducer;
