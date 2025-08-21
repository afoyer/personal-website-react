import React from 'react';

const ThursdayLayout: React.FC = () => {
  return (
    <div className="thursday-layout min-h-screen bg-gradient-to-br from-purple-50 to-violet-100">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-violet-800 mb-4">Thursday Thrive</h1>
          <p className="text-xl text-violet-600">Build momentum and execute with precision</p>
        </header>

        {/* Main Content - Execution & Momentum */}
        <div className="max-w-7xl mx-auto">
          {/* Momentum Tracker */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border-l-4 border-purple-500">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Momentum Tracker</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-violet-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">🚀</span>
                </div>
                <h3 className="font-semibold text-purple-800 mb-2">Launch</h3>
                <p className="text-sm text-gray-600">Projects initiated</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-violet-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">⚡</span>
                </div>
                <h3 className="font-semibold text-violet-800 mb-2">Accelerate</h3>
                <p className="text-sm text-gray-600">Speed up progress</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">🎯</span>
                </div>
                <h3 className="font-semibold text-indigo-800 mb-2">Target</h3>
                <p className="text-sm text-gray-600">Focus on goals</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">🏆</span>
                </div>
                <h3 className="font-semibold text-blue-800 mb-2">Achieve</h3>
                <p className="text-sm text-gray-600">Complete tasks</p>
              </div>
            </div>
          </div>

          {/* Execution Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Task Execution */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-violet-500">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Task Execution</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <span className="text-gray-700">Complete project review</span>
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-violet-50 rounded-lg">
                  <span className="text-gray-700">Prepare presentation</span>
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">→</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg">
                  <span className="text-gray-700">Team coordination</span>
                  <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">!</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-gray-700">Finalize deliverables</span>
                  <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">○</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Performance Metrics</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">Productivity</span>
                    <span className="text-gray-600">87%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-purple-500 h-3 rounded-full w-11/12"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">Focus Time</span>
                    <span className="text-gray-600">6.5h</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-violet-500 h-3 rounded-full w-4/5"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">Task Completion</span>
                    <span className="text-gray-600">92%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-indigo-500 h-3 rounded-full w-11/12"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Items */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-l-4 border-indigo-500">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Today's Action Items</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-purple-100 to-violet-100 p-4 rounded-xl">
                <h4 className="font-semibold text-purple-800 mb-2">High Priority</h4>
                <ul className="space-y-2 text-sm text-purple-700">
                  <li>• Finalize quarterly report</li>
                  <li>• Review team performance</li>
                  <li>• Prepare Friday presentation</li>
                </ul>
              </div>
              <div className="bg-gradient-to-r from-violet-100 to-indigo-100 p-4 rounded-xl">
                <h4 className="font-semibold text-violet-800 mb-2">Medium Priority</h4>
                <ul className="space-y-2 text-sm text-violet-700">
                  <li>• Update project timeline</li>
                  <li>• Schedule next week meetings</li>
                  <li>• Review feedback</li>
                </ul>
              </div>
              <div className="bg-gradient-to-r from-indigo-100 to-blue-100 p-4 rounded-xl">
                <h4 className="font-semibold text-indigo-800 mb-2">Low Priority</h4>
                <ul className="space-y-2 text-sm text-indigo-700">
                  <li>• Organize workspace</li>
                  <li>• Update documentation</li>
                  <li>• Plan weekend activities</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Motivation Quote */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-purple-500 to-violet-600 rounded-2xl p-8 text-white">
              <h3 className="text-3xl font-bold mb-4">"Success is not final, failure is not fatal: it is the courage to continue that counts."</h3>
              <p className="text-xl opacity-90">- Winston Churchill</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThursdayLayout;
