import React from 'react';
import { useDayOfWeek } from '../hooks/useDayOfWeek';
import {
  MondayLayout,
  TuesdayLayout,
  WednesdayLayout,
  ThursdayLayout,
  FridayLayout,
  SaturdayLayout,
  SundayLayout
} from '../components/day-specific';

const Home: React.FC = () => {
  const { currentDay } = useDayOfWeek();

  // Render the appropriate layout based on the current day
  const renderDayLayout = () => {
    switch (currentDay) {
      case 'monday':
        return <MondayLayout />;
      case 'tuesday':
        return <TuesdayLayout />;
      case 'wednesday':
        return <WednesdayLayout />;
      case 'thursday':
        return <ThursdayLayout />;
      case 'friday':
        return <FridayLayout />;
      case 'saturday':
        return <SaturdayLayout />;
      case 'sunday':
        return <SundayLayout />;
      default:
        return <MondayLayout />;
    }
  };

  return (
    <div className="home">
      {renderDayLayout()}
    </div>
  );
};

export default Home;
