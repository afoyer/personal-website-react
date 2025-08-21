import React from 'react';

const SundayLayout: React.FC = () => {
  return (
    <div className="sunday-layout min-h-screen bg-gradient-to-br from-sky-50 to-blue-100">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-blue-800 mb-4">Sunday Sanctuary</h1>
          <p className="text-xl text-blue-600">Prepare, reflect, and set intentions for the week ahead</p>
        </header>

        {/* Main Content - Preparation & Renewal */}
        <div className="max-w-7xl mx-auto">
          {/* Week Preparation Overview */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border-l-4 border-sky-500">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Week Preparation Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-sky-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-3xl">🧘</span>
                </div>
                <h3 className="font-semibold text-sky-800 mb-2">Mindset</h3>
                <p className="text-sm text-gray-600">Prepare mentally</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-sky-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-3xl">📋</span>
                </div>
                <h3 className="font-semibold text-blue-800 mb-2">Planning</h3>
                <p className="text-sm text-gray-600">Organize tasks</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-3xl">🏠</span>
                </div>
                <h3 className="font-semibold text-indigo-800 mb-2">Environment</h3>
                <p className="text-sm text-gray-600">Set up space</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-sky-400 to-indigo-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-3xl">💪</span>
                </div>
                <h3 className="font-semibold text-sky-800 mb-2">Energy</h3>
                <p className="text-sm text-gray-600">Rest and recharge</p>
              </div>
            </div>
          </div>

          {/* Preparation Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Weekly Planning */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Weekly Planning</h3>
              <div className="space-y-4">
                <div className="bg-sky-50 p-4 rounded-lg border-l-3 border-sky-400">
                  <h4 className="font-semibold text-sky-800 mb-2">Monday</h4>
                  <p className="text-sm text-gray-700">Team meeting, project kickoff</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border-l-3 border-blue-400">
                  <h4 className="font-semibold text-blue-800 mb-2">Tuesday</h4>
                  <p className="text-sm text-gray-700">Creative session, collaboration</p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg border-l-3 border-indigo-400">
                  <h4 className="font-semibold text-indigo-800 mb-2">Wednesday</h4>
                  <p className="text-sm text-gray-700">Midweek review, adjustments</p>
                </div>
                <div className="bg-sky-50 p-4 rounded-lg border-l-3 border-sky-400">
                  <h4 className="font-semibold text-sky-800 mb-2">Thursday</h4>
                  <p className="text-sm text-gray-700">Execution, progress tracking</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border-l-3 border-blue-400">
                  <h4 className="font-semibold text-blue-800 mb-2">Friday</h4>
                  <p className="text-sm text-gray-700">Completion, celebration</p>
                </div>
              </div>
            </div>

            {/* Personal Preparation */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-sky-500">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Personal Preparation</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Sleep Schedule</span>
                  <div className="w-24 bg-gray-200 rounded-full h-3">
                    <div className="bg-sky-500 h-3 rounded-full w-4/5"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Meal Planning</span>
                  <div className="w-24 bg-gray-200 rounded-full h-3">
                    <div className="bg-blue-500 h-3 rounded-full w-3/5"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Exercise Plan</span>
                  <div className="w-24 bg-gray-200 rounded-full h-3">
                    <div className="bg-indigo-500 h-3 rounded-full w-4/5"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Mindfulness</span>
                  <div className="w-24 bg-gray-200 rounded-full h-3">
                    <div className="bg-sky-500 h-3 rounded-full w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Intentions & Goals */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-l-4 border-blue-500">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Intentions & Goals</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-sky-100 to-blue-100 p-4 rounded-xl">
                <h4 className="font-semibold text-sky-800 mb-2">Professional</h4>
                <ul className="space-y-2 text-sm text-sky-700">
                  <li>• Complete project milestones</li>
                  <li>• Improve team collaboration</li>
                  <li>• Learn new skills</li>
                  <li>• Network effectively</li>
                </ul>
              </div>
              <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-4 rounded-xl">
                <h4 className="font-semibold text-blue-800 mb-2">Personal</h4>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li>• Maintain work-life balance</li>
                  <li>• Practice self-care</li>
                  <li>• Pursue hobbies</li>
                  <li>• Build relationships</li>
                </ul>
              </div>
              <div className="bg-gradient-to-r from-indigo-100 to-sky-100 p-4 rounded-xl">
                <h4 className="font-semibold text-indigo-800 mb-2">Health & Wellness</h4>
                <ul className="space-y-2 text-sm text-indigo-700">
                  <li>• Exercise regularly</li>
                  <li>• Eat nutritious meals</li>
                  <li>• Get adequate sleep</li>
                  <li>• Manage stress</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Reflection & Gratitude */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-l-4 border-sky-500">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Reflection & Gratitude</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="bg-sky-50 p-4 rounded-lg">
                  <p className="text-gray-700 font-medium">What am I grateful for from last week?</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-gray-700 font-medium">What challenges did I overcome?</p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <p className="text-gray-700 font-medium">What am I looking forward to this week?</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="bg-sky-50 p-4 rounded-lg">
                  <p className="text-gray-700 font-medium">How can I be more present?</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-gray-700 font-medium">What support do I need?</p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <p className="text-gray-700 font-medium">How can I help others?</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sanctuary Quote */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl p-8 text-white">
              <h3 className="text-3xl font-bold mb-4">"The future belongs to those who believe in the beauty of their dreams."</h3>
              <p className="text-xl opacity-90">- Eleanor Roosevelt</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SundayLayout;
