import React from "react";
import { useDayOfWeek, DayOfWeek } from "../hooks/useDayOfWeek";

const DaySelector: React.FC = () => {
  const { currentDay, DAYS } = useDayOfWeek();

  const getDayDisplayName = (day: DayOfWeek) => {
    return day.charAt(0).toUpperCase() + day.slice(1);
  };

  const getDayEmoji = (day: DayOfWeek) => {
    const emojis: Record<DayOfWeek, string> = {
      monday: "🚀",
      tuesday: "🎨",
      wednesday: "🧘",
      thursday: "⚡",
      friday: "🎉",
      saturday: "😌",
      sunday: "🌟",
    };
    return emojis[day];
  };

  const getDayColor = (day: DayOfWeek) => {
    const colors: Record<DayOfWeek, string> = {
      monday: "from-blue-500 to-indigo-600",
      tuesday: "from-emerald-500 to-teal-600",
      wednesday: "from-amber-500 to-orange-600",
      thursday: "from-purple-500 to-violet-600",
      friday: "from-green-500 to-emerald-600",
      saturday: "from-pink-500 to-rose-600",
      sunday: "from-sky-500 to-blue-600",
    };
    return colors[day];
  };

  return (
    <div className="absolute bottom-6 right-6 z-10">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-4 max-w-xs">
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Current Day
          </h3>
          <div
            className={`inline-flex items-center space-x-2 bg-gradient-to-r ${getDayColor(currentDay)} text-white px-4 py-2 rounded-full`}
          >
            <span className="text-2xl">{getDayEmoji(currentDay)}</span>
            <span className="font-bold">{getDayDisplayName(currentDay)}</span>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-gray-600 text-center mb-3">
            All layouts are automatically generated based on the current day of
            the week.
          </p>

          <div className="grid grid-cols-2 gap-2">
            {DAYS.map((day) => (
              <div
                key={day}
                className={`text-center p-2 rounded-lg text-xs font-medium transition-all ${
                  currentDay === day
                    ? `bg-gradient-to-r ${getDayColor(day)} text-white shadow-lg scale-105`
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-102"
                }`}
              >
                <div className="text-lg mb-1">{getDayEmoji(day)}</div>
                <div>{getDayDisplayName(day)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 p-3 bg-blue-50/80 rounded-lg">
          <p className="text-xs text-blue-700 text-center">
            💡 Each day has a unique theme, layout, and purpose designed to
            match the energy and focus of that specific day of the week.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DaySelector;
