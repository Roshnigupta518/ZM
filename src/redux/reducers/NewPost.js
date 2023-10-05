import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: null,
}

export const newPostSlice = createSlice({
  name: 'NewPost',
  initialState,
  reducers: {
    setNewPost: (state, action) => {
      state.data = action.payload
    },
    clearNewPost : (state) => {
      state.data = null
    }
  },
})


export const { setNewPost, clearNewPost } = newPostSlice.actions

export default newPostSlice.reducer