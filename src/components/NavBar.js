import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, InputBase, Typography, Box, Menu, MenuItem } from '@mui/material';
import { Search as SearchIcon, Brightness4, Brightness7, Close as CloseIcon, Menu as MenuIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/themeSlice';
import { Link } from 'react-router-dom';

const NavBar = ({ searchTerm, setSearchTerm }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleSearchIconClick = () => {
    setIsSearchOpen(!isSearchOpen);
    setSearchTerm(''); // Clear search term when closing search bar
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Blog App
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isSearchOpen && (
            <InputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ color: 'inherit', mr: 2 }}
            />
          )}
          <IconButton color="inherit" aria-label="search" onClick={handleSearchIconClick}>
            {isSearchOpen ? <CloseIcon /> : <SearchIcon />}
          </IconButton>
          <IconButton color="inherit" aria-label="toggle theme" onClick={() => dispatch(toggleTheme())}>
            {theme === 'light' ? <Brightness4 /> : <Brightness7 />}
          </IconButton>
          <IconButton color="inherit" aria-label="menu" onClick={handleMenuClick}>
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose} component={Link} to="/">Home</MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to="/category/Technology">Technology</MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to="/category/Travel">Travel</MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to="/category/Food">Food</MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to="/category/Lifestyle">Lifestyle</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
