// src/routes.jsx
import { Route, Routes } from 'react-router';
import { Home, CreatePost,EditPost,PostDetail,SearchResults,UserProfile } from './pages/index';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Home page - lists all blog posts */}
      <Route path='/' element={<Home />} />
      
      {/* Search results page */}
      <Route path='/search' element={<SearchResults />} />
      
      {/* Individual post view with nested route for comments */}
      <Route path='/post/:id' element={<PostDetail />}>
        <Route path='comments' element={<div>Comments section focus</div>} />
      </Route>
      
      {/* Create new post (protected by authentication check in App.jsx) */}
      <Route path='/create-post' element={<CreatePost />} />
      
      {/* Edit existing post (protected by authentication check in App.jsx) */}
      <Route path='/edit-post/:id' element={<EditPost />} />
      
      {/* User profile page (protected by authentication check in App.jsx) */}
      <Route path='/profile' element={<UserProfile />} />
      
      {/* Fallback route - redirect to home */}
      <Route path='*' element={<Home />} />
    </Routes>
  );
};

export default AppRoutes;