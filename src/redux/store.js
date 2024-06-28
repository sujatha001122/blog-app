import { configureStore } from '@reduxjs/toolkit';
import blogReducer from '../redux/blogSlice';
import themeReducer from '../redux/themeSlice';

export const store = configureStore({
  reducer: {
    blogs: blogReducer,
    theme: themeReducer,
  },
});
