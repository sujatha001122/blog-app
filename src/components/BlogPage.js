import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteBlog, selectBlogById } from '../redux/blogSlice';
import { Card, CardContent, Typography, IconButton, Chip, Box, Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Favorite, ThumbDown } from '@mui/icons-material';

const BlogPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const blog = useSelector(state => selectBlogById(state, Number(id)));

  if (!blog) {
    return <div>Blog not found</div>;
  }

  const handleDelete = () => {
    dispatch(deleteBlog(blog.id));
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ flex: 1, padding: '20px' }}>
        <Card>
          <CardContent>
            <Typography variant="h4" component="div">
              {blog.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              {blog.body}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
              {blog.tags.map(tag => (
                <Chip key={tag} label={tag} sx={{ mr: 1 }} />
              ))}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
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
              <IconButton onClick={handleDelete} color="error">
                Delete
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Drawer variant="permanent" anchor="bottom">
        <Box sx={{ width: 240 }}>
          <List>
            <ListItem>
              <ListItemText primary="Blog Details" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary={`Views: ${blog.views}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Author ID: ${blog.userId}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Likes: ${blog.reactions.likes}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Dislikes: ${blog.reactions.dislikes}`} />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};


export default BlogPage;
