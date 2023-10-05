import {createSlice, createAction, createReducer} from '@reduxjs/toolkit';

const initialState = {
  data: null,
};

export const loginSlice = createSlice({
  name: 'Login',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.data = action.payload;
    },
    updateLogin: (state, action) => {
      state.data.response.ZRMV = action.payload;
    },
    clearLogin: state => {
      state.data = null;
    },
  },
});

export const {setLogin, updateLogin, clearLogin} = loginSlice.actions;

export default loginSlice.reducer;
