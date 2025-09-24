import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router';
import AppRoutes from './routes';
import { useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import AuthForm from './components/AuthForm';

const App = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {user ? (
          <>
            <Header />
            <main className="container mx-auto px-4 py-8">
              <AppRoutes />
            </main>
          </>
        ) : (
          <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Welcome to BlogPlatform</h1>
                <p className="text-gray-600 mt-2">Sign in to create and manage your blog posts</p>
              </div>
              <AuthForm
                isLogin={isLogin}
                onToggle={() => setIsLogin(!isLogin)}
              />
            </div>
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;