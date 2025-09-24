import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router';
import { firestoreService } from '../services/fireStoreService';
import PostCard from '../components/PostCard';
import { useAuth } from '../contexts/AuthContext';
import { staticPosts } from '../data/staticPosts';

const Home = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const { user } = useAuth()

  const fetchPosts = async () => {
      setLoading(true)
      try {
        const { posts: firestorePosts, error } = await firestoreService.posts.getAll();
        if (error) {
          setError(error);
        } else {
          const allPosts = [...firestorePosts, ...staticPosts].sort((a, b) => {
            const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt)
            const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt)
            return dateB - dateA
          })
          setPosts(allPosts)
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

  useEffect(() => {
    fetchPosts()
    const unsubscribe = firestoreService.posts.onSnapshot((firestorePosts) => {
      const allPosts = [...firestorePosts, ...staticPosts].sort((a, b) => {
        const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt)
        const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt)
        return dateB - dateA
      })
      setPosts(allPosts)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])


  const filteredPosts = useMemo(() => {
    let filtered = posts

    if (searchQuery.trim()) {
      const searchTerm = searchQuery.toLowerCase()
      filtered = filtered.filter(post => {
        const titleMatch = post.title.toLowerCase().includes(searchTerm)
        const contentMatch = post.content.toLowerCase().includes(searchTerm)
        const authorMatch = post.authorName?.toLowerCase().includes(searchTerm)
        const tagMatch = post.tags?.some(tag => 
          tag.toLowerCase().includes(searchTerm)
        )
        
        return titleMatch || contentMatch || authorMatch || tagMatch
      })
    }


    if (searchQuery.trim()) {
      const searchTerm = searchQuery.toLowerCase()
      filtered.sort((a, b) => {
        const aTitle = a.title.toLowerCase().includes(searchTerm)
        const bTitle = b.title.toLowerCase().includes(searchTerm)
        
        if (aTitle && !bTitle) return -1
        if (!aTitle && bTitle) return 1
        
        const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt)
        const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt)
        return dateB - dateA
      });
    }

    return filtered
  }, [posts, searchQuery])

  const clearFilters = () => {
    setSearchQuery('');
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
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error loading posts: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to BlogPlatform</h1>
            <p className="text-gray-600">Discover and read amazing stories from our community</p>
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

          <div className="lg:col-span-2 mb-10">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              Search posts
            </label>
            <div className="relative">
              <input
                id="search"
                type="text"
                placeholder="Search by title, content, author, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}

        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-600">
              Showing {filteredPosts.length} of {posts.length} posts
            </span>
          
          </div>

        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-gray-100 rounded-lg p-8">
            {posts.length === 0 ? (
              <>
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
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-gray-700 mb-2">No posts match your filters</h2>
                <p className="text-gray-500 mb-4">
                  Try adjusting your search terms or category filter.
                </p>
                <button
                  onClick={clearFilters}
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  Clear Filters
                </button>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <div key={post.id} className="relative">
              <PostCard post={post} />
              {post.isStatic && (
                <div className="absolute top-2 left-2">
                  <span className="bg-white text-white px-2 py-1 rounded text-xs">
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Home