import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { User, LogOut } from "lucide-react";
import { useNavigate } from "react-router";

const Header = () => {
  const { user, signOut } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    setShowUserMenu(false);
  };

  const handleClick = () => { 
    navigate('/')
  }
  
  const handleProfile = () => { 
    navigate('/profile')
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2" onClick={handleClick} >
            <h1 className="text-2xl font-bold text-gray-900">BlogSpace</h1>
          </div>
          
          {user ? (
            <div className="relative flex items-center space-x-4 ">
              <button onClick={handleProfile} className="">Profile</button>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none"
              >
                <User className="h-5 w-5" />
                <span>{user.displayName || user.email}</span>
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <button
                    onClick={handleLogout}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-gray-500">Welcome to BlogSpace</div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;