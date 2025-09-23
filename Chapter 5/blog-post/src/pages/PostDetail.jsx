// src/pages/PostDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, Outlet } from 'react-router';
import { firestoreService } from '../services/fireStoreService';
import { useAuth } from '../contexts/AuthContext';
import CommentSection from '../components/CommentSection';
import { staticPosts, staticComments } from '../data/staticPosts';

const PostDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        // First check if it's a static post
        const staticPost = staticPosts.find(p => p.id === id);
        if (staticPost) {
          setPost(staticPost);
          setLoading(false);
          return;
        }

        // If not static, fetch from Firestore
        const { post, error } = await firestoreService.posts.getById(id);
        if (error) {
          setError(error);
        } else {
          setPost(post);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    // Prevent deletion of static posts
    if (post?.isStatic) {
      alert('Cannot delete static posts');
      return;
    }

    if (window.confirm('Are you sure you want to delete this post?')) {
      const { error } = await firestoreService.posts.delete(id);
      if (!error) {
        navigate('/');
      } else {
        alert('Error deleting post: ' + error);
      }
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error || 'Post not found'}
        </div>
        <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
          ← Back to Home
        </Link>
      </div>
    );
  }

  const isAuthor = user && user.uid === post.authorId;
  const canEdit = isAuthor && !post.isStatic; // Can't edit static posts

  return (
    <div className="max-w-4xl mx-auto">
      {/* Navigation */}
      <div className="mb-6">
        <Link to="/" className="text-blue-600 hover:underline">
          ← Back to Posts
        </Link>
      </div>

      {/* Post Content */}
      <article className="bg-white rounded-lg shadow-md p-8 mb-8">
        {/* Post Header */}
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
          
          <div className="flex justify-between items-start">
            <div className="text-gray-600">
              <p className="mb-1">By {post.authorName || 'Anonymous'}</p>
              <p className="text-sm">
                Published on {formatDate(post.createdAt)}
                {post.updatedAt && post.updatedAt !== post.createdAt && (
                  <span> • Updated {formatDate(post.updatedAt)}</span>
                )}
              </p>
              {post.isStatic && (
                <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs mt-2">
                  Featured Post
                </span>
              )}
            </div>
            
            {canEdit && (
              <div className="flex space-x-2">
                <Link
                  to={`/edit-post/${post.id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm"
                >
                  Edit
                </Link>
                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors text-sm"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Post Content */}
        <div className="prose max-w-none">
          <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
            {post.content}
          </div>
        </div>
      </article>

      {/* Nested Route Outlet (for comments) */}
      <Outlet />

      {/* Comments Section */}
      <CommentSection postId={id} isStatic={post.isStatic} />
    </div>
  );
};

export default PostDetail;