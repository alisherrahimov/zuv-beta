import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ActionType} from '../actionTypes';

export interface UserTypes {
  id: number | null;
  name: string;
  phone: string;
  avatar: string;
  status: string;
  otp: string;
}

export interface AdTypes {
  id: number;
  from_region: string;
  to_region: string;
  from_city: string;
  to_city: string;
  leaves_at: number;
  arrives_at: number;
  transport_type: string;
  luggage_type: string;
  transport_name: string;
  luggage_size: string;
  luggage_image: string;
  car_number: string;
  people_count: number;
  comment: string;
  price: string;
  negotiate_price: boolean;
  status: string;
  checkedByMederator: boolean;
  phone_number: string;
  type: string;
  userType: string;
  user: UserTypes | null;
  admin: AdminTypes | null;
  likesCount: number;
  created_at: string;
  updated_at: string;
  viewCount: number;
  saveCount: number;
  resolvedBy: string;
  isNegotiable: boolean;
  is_liked: boolean;
}

export interface AdminTypes {
  id: number;
  username: string;
  pwd: string;
  role: string;
  status: string;
  refreshToken: string;
  adsCount: number;
}

export interface CourierType {
  id: number;
  from_region: string;
  to_region: string;
  from_city: string;
  to_city: string;
  leaves_at: number;
  arrives_at: number;
  transport_type: string;
  luggage_type: string;
  transport_name: string;
  luggage_size: string;
  luggage_image: string;
  car_number: string;
  people_count: number;
  comment: string;
  price: string;
  isNegotiable: true;
  status: string;
  phone_number: string;
  type: string;
  userType: string;
  user: UserTypes | null;
  admin: AdminTypes | null;
  likesCount: number;
  created_at: string;
  updated_at: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface UserFavouritesType {
  id: number;
}

export declare type ErrorCode = 'camera_unavailable' | 'permission' | 'others';

export interface Asset {
  base64?: string;
  uri?: string;
  width?: number;
  height?: number;
  fileSize?: number;
  type?: string;
  fileName?: string;
  duration?: number;
  bitrate?: number;
  timestamp?: string;
  id?: string;
}
export interface ImagePickerResponse {
  didCancel?: boolean;
  errorCode?: ErrorCode;
  errorMessage?: string;
  assets?: Asset[];
}

export type VerifyScreenRouteDto = {
  Details: {
    type?: number;
    phone: string;
  };
};

export const getLoadingType = (type: string) =>
  type === 'more' ? ActionType.SET_MORE_LOADING : ActionType.SET_LOADING;

export const getCouriersType = (type: string) =>
  type === 'more' ? ActionType.SET_MORE_COURIERS : ActionType.SET_COURIERS;

export const getParcelsType = (type: string) =>
  type === 'more' ? ActionType.SET_MORE_PARCELS : ActionType.SET_PARCELS;

export type RootStackParamList = {
  Home: undefined;
  PhoneNumberScreen: undefined;
  CodeVerifyScreen: undefined;
  RegisterScreen: undefined;
  LanguageScreen: undefined;
  WelcomeScreen: undefined;
  BottomNavigator: undefined;
  CompletedAdsScreen: undefined;
  ActiveAdsScreen: undefined;
  NotificationScreen: undefined;
  HelpScreen: undefined;
  AdScreen: undefined;
  AddScreen: undefined;
  EditAds: undefined;
  ProfileEditScreen: undefined;
  PhoneNumberEdit: undefined;
};

export type NavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'Home',
  'BottomNavigator'
>;
