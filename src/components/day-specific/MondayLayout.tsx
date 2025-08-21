import React from "react";

const MondayLayout: React.FC = () => {
  return (
    <div className="monday-layout min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/20 rounded-full blur-xl"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-indigo-200/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-blue-200/20 rounded-full blur-xl"></div>

      <div className="container mx-auto px-6 py-8 relative z-10">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-block p-6 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-blue-200/50">
            <h1 className="text-5xl font-bold text-indigo-800 mb-4">
              Monday Motivation
            </h1>
            <p className="text-xl text-indigo-600">
              Start your week with purpose and energy
            </p>
          </div>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Goals & Planning */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-blue-200/50 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full -translate-y-12 translate-x-12 opacity-60"></div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 relative z-10">
              Weekly Goals
            </h2>
            <div className="space-y-4 relative z-10">
              <div className="flex items-center space-x-3 group-hover:translate-x-2 transition-transform duration-300">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700">Complete project proposal</span>
              </div>
              <div className="flex items-center space-x-3 group-hover:translate-x-2 transition-transform duration-300">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Team meeting preparation</span>
              </div>
              <div className="flex items-center space-x-3 group-hover:translate-x-2 transition-transform duration-300">
                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-700">Review quarterly metrics</span>
              </div>
            </div>
          </div>

          {/* Center Column - Today's Focus */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-green-200/50 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-100 to-blue-100 rounded-full -translate-y-12 translate-x-12 opacity-60"></div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 relative z-10">
              Today's Focus
            </h2>
            <div className="text-center relative z-10">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <p className="text-gray-700 font-medium">Priority Task</p>
              <p className="text-sm text-gray-500 mt-2">
                Focus on one major accomplishment today
              </p>
            </div>
          </div>

          {/* Right Column - Energy & Wellness */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-purple-200/50 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full -translate-y-12 translate-x-12 opacity-60"></div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 relative z-10">
              Energy Boost
            </h2>
            <div className="space-y-3 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Hydration</span>
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full w-3/4"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Movement</span>
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full w-1/2"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Focus</span>
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full w-4/5"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Motivation */}
        <div className="mt-12 text-center relative z-10">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
            <h3 className="text-3xl font-bold mb-4 relative z-10">
              "The future depends on what you do today."
            </h3>
            <p className="text-xl opacity-90 relative z-10">- Mahatma Gandhi</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MondayLayout;
