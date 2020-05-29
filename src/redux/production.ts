import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, RootState } from './store';
import prodctionapi from '~/prodctionapi';

export interface GetListProductionDept {
  Count: string;
  Id: string;
  DeptName: string;
}
export interface GetListDeptInputOutput {
  Count: string;
  Id: string;
  DeptName: string;
}

export interface GetOrderBasicByJob {
  Id: string;
  BuyerName: string;
  StyleName: string;
  ColorName: string;
  Qty: string;
  PrdQty: string;
  SizeName: string;
}

export interface GetOrderSizeWiseBreakdown {
  Id: string;
  BuyerName: string;
  StyleName: string;
  ColorName: string;
  Qty: string;
  PrdQty: string;
  SizeName: string;
}

export interface GetListLine {
  Id: string;
  Name: string;
}

interface ProductionState {
  proddept: GetListProductionDept[];
  // requisitions: { [key: string]: Requisition };

  inputoutput: GetListDeptInputOutput[];

  productstyle: GetOrderBasicByJob[];
  productsize: GetOrderSizeWiseBreakdown[];
  productline: GetListLine[];
  loading: boolean;
}

const initialState: ProductionState = {
  proddept: [],
  inputoutput: [],
  productstyle: [],
  productsize: [],
  productline: [],

  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    gotDepartment(state, { payload }: PayloadAction<GetListProductionDept[]>) {
      state.proddept = payload;
      state.loading = false;
    },

    gotinout(state, { payload }: PayloadAction<GetListDeptInputOutput[]>) {
      state.inputoutput = payload;
    },
    gotstyle(state, { payload }: PayloadAction<GetOrderBasicByJob[]>) {
      state.productstyle = payload;
    },
    gotsize(state, { payload }: PayloadAction<GetOrderSizeWiseBreakdown[]>) {
      state.productsize = payload;
    },
    gotline(state, { payload }: PayloadAction<GetListLine[]>) {
      state.productline = payload;
    },

    setLoading(state, { payload }: PayloadAction<boolean>) {
      state.loading = payload;
    },
  },
});

export const getDepartment = (): AppThunk => async dispatch => {
  try {
    const { data } = await prodctionapi.get('/GetListProductionDept');
    dispatch(gotDepartment(data));
  } catch (e) {
    throw e;
  }
};

export const getLine = (): AppThunk => async dispatch => {
  try {
    const { data } = await prodctionapi.get('/GetListLine');
    dispatch(gotline(data));
  } catch (e) {
    throw e;
  }
};

export const getStyle = (filters?: {
  JobNo?: string;
}): AppThunk => async dispatch => {
  //const user = getState().auth.user;
  dispatch(gotstyle([]));
  dispatch(setLoading(true));
  try {
    const { data } = await prodctionapi.get('/GetOrderBasicByJob', {
      params: {
        JobNo: filters?.JobNo || '3000',
      },
    });
    dispatch(gotinout(data));
    // console.warn(DeptName);
  } catch (e) {
    dispatch(setLoading(false));
    // throw e;
  }
};

export const getOption = (filters?: {
  DeptName?: string;
}): AppThunk => async dispatch => {
  //const user = getState().auth.user;
  dispatch(gotinout([]));
  dispatch(setLoading(true));
  try {
    const { data } = await prodctionapi.get('/GetListDeptInputOutput', {
      params: {
        DeptName: filters?.DeptName || 'Cutting',
      },
    });
    dispatch(gotinout(data));
    // console.warn(DeptName);
  } catch (e) {
    dispatch(setLoading(false));
    // throw e;
  }
};

export const getSize = (filters?: {
  DeptId?: string;
  StyleId?: string;
}): AppThunk => async dispatch => {
  //const user = getState().auth.user;
  dispatch(gotsize([]));
  dispatch(setLoading(true));
  try {
    const { data } = await prodctionapi.get('/GetOrderSizeWiseBreakdown', {
      params: {
        DeptId: filters?.DeptId || 'CuttingInput',
        StyleId: filters?.StyleId || '25320290-bd42-4d3a-9bb8-03f30637737c',
      },
    });
    dispatch(gotsize(data));
    // console.warn(DeptName);
  } catch (e) {
    dispatch(setLoading(false));
    // throw e;
  }
};

export const {
  gotDepartment,
  gotinout,
  gotstyle,
  gotsize,
  gotline,

  setLoading,
} = authSlice.actions;

export default authSlice.reducer;
