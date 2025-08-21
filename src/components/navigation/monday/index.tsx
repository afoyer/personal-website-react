import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, User, Target, TrendingUp, Calendar } from "lucide-react";

function MondayNavigation() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <div className="nav-brand">
            <Link
              to="/"
              className="flex items-center space-x-2 text-white hover:text-blue-100 transition-colors"
            >
              <Target size={24} className="text-blue-200" />
              <span className="text-xl font-bold">Monday Momentum</span>
            </Link>
          </div>

          {/* Day Indicator */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-blue-500/20 px-4 py-2 rounded-full border border-blue-300/30">
              <Calendar size={20} className="text-blue-200" />
              <span className="text-blue-100 font-medium">Monday</span>
            </div>
          </div>

          {/* Navigation Links */}
          <ul className="nav-links flex items-center space-x-6">
            <li>
              <Link
                to="/"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/")
                    ? "bg-blue-500/30 text-white"
                    : "text-blue-100 hover:text-white hover:bg-blue-500/20"
                }`}
              >
                <Home size={20} />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/about")
                    ? "bg-blue-500/30 text-white"
                    : "text-blue-100 hover:text-white hover:bg-blue-500/20"
                }`}
              >
                <TrendingUp size={20} />
                <span>Goals</span>
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/profile")
                    ? "bg-blue-500/30 text-white"
                    : "text-blue-100 hover:text-white hover:bg-blue-500/20"
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

export default MondayNavigation;
