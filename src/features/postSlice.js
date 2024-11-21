import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    activePage: null,
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
    setActivePage: (state, action) => {
      state.activePage = action.payload; // Update the activePage state
    },
  },
});

export const { setPosts, addNewPost,editPost, removePost,setActivePage } = postSlice.actions;

export default postSlice.reducer;
