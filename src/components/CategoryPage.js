import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectBlogsByCategory, deleteBlog } from '../redux/blogSlice';
import { Card, CardContent, Typography, Chip, Box, IconButton, Button } from '@mui/material';
import { Favorite, ThumbDown, Add, Edit, Delete } from '@mui/icons-material';

const CategoryPage = () => {
  const { category } = useParams();
  const blogs = useSelector(state => selectBlogsByCategory(state, category));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    dispatch(deleteBlog(id));
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">{category}</Typography>
        <Button
          startIcon={<Add />}
          onClick={() => navigate(`/create?category=${category}`)}
          variant="contained"
          color="primary"
        >
          Add Blog
        </Button>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
        {blogs.map(blog => (
          <Card key={blog.id} sx={{ width: '400px', marginBottom: '20px' }}>
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
                <Button
                  startIcon={<Delete />}
                  onClick={() => handleDelete(blog.id)}
                >
                  Delete
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default CategoryPage;
