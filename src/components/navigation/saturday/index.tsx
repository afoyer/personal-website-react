import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, User, Heart, Sparkles, Calendar } from "lucide-react";

function SaturdayNavigation() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-pink-600 to-rose-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <div className="nav-brand">
            <Link
              to="/"
              className="flex items-center space-x-2 text-white hover:text-pink-100 transition-colors"
            >
              <Heart size={24} className="text-pink-200" />
              <span className="text-xl font-bold">Saturday Serenity</span>
            </Link>
          </div>

          {/* Day Indicator */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-pink-500/20 px-4 py-2 rounded-full border border-pink-300/30">
              <Calendar size={20} className="text-pink-200" />
              <span className="text-pink-100 font-medium">Saturday</span>
            </div>
          </div>

          {/* Navigation Links */}
          <ul className="nav-links flex items-center space-x-6">
            <li>
              <Link
                to="/"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/")
                    ? "bg-pink-500/30 text-white"
                    : "text-pink-100 hover:text-white hover:bg-pink-500/20"
                }`}
              >
                <Home size={20} />
                <span>Relax</span>
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/about")
                    ? "bg-pink-500/30 text-white"
                    : "text-pink-100 hover:text-white hover:bg-pink-500/20"
                }`}
              >
                <Sparkles size={20} />
                <span>Inspire</span>
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/profile")
                    ? "bg-pink-500/30 text-white"
                    : "text-pink-100 hover:text-white hover:bg-pink-500/20"
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

export default SaturdayNavigation;
