import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, Home } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(false)
  // Read user from localStorage


  const handleLogout = () => {
    navigate("/login");
  };


  return (
    <nav className="bg-linear-to-r from-indigo-600 to-blue-500 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Home className="w-6 h-6" />
            <span className="font-bold text-xl">HMS</span>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-indigo-700 rounded-md"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-4">


            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 px-4 py-2 bg-indigo-700 rounded-md hover:bg-indigo-800"
              >
                <LogOut size={16} />
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-white text-indigo-600 px-4 py-2 rounded-md font-medium"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-indigo-500">


            {user && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-2 py-2 w-full hover:bg-indigo-700 rounded-md"
              >
                <LogOut size={18} />
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
