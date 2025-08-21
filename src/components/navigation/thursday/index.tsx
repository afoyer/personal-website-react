import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, User, Zap, BarChart3, Calendar } from "lucide-react";

function ThursdayNavigation() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-violet-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <div className="nav-brand">
            <Link
              to="/"
              className="flex items-center space-x-2 text-white hover:text-purple-100 transition-colors"
            >
              <Zap size={24} className="text-purple-200" />
              <span className="text-xl font-bold">Thursday Thrive</span>
            </Link>
          </div>

          {/* Day Indicator */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-purple-500/20 px-4 py-2 rounded-full border border-purple-300/30">
              <Calendar size={20} className="text-purple-200" />
              <span className="text-purple-100 font-medium">Thursday</span>
            </div>
          </div>

          {/* Navigation Links */}
          <ul className="nav-links flex items-center space-x-6">
            <li>
              <Link
                to="/"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/")
                    ? "bg-purple-500/30 text-white"
                    : "text-purple-100 hover:text-white hover:bg-purple-500/20"
                }`}
              >
                <Home size={20} />
                <span>Execute</span>
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/about")
                    ? "bg-purple-500/30 text-white"
                    : "text-purple-100 hover:text-white hover:bg-purple-500/20"
                }`}
              >
                <BarChart3 size={20} />
                <span>Progress</span>
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/profile")
                    ? "bg-purple-500/30 text-white"
                    : "text-purple-100 hover:text-white hover:bg-purple-500/20"
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

export default ThursdayNavigation;
