import React from 'react';

const SaturdayLayout: React.FC = () => {
  return (
    <div className="saturday-layout min-h-screen bg-gradient-to-br from-pink-50 to-rose-100">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-rose-800 mb-4">Saturday Serenity</h1>
          <p className="text-xl text-rose-600">Relax, recharge, and pursue personal passions</p>
        </header>

        {/* Main Content - Relaxation & Personal Growth */}
        <div className="max-w-7xl mx-auto">
          {/* Weekend Mood */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border-l-4 border-pink-500">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Weekend Mood</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-3xl">😌</span>
                </div>
                <h3 className="font-semibold text-pink-800 mb-2">Relaxed</h3>
                <p className="text-sm text-gray-600">Take it easy</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-3xl">🎨</span>
                </div>
                <h3 className="font-semibold text-rose-800 mb-2">Creative</h3>
                <p className="text-sm text-gray-600">Express yourself</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-3xl">📚</span>
                </div>
                <h3 className="font-semibold text-purple-800 mb-2">Learning</h3>
                <p className="text-sm text-gray-600">Grow personally</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-3xl">💝</span>
                </div>
                <h3 className="font-semibold text-pink-800 mb-2">Nurturing</h3>
                <p className="text-sm text-gray-600">Self-care time</p>
              </div>
            </div>
          </div>

          {/* Personal Activities */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Hobbies & Interests */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-rose-500">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Hobbies & Interests</h3>
              <div className="space-y-4">
                <div className="bg-pink-50 p-4 rounded-lg border-l-3 border-pink-400">
                  <h4 className="font-semibold text-pink-800 mb-2">Creative Projects</h4>
                  <p className="text-sm text-gray-700">Painting, writing, or crafting</p>
                </div>
                <div className="bg-rose-50 p-4 rounded-lg border-l-3 border-rose-400">
                  <h4 className="font-semibold text-rose-800 mb-2">Learning</h4>
                  <p className="text-sm text-gray-700">Online courses or reading</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border-l-3 border-purple-400">
                  <h4 className="font-semibold text-purple-800 mb-2">Physical Activity</h4>
                  <p className="text-sm text-gray-700">Yoga, walking, or sports</p>
                </div>
                <div className="bg-pink-50 p-4 rounded-lg border-l-3 border-pink-400">
                  <h4 className="font-semibold text-pink-800 mb-2">Social Time</h4>
                  <p className="text-sm text-gray-700">Catch up with friends</p>
                </div>
              </div>
            </div>

            {/* Wellness & Self-Care */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-pink-500">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Wellness & Self-Care</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Sleep Quality</span>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div key={star} className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Energy Level</span>
                  <div className="w-24 bg-gray-200 rounded-full h-3">
                    <div className="bg-rose-500 h-3 rounded-full w-4/5"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Stress Level</span>
                  <div className="w-24 bg-gray-200 rounded-full h-3">
                    <div className="bg-green-500 h-3 rounded-full w-2/5"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Mood</span>
                  <div className="w-24 bg-gray-200 rounded-full h-3">
                    <div className="bg-pink-500 h-3 rounded-full w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Weekend Planning */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-l-4 border-rose-500">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Weekend Planning</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-pink-100 to-rose-100 p-4 rounded-xl">
                <h4 className="font-semibold text-pink-800 mb-2">Today (Saturday)</h4>
                <ul className="space-y-2 text-sm text-pink-700">
                  <li>• Morning meditation</li>
                  <li>• Creative project time</li>
                  <li>• Afternoon walk</li>
                  <li>• Evening relaxation</li>
                </ul>
              </div>
              <div className="bg-gradient-to-r from-rose-100 to-pink-100 p-4 rounded-xl">
                <h4 className="font-semibold text-rose-800 mb-2">Tomorrow (Sunday)</h4>
                <ul className="space-y-2 text-sm text-rose-700">
                  <li>• Sleep in</li>
                  <li>• Brunch preparation</li>
                  <li>• Family activities</li>
                  <li>• Week preparation</li>
                </ul>
              </div>
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-xl">
                <h4 className="font-semibold text-purple-800 mb-2">Next Week Prep</h4>
                <ul className="space-y-2 text-sm text-purple-700">
                  <li>• Review calendar</li>
                  <li>• Plan meals</li>
                  <li>• Set intentions</li>
                  <li>• Organize workspace</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Gratitude & Reflection */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-l-4 border-pink-500">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Gratitude & Reflection</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="bg-pink-50 p-4 rounded-lg">
                  <p className="text-gray-700 font-medium">What am I grateful for today?</p>
                </div>
                <div className="bg-rose-50 p-4 rounded-lg">
                  <p className="text-gray-700 font-medium">What made me smile this week?</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-gray-700 font-medium">What am I looking forward to?</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="bg-pink-50 p-4 rounded-lg">
                  <p className="text-gray-700 font-medium">How can I be kinder to myself?</p>
                </div>
                <div className="bg-rose-50 p-4 rounded-lg">
                  <p className="text-gray-700 font-medium">What brings me joy?</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-gray-700 font-medium">How can I help others today?</p>
                </div>
              </div>
            </div>
          </div>

          {/* Serenity Quote */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-pink-500 to-rose-600 rounded-2xl p-8 text-white">
              <h3 className="text-3xl font-bold mb-4">"Peace comes from within. Do not seek it without."</h3>
              <p className="text-xl opacity-90">- Buddha</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaturdayLayout;
