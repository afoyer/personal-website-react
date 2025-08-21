import React from 'react';

const FridayLayout: React.FC = () => {
  return (
    <div className="friday-layout min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-emerald-800 mb-4">Friday Finish</h1>
          <p className="text-xl text-emerald-600">Complete, celebrate, and prepare for the weekend</p>
        </header>

        {/* Main Content - Completion & Celebration */}
        <div className="max-w-7xl mx-auto">
          {/* Week Completion Overview */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border-l-4 border-green-500">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Week Completion Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, index) => (
                <div key={day} className="text-center">
                  <div className={`w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center ${
                    index < 4 ? 'bg-gradient-to-br from-green-400 to-emerald-500' : 'bg-gradient-to-br from-emerald-400 to-green-500'
                  }`}>
                    <span className="text-white font-bold">{index < 4 ? '✓' : '🎯'}</span>
                  </div>
                  <p className="font-semibold text-gray-800">{day}</p>
                  <p className="text-sm text-gray-600">{index < 4 ? 'Complete' : 'In Progress'}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Achievement Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Completed Tasks */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-emerald-500">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Completed This Week</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <p className="text-gray-700 font-medium">Project proposal finalized</p>
                    <p className="text-sm text-gray-500">Monday</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <p className="text-gray-700 font-medium">Team collaboration session</p>
                    <p className="text-sm text-gray-500">Tuesday</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <p className="text-gray-700 font-medium">Midweek review completed</p>
                    <p className="text-sm text-gray-500">Wednesday</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <p className="text-gray-700 font-medium">Performance metrics updated</p>
                    <p className="text-sm text-gray-500">Thursday</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Weekend Preparation */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Weekend Preparation</h3>
              <div className="space-y-4">
                <div className="bg-emerald-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-emerald-800 mb-2">Next Week Preview</h4>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li>• Monday team meeting</li>
                    <li>• New project kickoff</li>
                    <li>• Quarterly planning session</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Weekend Activities</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Rest and recharge</li>
                    <li>• Personal projects</li>
                    <li>• Family time</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Celebration & Gratitude */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-l-4 border-emerald-500">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Celebration & Gratitude</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-3xl">🎉</span>
                </div>
                <h4 className="font-semibold text-green-800 mb-2">Celebrate Wins</h4>
                <p className="text-sm text-gray-600">Acknowledge your achievements</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-3xl">🙏</span>
                </div>
                <h4 className="font-semibold text-emerald-800 mb-2">Express Gratitude</h4>
                <p className="text-sm text-gray-600">Thank those who helped</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-teal-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-3xl">🌟</span>
                </div>
                <h4 className="font-semibold text-green-800 mb-2">Set Intentions</h4>
                <p className="text-sm text-gray-600">Plan for next week</p>
              </div>
            </div>
          </div>

          {/* Weekly Stats */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-l-4 border-green-500">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Weekly Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">24</div>
                <p className="text-sm text-gray-600">Tasks Completed</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-2">32h</div>
                <p className="text-sm text-gray-600">Focus Time</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">8</div>
                <p className="text-sm text-gray-600">Meetings Attended</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-2">95%</div>
                <p className="text-sm text-gray-600">Goal Achievement</p>
              </div>
            </div>
          </div>

          {/* Celebration Quote */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white">
              <h3 className="text-3xl font-bold mb-4">"Success is not the key to happiness. Happiness is the key to success."</h3>
              <p className="text-xl opacity-90">- Albert Schweitzer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FridayLayout;
