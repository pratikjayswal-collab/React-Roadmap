// src/pages/SearchResults.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router';
import { firestoreService } from '../services/fireStoreService';
import PostCard from '../components/PostCard';
import { staticPosts } from '../data/staticPosts';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const searchPosts = async () => {
      if (!query.trim()) {
        setResults([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        // Get dynamic posts from Firestore
        const { posts: firestorePosts, error } = await firestoreService.posts.getAll();
        if (error) {
          setError(error);
        } else {
          // Combine static and dynamic posts for searching
          const allPosts = [...firestorePosts, ...staticPosts];
          
          // Simple search implementation - searches in title, content, author, and tags
          const searchTerm = query.toLowerCase();
          const filteredPosts = allPosts.filter(post => {
            const titleMatch = post.title.toLowerCase().includes(searchTerm);
            const contentMatch = post.content.toLowerCase().includes(searchTerm);
            const authorMatch = post.authorName?.toLowerCase().includes(searchTerm);
            const tagMatch = post.tags?.some(tag => 
              tag.toLowerCase().includes(searchTerm)
            );
            
            return titleMatch || contentMatch || authorMatch || tagMatch;
          });
          
          // Sort results by relevance (title matches first, then by date)
          filteredPosts.sort((a, b) => {
            const aTitle = a.title.toLowerCase().includes(searchTerm);
            const bTitle = b.title.toLowerCase().includes(searchTerm);
            
            if (aTitle && !bTitle) return -1;
            if (!aTitle && bTitle) return 1;
            
            // If both or neither match title, sort by date
            const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
            const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
            return dateB - dateA;
          });
          
          setResults(filteredPosts);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    searchPosts();
  }, [query]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Searching for "{query}"...
          </h1>
        </div>
        <div className="flex justify-center items-center min-h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            Error searching posts: {error}
          </div>
          <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Search Header */}
      <div className="mb-8">
        <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
          ← Back to Home
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Search Results
        </h1>
        {query && (
          <p className="text-gray-600">
            {results.length > 0 
              ? `Found ${results.length} result${results.length === 1 ? '' : 's'} for "${query}"`
              : `No results found for "${query}"`
            }
          </p>
        )}
      </div>

      {/* Search Results */}
      {!query.trim() ? (
        <div className="text-center py-12">
          <div className="bg-gray-100 rounded-lg p-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No search query</h2>
            <p className="text-gray-500">Please enter a search term to find posts.</p>
          </div>
        </div>
      ) : results.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-gray-100 rounded-lg p-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No posts found</h2>
            <p className="text-gray-500 mb-4">
              Try different keywords or browse all posts instead.
            </p>
            <Link
              to="/"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              View All Posts
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Results count and sorting info */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800 text-sm">
              Showing {results.length} result{results.length === 1 ? '' : 's'} • 
              Results are sorted by relevance (title matches first, then by date)
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {results.map((post) => (
              <div key={post.id} className="relative">
                <PostCard post={post} />
                {post.isStatic && (
                  <div className="absolute top-2 left-2">
                    <span className="bg-gray-900 text-white px-2 py-1 rounded text-xs">
                      Featured
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Search Tips */}
      {query && results.length === 0 && (
        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Search Tips</h3>
          <ul className="text-blue-800 space-y-1">
            <li>• Try different or more general keywords</li>
            <li>• Check your spelling</li>
            <li>• Search for author names</li>
            <li>• Look for specific tags (e.g., "react", "javascript")</li>
            <li>• Use fewer words in your search</li>
            <li>• Try searching for partial words</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchResults;