import {createSlice, createAction, createReducer} from '@reduxjs/toolkit';

const initialState = {
  data: null,
};

export const introSlice = createSlice({
  name: 'Login',
  initialState,
  reducers: {
    setIntroSlide: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const {setIntroSlide} = introSlice.actions;

export default introSlice.reducer;
