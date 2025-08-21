import React from "react";
import { useDayOfWeek } from "../../hooks/useDayOfWeek";
import MondayNavigation from "./monday";
import TuesdayNavigation from "./tuesday";
import WednesdayNavigation from "./wednesday";
import ThursdayNavigation from "./thursday";
import FridayNavigation from "./friday";
import SaturdayNavigation from "./saturday";
import SundayNavigation from "./sunday";

const Navigation: React.FC = () => {
  const { currentDay } = useDayOfWeek();

  // Render the appropriate navigation based on the current day
  const renderDayNavigation = () => {
    switch (currentDay) {
      case "monday":
        return <MondayNavigation />;
      case "tuesday":
        return <TuesdayNavigation />;
      case "wednesday":
        return <WednesdayNavigation />;
      case "thursday":
        return <ThursdayNavigation />;
      case "friday":
        return <FridayNavigation />;
      case "saturday":
        return <SaturdayNavigation />;
      case "sunday":
        return <SundayNavigation />;
      default:
        return <MondayNavigation />;
    }
  };

  return <>{renderDayNavigation()}</>;
};

export default Navigation;
