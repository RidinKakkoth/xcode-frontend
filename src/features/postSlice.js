import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload; 
    },
    addNewPost: (state, action) => {
      state.posts.unshift(action.payload); 
    },
    editPost: (state, action) => {
      const index = state.posts.findIndex((post) => post.id === action.payload.id);
      if (index !== -1) state.posts[index] = action.payload;
    },
    removePost: (state, action) => {
        state.posts = state.posts.filter((post) => post._id !== action.payload); 
    },
  },
});

export const { setPosts, addNewPost,editPost, removePost } = postSlice.actions;

export default postSlice.reducer;
