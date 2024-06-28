import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/themeSlice';
import { Button } from '@mui/material';

const ThemeSwitcher = () => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <Button onClick={handleThemeToggle}>
      Switch to {theme === 'light' ? 'dark' : 'light'} mode
    </Button>
  );
};

export default ThemeSwitcher;
