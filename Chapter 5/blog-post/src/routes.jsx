import { Route, Routes } from 'react-router';
import { Home, CreatePost,EditPost,PostDetail,UserProfile } from './pages/index';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/post/:id' element={<PostDetail />}>
        <Route path='comments' element={<div>Comments section focus</div>} />
      </Route>
      
      <Route path='/create-post' element={<CreatePost />} />
      
      <Route path='/edit-post/:id' element={<EditPost />} />
      
      {/* User profile page (protected by authentication check in App.jsx) */}
      <Route path='/profile' element={<UserProfile />} />
      
      {/* Fallback route - redirect to home */}
      <Route path='*' element={<Home />} />
    </Routes>
  );
};

export default AppRoutes;