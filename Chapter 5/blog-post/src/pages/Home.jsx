// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { firestoreService } from '../services/fireStoreService';
import PostCard from '../components/PostCard';
import { useAuth } from '../contexts/AuthContext';
import { staticPosts } from '../data/staticPosts';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        // Get dynamic posts from Firestore
        const { posts: firestorePosts, error } = await firestoreService.posts.getAll();
        if (error) {
          setError(error);
        } else {
          // Combine static posts with Firestore posts, with new posts at the top
          const allPosts = [...firestorePosts, ...staticPosts].sort((a, b) => {
            const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
            const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
            return dateB - dateA; // Most recent first
          });
          setPosts(allPosts);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();

    // Set up real-time listener for new posts
    const unsubscribe = firestoreService.posts.onSnapshot((firestorePosts) => {
      // Combine with static posts, newest first
      const allPosts = [...firestorePosts, ...staticPosts].sort((a, b) => {
        const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
        const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
        return dateB - dateA;
      });
      setPosts(allPosts);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

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
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error loading posts: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to BlogPlatform</h1>
            <p className="text-gray-600">Discover and read amazing stories from our community</p>
            <p className="text-sm text-gray-500 mt-1">
              Showing {posts.length} posts • New posts appear at the top
            </p>
          </div>
          {user && (
            <Link
              to="/create-post"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Create New Post
            </Link>
          )}
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-gray-100 rounded-lg p-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No posts yet</h2>
            <p className="text-gray-500 mb-4">Be the first to create a blog post!</p>
            {user && (
              <Link
                to="/create-post"
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Create Your First Post
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;