import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { selectBlogs } from '../redux/blogSlice';
import NavBar from './NavBar';
import { Card, CardContent, Typography, IconButton, Chip, Box, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';
import { Favorite, ThumbDown, Edit } from '@mui/icons-material';

const HomePage = () => {
  const blogs = useSelector(selectBlogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const navigate = useNavigate();

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categorizedBlogs = category
    ? filteredBlogs.filter(blog => blog.category === category)
    : filteredBlogs;

  return (
    <div>
      <NavBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <FormControl fullWidth margin="normal">
        <InputLabel sx={{position: 'relative'}}>Filter by Category</InputLabel>
        <Select value={category} onChange={e => setCategory(e.target.value)}>
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Technology">Technology</MenuItem>
          <MenuItem value="Travel">Travel</MenuItem>
          <MenuItem value="Food">Food</MenuItem>
          <MenuItem value="Lifestyle">Lifestyle</MenuItem>
        </Select>
      </FormControl>
      <Box sx={{ padding: '20px', display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
        {categorizedBlogs.map(blog => (
          <Card key={blog.id} sx={{ width: '400px'}}>
            <CardContent>
              <Link to={`/blog/${blog.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography variant="h5" component="div" gutterBottom>
                  {blog.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {blog.body.substring(0, 100)}...
                </Typography>
              </Link>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                {blog.tags.map(tag => (
                  <Chip key={tag} label={tag} sx={{ mr: 1 }} />
                ))}
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton>
                    <Favorite color="primary" />
                  </IconButton>
                  <Typography variant="body2">{blog.reactions.likes}</Typography>
                  <IconButton>
                    <ThumbDown color="secondary" />
                  </IconButton>
                  <Typography variant="body2">{blog.reactions.dislikes}</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Views: {blog.views}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                <Button
                  startIcon={<Edit />}
                  onClick={() => navigate(`/edit/${blog.id}`)}
                >
                  Edit
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </div>
  );
};

export default HomePage;
