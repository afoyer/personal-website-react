import React from "react";

const WednesdayLayout: React.FC = () => {
  return (
    <div className="wednesday-layout min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #fffbeb 0%, #fed7aa 100%)'
    }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f59e0b' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full blur-xl" style={{
        background: 'radial-gradient(circle, rgba(251, 191, 36, 0.3) 0%, rgba(251, 191, 36, 0.1) 100%)'
      }}></div>
      <div className="absolute top-40 right-20 w-24 h-24 rounded-full blur-xl" style={{
        background: 'radial-gradient(circle, rgba(249, 115, 22, 0.3) 0%, rgba(249, 115, 22, 0.1) 100%)'
      }}></div>
      <div className="absolute bottom-20 left-1/4 w-40 h-40 rounded-full blur-xl" style={{
        background: 'radial-gradient(circle, rgba(234, 179, 8, 0.3) 0%, rgba(234, 179, 8, 0.1) 100%)'
      }}></div>

      <div className="container mx-auto px-6 py-8 relative z-10">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-block p-6 rounded-3xl shadow-lg border" style={{
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            borderColor: 'rgba(251, 191, 36, 0.3)'
          }}>
            <h1 className="text-5xl font-bold mb-4" style={{ color: '#ea580c' }}>
              Wednesday Wisdom
            </h1>
            <p className="text-xl" style={{ color: '#ea580c' }}>
              Midweek reflection and balance
            </p>
          </div>
        </header>

        {/* Main Content - Balance & Reflection */}
        <div className="max-w-7xl mx-auto">
          {/* Midweek Check-in */}
          <div className="rounded-3xl shadow-xl p-8 mb-8 border relative overflow-hidden" style={{
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            borderColor: 'rgba(251, 191, 36, 0.3)'
          }}>
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full -translate-y-16 translate-x-16 opacity-60" style={{
              background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.3) 0%, rgba(249, 115, 22, 0.3) 100%)'
            }}></div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6 relative z-10">
              Midweek Check-in
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              <div className="text-center group">
                <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{
                  background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)'
                }}>
                  <span className="text-white text-2xl font-bold">✓</span>
                </div>
                <h3 className="font-semibold mb-2" style={{ color: '#d97706' }}>
                  What's Working
                </h3>
                <p className="text-sm text-gray-600">Celebrate your progress</p>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{
                  background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)'
                }}>
                  <span className="text-white text-2xl font-bold">?</span>
                </div>
                <h3 className="font-semibold mb-2" style={{ color: '#ea580c' }}>
                  What Needs Attention
                </h3>
                <p className="text-sm text-gray-600">
                  Identify areas for improvement
                </p>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{
                  background: 'linear-gradient(135deg, #eab308 0%, #f59e0b 100%)'
                }}>
                  <span className="text-white text-2xl font-bold">→</span>
                </div>
                <h3 className="font-semibold mb-2" style={{ color: '#d97706' }}>
                  Next Steps
                </h3>
                <p className="text-sm text-gray-600">Plan your path forward</p>
              </div>
            </div>
          </div>

          {/* Balance Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Work-Life Balance */}
            <div className="rounded-2xl shadow-lg p-6 border relative overflow-hidden" style={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              borderColor: 'rgba(249, 115, 22, 0.3)'
            }}>
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full -translate-y-12 translate-x-12 opacity-60" style={{
                background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.3) 0%, rgba(251, 191, 36, 0.3) 100%)'
              }}></div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4 relative z-10">
                Work-Life Balance
              </h3>
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Work Focus</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-3">
                      <div className="h-3 rounded-full w-4/5" style={{ background: '#f97316' }}></div>
                    </div>
                    <span className="text-sm text-gray-600">80%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Personal Time</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-3">
                      <div className="h-3 rounded-full w-3/5" style={{ background: '#f59e0b' }}></div>
                    </div>
                    <span className="text-sm text-gray-600">60%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Rest & Recovery</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-3">
                      <div className="h-3 rounded-full w-2/5" style={{ background: '#eab308' }}></div>
                    </div>
                    <span className="text-sm text-gray-600">40%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Weekly Progress */}
            <div className="rounded-2xl shadow-lg p-6 border relative overflow-hidden" style={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              borderColor: 'rgba(251, 191, 36, 0.3)'
            }}>
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full -translate-y-12 translate-x-12 opacity-60" style={{
                background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.3) 0%, rgba(234, 179, 8, 0.3) 100%)'
              }}></div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4 relative z-10">
                Weekly Progress
              </h3>
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Monday</span>
                  <div className="w-16 h-2 bg-gray-200 rounded-full">
                    <div className="w-16 h-2 rounded-full" style={{ background: '#22c55e' }}></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Tuesday</span>
                  <div className="w-16 h-2 bg-gray-200 rounded-full">
                    <div className="w-16 h-2 rounded-full" style={{ background: '#22c55e' }}></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Wednesday</span>
                  <div className="w-16 h-2 bg-gray-200 rounded-full">
                    <div className="w-12 h-2 rounded-full" style={{ background: '#f59e0b' }}></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Thursday</span>
                  <div className="w-16 h-2 bg-gray-200 rounded-full">
                    <div className="w-0 h-2 bg-gray-400 rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Friday</span>
                  <div className="w-16 h-2 bg-gray-200 rounded-full">
                    <div className="w-0 h-2 bg-gray-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reflection Questions */}
          <div className="rounded-2xl shadow-lg p-6 mb-8 border relative overflow-hidden" style={{
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            borderColor: 'rgba(234, 179, 8, 0.3)'
          }}>
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full -translate-y-16 translate-x-16 opacity-60" style={{
              background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.3) 0%, rgba(251, 191, 36, 0.3) 100%)'
            }}></div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 relative z-10">
              Reflection Questions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              <div className="space-y-3">
                <div className="p-4 rounded-lg border hover:bg-amber-50/80 transition-colors" style={{
                  background: 'rgba(255, 251, 235, 0.8)',
                  borderColor: 'rgba(251, 191, 36, 0.3)'
                }}>
                  <p className="text-gray-700 font-medium">
                    What have I learned this week?
                  </p>
                </div>
                <div className="p-4 rounded-lg border hover:bg-orange-50/80 transition-colors" style={{
                  background: 'rgba(255, 237, 213, 0.8)',
                  borderColor: 'rgba(249, 115, 22, 0.3)'
                }}>
                  <p className="text-gray-700 font-medium">
                    How can I improve my approach?
                  </p>
                </div>
                <div className="p-4 rounded-lg border hover:bg-yellow-50/80 transition-colors" style={{
                  background: 'rgba(254, 249, 195, 0.8)',
                  borderColor: 'rgba(234, 179, 8, 0.3)'
                }}>
                  <p className="text-gray-700 font-medium">
                    What am I grateful for today?
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="p-4 rounded-lg border hover:bg-amber-50/80 transition-colors" style={{
                  background: 'rgba(255, 251, 235, 0.8)',
                  borderColor: 'rgba(251, 191, 36, 0.3)'
                }}>
                  <p className="text-gray-700 font-medium">
                    What's my biggest challenge?
                  </p>
                </div>
                <div className="p-4 rounded-lg border hover:bg-orange-50/80 transition-colors" style={{
                  background: 'rgba(255, 237, 213, 0.8)',
                  borderColor: 'rgba(249, 115, 22, 0.3)'
                }}>
                  <p className="text-gray-700 font-medium">
                    How can I support others?
                  </p>
                </div>
                <div className="p-4 rounded-lg border hover:bg-yellow-50/80 transition-colors" style={{
                  background: 'rgba(254, 249, 195, 0.8)',
                  borderColor: 'rgba(234, 179, 8, 0.3)'
                }}>
                  <p className="text-gray-700 font-medium">
                    What's my energy level like?
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Wisdom Quote */}
          <div className="text-center relative z-10">
            <div className="rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden" style={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)'
            }}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
              <h3 className="text-3xl font-bold mb-4 relative z-10">
                "The middle way is the way of wisdom."
              </h3>
              <p className="text-xl opacity-90 relative z-10">
                - Ancient Proverb
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WednesdayLayout;
