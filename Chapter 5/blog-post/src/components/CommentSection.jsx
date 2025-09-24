import React, { useState, useEffect } from 'react';
import { firestoreService } from '../services/fireStoreService';
import { useAuth } from '../contexts/AuthContext';
import { staticComments } from '../data/staticPosts';

const CommentSection = ({ postId, isStatic = false }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isStatic) {
      const postComments = staticComments[postId] || [];
      setComments(postComments);
      setLoading(false);
      return;
    }

    const unsubscribe = firestoreService.comments.onSnapshot(postId, (comments) => {
      setComments(comments);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [postId, isStatic]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    if (isStatic) {
      alert('Comments are disabled for featured posts');
      return;
    }

    setSubmitting(true);
    const commentData = {
      content: newComment.trim(),
      authorId: user.uid,
      authorName: user.displayName || user.email
    };

    const { error } = await firestoreService.comments.create(postId, commentData);
    if (!error) {
      setNewComment('');
    } else {
      alert('Error posting comment: ' + error);
    }
    setSubmitting(false);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        Comments ({comments.length})
      </h3>

      {user && !isStatic ? (
        <form onSubmit={handleSubmitComment} className="mb-8">
          <div className="mb-4">
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
              Add a comment
            </label>
            <textarea
              id="comment"
              rows="3"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={submitting || !newComment.trim()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {submitting ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      ) : !user ? (
        <div className="mb-8 p-4 bg-gray-100 rounded-lg">
          <p className="text-gray-600">Please sign in to leave a comment.</p>
        </div>
      ) : isStatic ? (
        <div className="mb-8 p-4 bg-blue-50 rounded-lg">
          <p className="text-blue-700">Comments are disabled for featured posts.</p>
        </div>
      ) : null}

      {loading ? (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="border-l-4 border-blue-200 pl-4 py-2">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900">
                    {comment.authorName || 'Anonymous'}
                  </span>
                  <span className="text-sm text-gray-500">
                    {formatDate(comment.createdAt)}
                  </span>
                  {comment.isStatic && (
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                      Featured
                    </span>
                  )}
                </div>
              </div>
              <p className="text-gray-800 whitespace-pre-wrap">{comment.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;