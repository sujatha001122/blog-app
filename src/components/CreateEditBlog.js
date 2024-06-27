import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addBlog, editBlog, selectBlogById } from '../redux/blogSlice';
import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Box } from '@mui/material';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CreateEditBlog = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const existingBlog = useSelector(state => selectBlogById(state, Number(id)));

  const [title, setTitle] = useState(existingBlog ? existingBlog.title : '');
  const [body, setBody] = useState(existingBlog ? existingBlog.body : '');
  const [category, setCategory] = useState(existingBlog ? existingBlog.category : '');

  useEffect(() => {
    if (existingBlog) {
      setTitle(existingBlog.title);
      setBody(existingBlog.body);
      setCategory(existingBlog.category);
    }
  }, [existingBlog]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      dispatch(editBlog({ id: Number(id), updatedBlog: { title, body, category } }));
    } else {
      dispatch(addBlog({ id: Date.now(), title, body, category, tags: [], reactions: { likes: 0, dislikes: 0 }, views: 0, userId: 1 }));
    }
    navigate('/');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Category</InputLabel>
        <Select value={category} onChange={(e) => setCategory(e.target.value)} required>
          <MenuItem value="Technology">Technology</MenuItem>
          <MenuItem value="Travel">Travel</MenuItem>
          <MenuItem value="Food">Food</MenuItem>
          <MenuItem value="Lifestyle">Lifestyle</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <CKEditor
          editor={ClassicEditor}
          data={body}
          onChange={(event, editor) => {
            const data = editor.getData();
            setBody(data);
          }}
        />
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        {id ? 'Update Blog' : 'Create Blog'}
      </Button>
    </Box>
  );
};

export default CreateEditBlog;
