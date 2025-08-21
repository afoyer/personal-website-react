import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, User, Brain, Scale } from "lucide-react";

function WednesdayNavigation() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-amber-600 to-orange-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <div className="nav-brand">
            <Link
              to="/"
              className="flex items-center space-x-2 text-white hover:text-amber-100 transition-colors"
            >
              <Brain size={24} className="text-amber-200" />
              <span className="text-xl font-bold">Wednesday Wisdom</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <ul className="nav-links flex items-center space-x-6">
            <li>
              <Link
                to="/"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/")
                    ? "bg-amber-500/30 text-white"
                    : "text-amber-100 hover:text-white hover:bg-amber-500/20"
                }`}
              >
                <Home size={20} />
                <span>Reflect</span>
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/about")
                    ? "bg-amber-500/30 text-white"
                    : "text-amber-100 hover:text-white hover:bg-amber-500/20"
                }`}
              >
                <Scale size={20} />
                <span>Balance</span>
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/profile")
                    ? "bg-amber-500/30 text-white"
                    : "text-amber-100 hover:text-white hover:bg-amber-500/20"
                }`}
              >
                <User size={20} />
                <span>Profile</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default WednesdayNavigation;
