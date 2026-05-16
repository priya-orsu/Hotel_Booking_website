import { useState, useEffect } from 'react';
import { FiSearch, FiLogIn, FiUserPlus, FiMenu, FiX, FiUser, FiLogOut } from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get user from localStorage safely
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error("Error parsing user data:", err);
      localStorage.removeItem('currentUser');
    }
  }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const handleLogin = () => {
    setIsMenuOpen(false);
    navigate('/login');
  };

  const handleRegister = () => {
    setIsMenuOpen(false);
    navigate('/register');
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    setIsUserDropdownOpen(false);
    navigate('/');
  };

  // Click outside handler for dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isUserDropdownOpen && !e.target.closest('.user-dropdown-container')) {
        setIsUserDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isUserDropdownOpen]);

  return (
    <nav className="fixed w-full top-0 z-50 bg-gradient-to-r from-red-700 to-red-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and mobile menu button */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold text-white">VS Hotels</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <a
              href="/"
              className={`${location.pathname === '/' ? 'border-red-300' : 'border-transparent'} text-white hover:border-red-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
            >
              Home
            </a>
            <a
              href="/hotels"
              className={`${location.pathname === '/hotels' ? 'border-red-300' : 'border-transparent'} text-white hover:border-red-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
            >
              Hotels
            </a>
            <a
              href="/rooms"
              className={`${location.pathname === '/rooms' ? 'border-red-300' : 'border-transparent'} text-white hover:border-red-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
            >
              Rooms
            </a>
            <a
              href="/about"
              className={`${location.pathname === '/about' ? 'border-red-300' : 'border-transparent'} text-white hover:border-red-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
            >
              About
            </a>
          </div>

          {/* Search and Auth - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="mx-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search hotels..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>

            {user ? (
              <div className="relative user-dropdown-container">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsUserDropdownOpen(!isUserDropdownOpen);
                  }}
                  className="flex items-center space-x-2 text-white hover:text-red-200"
                >
                  <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center">
                    <FiUser className="h-5 w-5" />
                  </div>
                  <span className="font-medium">
                    {user.name || user.email?.split('@')[0]}
                  </span>
                </button>

                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <div className="flex items-center px-4 py-3 border-b border-gray-100">
                      <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center mr-3">
                        <FiUser className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {user.name || user.email?.split('@')[0]}
                        </p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700"
                    >
                      My Profile
                    </a>
                    <a
                      href="/bookings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700"
                    >
                      My Bookings
                    </a>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 flex items-center"
                    >
                      <FiLogOut className="mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={handleLogin}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <FiLogIn className="mr-2" />
                  Login
                </button>
                <button
                  onClick={handleRegister}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-red-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <FiUserPlus className="mr-2" />
                  Register
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-200 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors duration-200"
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <FiX className="block h-6 w-6" />
              ) : (
                <FiMenu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-red-800 transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <a
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className={`${location.pathname === '/' ? 'bg-red-900' : ''} text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-red-700 transition-colors`}
          >
            Home
          </a>
          <a
            href="/hotels"
            onClick={() => setIsMenuOpen(false)}
            className={`${location.pathname === '/hotels' ? 'bg-red-900' : ''} text-white hover:bg-red-700 block px-3 py-2 rounded-md text-base font-medium transition-colors`}
          >
            Hotels
          </a>
          <a
            href="/rooms"
            onClick={() => setIsMenuOpen(false)}
            className={`${location.pathname === '/rooms' ? 'bg-red-900' : ''} text-white hover:bg-red-700 block px-3 py-2 rounded-md text-base font-medium transition-colors`}
          >
            Rooms
          </a>
          <a
            href="/about"
            onClick={() => setIsMenuOpen(false)}
            className={`${location.pathname === '/about' ? 'bg-red-900' : ''} text-white hover:bg-red-700 block px-3 py-2 rounded-md text-base font-medium transition-colors`}
          >
            About
          </a>
        </div>

        <div className="px-2 pt-2 pb-3 border-t border-red-700">
          <div className="px-3 space-y-2">
            {user ? (
              <>
                <div className="flex items-center px-3 py-2 text-white">
                  <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center mr-2">
                    <FiUser className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">{user.name || user.email?.split('@')[0]}</p>
                    <p className="text-xs text-gray-300">{user.email}</p>
                  </div>
                </div>
                <a
                  href="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 text-gray-200 hover:bg-red-700 hover:text-white rounded-md text-base font-medium transition-colors"
                >
                  My Profile
                </a>
                <a
                  href="/bookings"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 text-gray-200 hover:bg-red-700 hover:text-white rounded-md text-base font-medium transition-colors"
                >
                  My Bookings
                </a>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-base font-medium rounded-md transition-colors"
                >
                  <FiLogOut className="mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    handleLogin();
                    setIsMenuOpen(false);
                  }}
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                >
                  <FiLogIn className="mr-2" />
                  Login
                </button>
                <button
                  onClick={() => {
                    handleRegister();
                    setIsMenuOpen(false);
                  }}
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-red-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                >
                  <FiUserPlus className="mr-2" />
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;