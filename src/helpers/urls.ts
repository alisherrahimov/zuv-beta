export const APP_MODE = '/api';
export const APP_VERSION = '/v1';
export const MEDIA_APP_MODE = '/api';
export const MEDIA_APP_VERSION = '/v1';

// USER
export const userLogin = '/user/login';
export const userVerify = '/user/verify';
export const updateUser = () => `/user`;
export const userRefreshToken = '/user/refresh';
export const userAds = () => '/user/getAds';
export const getUserUrl = '/user/getMe';
export const userFavoritesUrl = () => '/favorites/getFavorites';
export const userFavoriteAddUrl = (_userId: number | null, adId: number) =>
  `/favorites/${_userId}/${adId}`;
export const userFavoriteDeleteUrl = (adId: number) => `/favorites/${adId}`;

export const deleteUser = () => '/user/delete';
export const deleteUserCodeVerify = () => '/user/submitDelete';

// Courier

export const getCouriersUrl = '/courier';
export const getCourierId = (id: number) => `/courier/${id}`;
export const addCourier = '/courier';
export const updateCourierUrl = (id: number | null) => `/courier/${id}`;

// Parcel

export const getParcelsUrl = '/parcel';
export const getParcelId = (id: number) => `/parcel/${id}`;
export const addParcel = '/parcel';
export const updateParcelUrl = (id: number | null) => `/parcel/${id}`;

// Call count

export const callCountUrl = (id: number) => `/ads/${id}/call`;

// Media
export const postMedia = '/aws';

export const regions = '/location';

export const domain = `https://api.zuvexpress.com${APP_MODE}${APP_VERSION}`;
export const mediaDomain = `https://media-api.main-gate.appx.uz${MEDIA_APP_MODE}${MEDIA_APP_VERSION}`;
