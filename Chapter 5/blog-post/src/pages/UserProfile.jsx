// src/pages/UserProfile.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { firestoreService } from '../services/fireStoreService';
import { updateProfile } from 'firebase/auth';
import PostCard from '../components/PostCard';

const UserProfile = () => {
  const { user } = useAuth();
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: user?.displayName || ''
  });
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!user) return;
      
      setLoading(true);
      const { posts, error } = await firestoreService.posts.getByUser(user.uid);
      if (error) {
        setError(error);
      } else {
        setUserPosts(posts);
      }
      setLoading(false);
    };

    fetchUserPosts();
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdating(true);
    
    try {
      await updateProfile(user, {
        displayName: profileData.displayName.trim()
      });
      
      setEditingProfile(false);
      setError(null);
    } catch (err) {
      setError('Failed to update profile: ' + err.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      const { error } = await firestoreService.posts.delete(postId);
      if (!error) {
        setUserPosts(prev => prev.filter(post => post.id !== postId));
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
      day: 'numeric'
    });
  };

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Please sign in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            {editingProfile ? (
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={profileData.displayName}
                    onChange={(e) => setProfileData(prev => ({
                      ...prev,
                      displayName: e.target.value
                    }))}
                    className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    disabled={updating}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
                  >
                    {updating ? 'Updating...' : 'Save'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingProfile(false);
                      setProfileData({ displayName: user.displayName || '' });
                    }}
                    className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {user.displayName || 'Anonymous User'}
                </h1>
                <p className="text-gray-600 mb-4">{user.email}</p>
                <div className="text-sm text-gray-500">
                  <p>Member since {formatDate(user.metadata?.creationTime)}</p>
                  <p className="mt-1">{userPosts.length} post{userPosts.length === 1 ? '' : 's'} published</p>
                </div>
              </>
            )}
          </div>
          
          {!editingProfile && (
            <button
              onClick={() => setEditingProfile(true)}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 transition-colors"
            >
              Edit Profile
            </button>
          )}
        </div>
        
        {error && (
          <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
      </div>

      {/* User Posts Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Your Posts</h2>
          <Link
            to="/create-post"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Create New Post
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            Error loading posts: {error}
          </div>
        ) : userPosts.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-lg p-8">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No posts yet</h3>
              <p className="text-gray-500 mb-4">Start sharing your thoughts with the community!</p>
              <Link
                to="/create-post"
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Create Your First Post
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {userPosts.map((post) => (
              <div key={post.id} className="relative">
                <PostCard post={post} />
                <div className="absolute top-2 right-2 flex space-x-1">
                  <Link
                    to={`/edit-post/${post.id}`}
                    className="bg-blue-600 text-white p-1 rounded text-xs hover:bg-blue-700 transition-colors"
                    title="Edit"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </Link>
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="bg-red-600 text-white p-1 rounded text-xs hover:bg-red-700 transition-colors"
                    title="Delete"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;