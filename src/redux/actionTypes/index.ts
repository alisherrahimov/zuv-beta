import {AdTypes, Tokens, UserTypes} from '../types/types';

export enum ActionType {
  SET_USER = 'SET_USER',
  SET_LOADING = 'SET_LOADING',
  SET_MORE_LOADING = 'SET_MORE_LOADING',
  SET_USER_ADS = 'SET_USER_ADS',
  SET_COURIERS = 'SET_COURIERS',
  SET_PARCELS = 'SET_PARCELS',
  SET_MORE_COURIERS = 'SET_MORE_COURIERS',
  SET_MORE_PARCELS = 'SET_MORE_PARCELS',
  SET_TOKENS = 'SET_TOKENS',
  SET_AD_TYPE_MODAL_VISIBLE = 'SET_AD_TYPE_MODAL_VISIBLE',
  SET_COURIER = 'SET_COURIER',
  SET_PARCEL = 'SET_PARCEL',
  SET_LANGUAGE_MODAL = 'SET_LANGUAGE_MODAL',
  SET_ADEND_MODAL = 'SET_ADEND_MODAL',
  SET_USER_FAVORITES = 'SET_USER_FAVORITES',
  SET_FILTER_MODAL = 'SET_FILTER_MODAL',
  SET_STATUS_BAR_STATE = 'SET_STATUS_BAR_STATE',
  SET_COURIERS_LIST_END = 'SET_COURIERS_LIST_END',
  SET_PARCELS_LIST_END = 'SET_PARCELS_LIST_END',
  SET_CITY_MODAL = 'SET_CITY_MODAL',
  SET_REGION = 'SET_REGION',
  SET_REGION_MODAL = 'SET_REGION_MODAL',
  SET_CITY = 'SET_CITY',
  DELETE_FAVOURITE = 'DELETE_FAVOURITE',
}

interface ActionSetUser {
  type: ActionType.SET_USER;
  payload: {
    user: UserTypes;
  };
}

interface ActionSetLaoding {
  type: ActionType.SET_LOADING;
  payload: {
    loading: boolean;
  };
}

interface ActionSetMoreLoading {
  type: ActionType.SET_MORE_LOADING;
  payload: {
    loading: boolean;
  };
}

interface ActionSetAd {
  type: ActionType.SET_USER_ADS;
  payload: {
    ads: AdTypes[];
  };
}

interface ActionSetParcelsListEnd {
  type: ActionType.SET_PARCELS_LIST_END;
  payload: {
    isListEnd: boolean;
  };
}

interface ActionSetCouriersListEnd {
  type: ActionType.SET_COURIERS_LIST_END;
  payload: {
    isListEnd: boolean;
  };
}

interface ActionSetCouriers {
  type: ActionType.SET_COURIERS;
  payload: {
    couriers: AdTypes[];
  };
}

interface ActionSetParcels {
  type: ActionType.SET_PARCELS;
  payload: {
    parcels: AdTypes[];
  };
}

interface ActionSetMoreCouriers {
  type: ActionType.SET_MORE_COURIERS;
  payload: {
    couriers: AdTypes[];
  };
}

interface ActionSetMoreParcels {
  type: ActionType.SET_MORE_PARCELS;
  payload: {
    parcels: AdTypes[];
  };
}

interface ActionSetCourier {
  type: ActionType.SET_COURIER;
  payload: {
    courier: AdTypes;
  };
}

interface ActionSetParcel {
  type: ActionType.SET_PARCEL;
  payload: {
    parcel: AdTypes;
  };
}

interface ActionSetTokens {
  type: ActionType.SET_TOKENS;
  payload: {
    tokens: Tokens;
  };
}

interface ActionSetAdTypeModalVisible {
  type: ActionType.SET_AD_TYPE_MODAL_VISIBLE;
  payload: {
    adTypeModalVisible: boolean;
  };
}

interface ActionSetLanguageModalVisible {
  type: ActionType.SET_LANGUAGE_MODAL;
  payload: {
    languageModalVisible: boolean;
  };
}
interface ActionSetRegionModalVisible {
  type: ActionType.SET_REGION_MODAL;
  payload: boolean;
}

interface ActionSetFilterModalVisible {
  type: ActionType.SET_FILTER_MODAL;
  payload: {
    visible: boolean;
    type: string;
  };
}

interface ActionSetAdEndModalVisible {
  type: ActionType.SET_ADEND_MODAL;
  payload: {
    visible: boolean;
    id: number;
    type: string;
  };
}

interface ActionSetUserFavorites {
  type: ActionType.SET_USER_FAVORITES;
  payload: number;
}

interface ActionSetStatusBarState {
  type: ActionType.SET_STATUS_BAR_STATE;
  payload: {
    barStyle: string;
    bgColor: string;
  };
}

interface ActionSetCityModal {
  type: ActionType.SET_CITY_MODAL;
  payload: boolean;
}

interface ActionSetRegion {
  type: ActionType.SET_REGION;
  payload: {
    city: string;
    region: string;
    id: string;
  };
}

interface ActionSetCity {
  type: ActionType.SET_CITY;
  payload: {
    city: string;
    region: string;
    id: string;
  };
}

interface ActionDeleteFavorite {
  type: ActionType.DELETE_FAVOURITE;
  payload: number;
}

export type Action =
  | ActionSetUser
  | ActionSetLaoding
  | ActionSetAd
  | ActionSetCouriers
  | ActionSetParcels
  | ActionSetTokens
  | ActionSetAdTypeModalVisible
  | ActionSetCourier
  | ActionSetParcel
  | ActionSetLanguageModalVisible
  | ActionSetAdEndModalVisible
  | ActionSetUserFavorites
  | ActionSetFilterModalVisible
  | ActionSetStatusBarState
  | ActionSetMoreCouriers
  | ActionSetMoreParcels
  | ActionSetMoreLoading
  | ActionSetParcelsListEnd
  | ActionSetCouriersListEnd
  | ActionSetRegionModalVisible
  | ActionSetRegion
  | ActionSetCityModal
  | ActionSetCity
  | ActionDeleteFavorite;
