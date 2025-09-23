// src/pages/EditPost.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import PostForm from '../components/PostForm';
import { firestoreService } from '../services/fireStoreService';
import { useAuth } from '../contexts/AuthContext';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const { post, error } = await firestoreService.posts.getById(id);
      if (error) {
        setError(error);
      } else if (!post) {
        setError('Post not found');
      } else if (post.authorId !== user.uid) {
        setError('You are not authorized to edit this post');
      } else {
        setPost(post);
      }
      setLoading(false);
    };

    fetchPost();
  }, [id, user.uid]);

  const handleSubmit = async (postData) => {
    const { error } = await firestoreService.posts.update(id, postData);
    
    if (error) {
      throw new Error(error);
    } else {
      navigate(`/post/${id}`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
        <Link to="/" className="text-blue-600 hover:underline">
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link to={`/post/${id}`} className="text-blue-600 hover:underline mb-4 inline-block">
          ← Back to Post
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Edit Post</h1>
        <p className="text-gray-600 mt-2">Update your blog post</p>
      </div>
      
      <PostForm
        initialData={post}
        onSubmit={handleSubmit}
        submitButtonText="Update Post"
      />
    </div>
  );
};

export default EditPost;