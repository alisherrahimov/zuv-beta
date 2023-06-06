import {createAsyncThunk} from '@reduxjs/toolkit';

import {
  addParcel,
  domain,
  getParcelsUrl,
  updateParcelUrl,
} from '../../helpers/urls';
import {storage} from '../../helpers/dataStorage';
import axios from 'axios';

interface props {
  from_region?: string;
  to_region?: string;
  leaves_at_start?: string;
  leaves_at_end?: string;
  transport_type?: string;
  created_at_start?: string;
}
let tt = storage.getString('token');

export const getPercelsAction = createAsyncThunk(
  'percels',
  async (params?: props) => {
    try {
      const {data} = await axios.get(domain + getParcelsUrl, {
        params: {
          ...params,
          status: 'active',
        },
        headers: {
          Authorization: `Bearer ${tt}`,
          'x-client-key': tt ?? '',
        },
      });

      if (data.success && data.error === null) {
        return data.data;
      }
    } catch (error) {
      console.log(error, 'error');
    }
  },
);

export const postAdsPercelAction = createAsyncThunk(
  'postAdsPercelAction',
  async (state: any) => {
    try {
      const {data} = await axios.post(domain + addParcel, state, {
        headers: {Authorization: `Bearer ${tt}`, 'x-client-key': tt ?? ''},
      });
      console.log(data, 'parcel aciotn');
      if (data.success && data.error === null) {
        return {
          success: true,
        };
      } else {
        return {
          success: false,
        };
      }
    } catch (error) {}
  },
);

export const editPercelAction = createAsyncThunk(
  'editPercelAction',
  async (state: {id: number; item: any}) => {
    try {
      const {data} = await axios.patch(
        domain + updateParcelUrl(state.id),
        {
          ...state.item,
        },
        {headers: {Authorization: `Bearer ${tt}`, 'x-client-key': tt ?? ''}},
      );
      console.log('erorror', data);
      if (data.success && data.error === null) {
        return {
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
