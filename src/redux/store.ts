import {configureStore} from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import percelReducer from './reducers/percelReducer';
import courierReducer from './reducers/courierReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    percels: percelReducer,
    couriers: courierReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
