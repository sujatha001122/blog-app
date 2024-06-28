import { createSlice } from '@reduxjs/toolkit';
import posts from '../assets/posts.json'; 

const blogSlice = createSlice({
  name: 'blogs',
  initialState: posts,
  reducers: {
    addBlog: (state, action) => {
      state.push(action.payload);
    },
    editBlog: (state, action) => {
      const { id, updatedBlog } = action.payload;
      const index = state.findIndex(blog => blog.id === id);
      if (index !== -1) {
        state[index] = { ...state[index], ...updatedBlog };
      }
    },
    deleteBlog: (state, action) => {
      return state.filter(blog => blog.id !== action.payload);
    },
  },
});

export const { addBlog, editBlog, deleteBlog } = blogSlice.actions;

export const selectBlogs = state => state.blogs; // Export selectBlogs selector

export const selectBlogById = (state, blogId) =>
  state.blogs.find(blog => blog.id === blogId);

export const selectBlogsByCategory = (state, category) =>
  state.blogs.filter(blog => blog.category === category);

export default blogSlice.reducer;
