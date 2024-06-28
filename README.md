### Blog App

A simple blogging platform built with React, Redux, and Material-UI. Users can browse, create, edit, and delete blog posts. The application supports category filtering and light/dark theme toggling.

## Features

- Browse all blog posts
- Filter blog posts by category
- Search for blog posts by title
- Create new blog posts
- Edit existing blog posts
- Delete blog posts
- Toggle between light and dark themes

## Components folder

# HomePage
Displays a list of blog posts with the ability to filter by category and search by title. Each blog post has an edit button to navigate to the edit page.

# NavBar
Provides navigation links and a search bar. Includes theme toggling functionality.

# BlogPage
Displays the full content of a single blog post.

# CreateEditBlog
Form for creating a new blog post or editing an existing one.

# CategoryPage
Displays blog posts filtered by a specific category.

## Redux folder 
# blogSlice
Manages the state of blog posts, including actions for adding, editing, and deleting posts.

# themeSlice
Manages the state of the application theme (light or dark).

# Dependent install or necessary packages:

``bash
npm install @mui/material @emotion/react @emotion/styled redux react-redux redux-thunk react-router-dom@6 @mui/icons-material
npm install @mui/material @emotion/react @emotion/styled redux react-redux @reduxjs/toolkit @mui/icons-material
npm install react-router-dom@6 @mui/icons-material @mui/icons-material @mui/lab
npm install --save @ckeditor/ckeditor5-react @ckeditor/ckeditor5-build-classic(opt)
npm install @ckeditor/ckeditor5-react @ckeditor/ckeditor5-build-classic
npm install @reduxjs/toolkit react-redux
npm install react-quill


