import { Link, Navigate, NavLink } from "react-router-dom";
import { Home, LogOut } from "lucide-react";
import { useState } from "react";

const NavBar = () => {
  const [user, setUser] = useState("");
  const handleLogout = () => {
    setUser(null);
    Navigate('/login');
  };
  return (
    <nav className="bg-linear-to-r from-indigo-600 to-blue-500 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">


          <NavLink
            to="/"
            className="flex items-center gap-2 font-bold text-xl hover:opacity-90"
          >
            <Home className="w-6 h-6" />
            <span>HMS</span>
          </NavLink>


          <div className="flex space-x-2">

          </div>
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-indigo-100">Welcome, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-4 py-2 rounded-md bg-indigo-700 hover:bg-indigo-800 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-white text-indigo-600 px-6 py-2 rounded-md hover:bg-gray-100 transition-colors font-medium"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
