// src/pages/CreatePost.jsx
import React from 'react';
import { useNavigate } from 'react-router';
import PostForm from '../components/PostForm';
import { firestoreService } from '../services/fireStoreService';
import { useAuth } from '../contexts/AuthContext';

const CreatePost = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = async (postData) => {
    const { id, error } = await firestoreService.posts.create({
      ...postData,
      authorId: user.uid,
      authorName: user.displayName || user.email
    });

    if (error) {
      throw new Error(error);
    } else {
      navigate(`/post/${id}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Create New Post</h1>
        <p className="text-gray-600 mt-2">Share your thoughts with the community</p>
      </div>
     
      <PostForm
        onSubmit={handleSubmit}
        submitButtonText="Publish Post"
      />
    </div>
  );
};

export default CreatePost;