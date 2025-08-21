import { useState, useEffect } from 'react';

export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export const DAYS: DayOfWeek[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

export const useDayOfWeek = () => {
  const [currentDay, setCurrentDay] = useState<DayOfWeek>('monday');

  useEffect(() => {
    const updateDay = () => {
      const today = new Date().getDay();
      // Convert Sunday (0) to 'sunday', Monday (1) to 'monday', etc.
      const dayNames: DayOfWeek[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
      setCurrentDay(dayNames[today]);
    };

    updateDay();
    // Update at midnight
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const timeUntilMidnight = tomorrow.getTime() - now.getTime();

    const timer = setTimeout(updateDay, timeUntilMidnight);
    return () => clearTimeout(timer);
  }, []);

  const getDayIndex = (day: DayOfWeek): number => {
    return DAYS.indexOf(day);
  };

  const isToday = (day: DayOfWeek): boolean => {
    return currentDay === day;
  };

  const getNextDay = (day: DayOfWeek): DayOfWeek => {
    const currentIndex = getDayIndex(day);
    return DAYS[(currentIndex + 1) % 7];
  };

  const getPreviousDay = (day: DayOfWeek): DayOfWeek => {
    const currentIndex = getDayIndex(day);
    return DAYS[currentIndex === 0 ? 6 : currentIndex - 1];
  };

  return {
    currentDay,
    getDayIndex,
    isToday,
    getNextDay,
    getPreviousDay,
    DAYS
  };
};
