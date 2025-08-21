import React from 'react';

const TuesdayLayout: React.FC = () => {
  return (
    <div className="tuesday-layout min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-teal-800 mb-4">Tuesday Creativity</h1>
          <p className="text-xl text-teal-600">Build momentum and explore new ideas</p>
        </header>

        {/* Main Content - Creative Flow */}
        <div className="max-w-6xl mx-auto">
          {/* Inspiration Section */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border-l-4 border-emerald-500">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Today's Inspiration</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-emerald-100 to-teal-100 p-4 rounded-xl">
                  <h3 className="font-semibold text-emerald-800">Creative Challenge</h3>
                  <p className="text-emerald-700">Design a solution that makes someone's day better</p>
                </div>
                <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-4 rounded-xl">
                  <h3 className="font-semibold text-blue-800">Collaboration</h3>
                  <p className="text-blue-700">Reach out to a colleague with a new perspective</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-xl">
                  <h3 className="font-semibold text-purple-800">Learning</h3>
                  <p className="text-purple-700">Explore a new skill or technology</p>
                </div>
                <div className="bg-gradient-to-r from-orange-100 to-red-100 p-4 rounded-xl">
                  <h3 className="font-semibold text-orange-800">Innovation</h3>
                  <p className="text-orange-700">Question one assumption in your work</p>
                </div>
              </div>
            </div>
          </div>

          {/* Progress & Ideas Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Ideas Board */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-teal-500">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Ideas Board</h3>
              <div className="space-y-3">
                <div className="bg-yellow-50 p-3 rounded-lg border-l-3 border-yellow-400">
                  <p className="text-sm text-gray-700">Automate repetitive tasks</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg border-l-3 border-green-400">
                  <p className="text-sm text-gray-700">Improve user experience</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg border-l-3 border-blue-400">
                  <p className="text-sm text-gray-700">Optimize workflow</p>
                </div>
              </div>
            </div>

            {/* Collaboration Hub */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-emerald-500">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Collaboration Hub</h3>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <p className="text-gray-700 font-medium">Team Sync</p>
                <p className="text-sm text-gray-500 mt-2">Share progress and insights</p>
              </div>
            </div>

            {/* Creative Metrics */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-teal-500">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Creative Metrics</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Innovation</span>
                    <span className="text-sm text-gray-600">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-teal-500 h-2 rounded-full w-4/5"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Collaboration</span>
                    <span className="text-sm text-gray-600">92%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full w-11/12"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Learning</span>
                    <span className="text-sm text-gray-600">78%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-teal-500 h-2 rounded-full w-4/5"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Creative Quote */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-teal-500 to-emerald-600 rounded-2xl p-8 text-white">
              <h3 className="text-3xl font-bold mb-4">"Creativity is intelligence having fun."</h3>
              <p className="text-xl opacity-90">- Albert Einstein</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TuesdayLayout;
