import {createAsyncThunk} from '@reduxjs/toolkit';

import {
  addCourier,
  domain,
  getCouriersUrl,
  updateCourierUrl,
} from '../../helpers/urls';
import axios from 'axios';
import {storage} from '../../helpers/dataStorage';

interface props {
  from_region?: string;
  to_region?: string;
  leaves_at_start?: string;
  leaves_at_end?: string;
  transport_type?: string;
  created_at_start?: string;
}
let tt = storage.getString('token');
export const getCouriersAction = createAsyncThunk(
  'couriers',
  async (params?: props) => {
    try {
      const {data} = await axios.get(domain + getCouriersUrl, {
        params: {
          ...params,
          status: 'active',
        },
        headers: {
          Authorization: `Bearer ${tt}`,
          'x-client-key': tt ?? '',
        },
      });
      console.log('courier', data);
      if (data.success && data.error === null) {
        return data.data;
      } else {
        return [];
      }
    } catch (error) {}
  },
);

export const postAdsCourierAction = createAsyncThunk(
  'postAdsCourierAction',
  async (state: any) => {
    try {
      const {data} = await axios.post(domain + addCourier, state, {
        headers: {
          Authorization: `Bearer ${tt}`,
          'x-client-key': tt ?? '',
        },
      });

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

export const editCourierAction = createAsyncThunk(
  'editCourierAction',
  async (state: {id: number; item: any}) => {
    try {
      const {data} = await axios.patch(
        domain + updateCourierUrl(state.id),
        {
          ...state.item,
        },
        {
          headers: {
            Authorization: `Bearer ${tt}`,
            'x-client-key': tt ?? '',
          },
        },
      );
      console.log(data, 'erorroror');

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
