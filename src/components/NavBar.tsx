
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Home, Book, Heart, Settings, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { logout } from '@/services/auth';
import { useToast } from '@/hooks/use-toast';
import VerificationStatus from '@/components/VerificationStatus';

const NavBar: React.FC = () => {
  const { user, userData } = useAuth();
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      // Navigate to login page after logout
      navigate('/login');
      // Force a page refresh to ensure all user state is cleared
      window.location.reload();
    }
  };

  return (
    <nav className="bg-white shadow-sm w-full py-3 px-4 sm:px-6 lg:px-8 mb-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold text-blue-600">
            InstaHealth
          </Link>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className={`hidden md:flex ${user ? 'space-x-2' : 'space-x-4'}`}>
            <Link 
              to="/" 
              className={`px-2 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/' 
                  ? 'text-blue-700 bg-blue-50'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Home className="h-4 w-4 inline" />
              <span className="ml-1">Home</span>
            </Link>
            <Link 
              to="/home" 
              className={`px-2 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/home' 
                  ? 'text-blue-700 bg-blue-50'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span>Analysis</span>
            </Link>
            <Link 
              to="/resources" 
              className={`px-2 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/resources' 
                  ? 'text-blue-700 bg-blue-50'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Book className="h-4 w-4 inline" />
              <span className="ml-1">Resources</span>
            </Link>
            <Link 
              to="/health-plan" 
              className={`px-2 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/health-plan' 
                  ? 'text-blue-700 bg-blue-50'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Heart className="h-4 w-4 inline" />
              <span className="ml-1">Health</span>
            </Link>
            <Link 
              to="/request-service" 
              className={`px-2 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/request-service' 
                  ? 'text-blue-700 bg-blue-50'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span>Services</span>
            </Link>
            <Link 
              to="/accessibility" 
              className={`px-2 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/accessibility' 
                  ? 'text-blue-700 bg-blue-50'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Settings className="h-4 w-4 inline" />
              <span className="ml-1">Access</span>
            </Link>
            <Link 
              to="/ai-chatbot" 
              className={`px-2 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/ai-chatbot' 
                  ? 'text-blue-700 bg-blue-50'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Bot className="h-4 w-4 inline" />
              <span className="ml-1">AI Chat</span>
            </Link>
          </div>
          
          {user ? (
            <div className="flex items-center space-x-2">
              <VerificationStatus />
              <span className="text-sm text-gray-600 hidden sm:inline">
                {userData?.email}
              </span>
              <Button variant="outline" size="sm" className="border-blue-200 text-blue-700">
                Logged in
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout} className="border-blue-200 text-blue-700">
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/login">
                <Button variant="outline" size="sm" className="border-blue-200 text-blue-700">
                  Login
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
