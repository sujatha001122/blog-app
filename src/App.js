// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import BlogPage from './components/BlogPage';
import CreateEditBlog from './components/CreateEditBlog';
import CategoryPage from './components/CategoryPage';
import { useSelector } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const App = () => {
  const theme = useSelector(state => state.theme);
  const themeMode = createTheme({
    palette: {
      mode: theme,
    },
  });

  return (
    <ThemeProvider theme={themeMode}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog/:id" element={<BlogPage />} />
          <Route path="/create" element={<CreateEditBlog />} />
          <Route path="/edit/:id" element={<CreateEditBlog />} />
          <Route path="/category/:category" element={<CategoryPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
