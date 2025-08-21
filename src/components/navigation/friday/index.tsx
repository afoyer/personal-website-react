import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, User, Trophy, PartyPopper, Calendar } from "lucide-react";

function FridayNavigation() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-green-600 to-emerald-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <div className="nav-brand">
            <Link
              to="/"
              className="flex items-center space-x-2 text-white hover:text-green-100 transition-colors"
            >
              <Trophy size={24} className="text-green-200" />
              <span className="text-xl font-bold">Friday Finish</span>
            </Link>
          </div>

          {/* Day Indicator */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-green-500/20 px-4 py-2 rounded-full border border-green-300/30">
              <Calendar size={20} className="text-green-200" />
              <span className="text-green-100 font-medium">Friday</span>
            </div>
          </div>

          {/* Navigation Links */}
          <ul className="nav-links flex items-center space-x-6">
            <li>
              <Link
                to="/"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/")
                    ? "bg-green-500/30 text-white"
                    : "text-green-100 hover:text-white hover:bg-green-500/20"
                }`}
              >
                <Home size={20} />
                <span>Complete</span>
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/about")
                    ? "bg-green-500/30 text-white"
                    : "text-green-100 hover:text-white hover:bg-green-500/20"
                }`}
              >
                <PartyPopper size={20} />
                <span>Celebrate</span>
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/profile")
                    ? "bg-green-500/30 text-white"
                    : "text-green-100 hover:text-white hover:bg-green-500/20"
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

export default FridayNavigation;
