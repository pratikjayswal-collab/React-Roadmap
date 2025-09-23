// src/components/PostCard.jsx
import React from 'react';
import { Link } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

const PostCard = ({ post }) => {
  const { user } = useAuth();
  
  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow relative">
      <div className="p-6">
        {/* Post Title */}
        <Link to={`/post/${post.id}`}>
          <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
            {post.title}
          </h2>
        </Link>

        {/* Post Content Preview */}
        <p className="text-gray-600 mb-4">
          {truncateContent(post.content)}
        </p>

        {/* Post Metadata */}
        <div className="flex justify-between items-center text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <span>By {post.authorName || 'Anonymous'}</span>
            <span>•</span>
            <span>{formatDate(post.createdAt)}</span>
          </div>
          
          {user && user.uid === post.authorId && (
            <Link
              to={`/edit-post/${post.id}`}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Edit
            </Link>
          )}
        </div>

        {/* Tags (if available) */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Read More Button */}
        <div className="py-4 pb-8"> 
        <div className="absolute bottom-4">
          <Link
            to={`/post/${post.id}`}
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Read More
          </Link>
        </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;  