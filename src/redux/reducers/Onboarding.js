import {createSlice, createAction, createReducer} from '@reduxjs/toolkit';

const initialState = {
  data: {
    profile: false,
    bio: false,
    suggestion: false,
    interest: false,
  },
};

export const onBoardSlice = createSlice({
  name: 'onBoard',
  initialState,
  reducers: {
    setOnBoard: (state, action) => {
      state.data = action.payload;
    },
    // updateLogin: (state, action) => {
    //   state.data.response.ZRMV = action.payload;
    // },
    clearOnBoard: state => {
      state.data = null;
    },
  },
});

export const {setOnBoard, clearOnBoard} = onBoardSlice.actions;

export default onBoardSlice.reducer;
