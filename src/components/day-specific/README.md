# Day-Based Layout System

This application features a unique day-based layout system where the entire interface changes based on the current day of the week. Each day has its own theme, purpose, and visual design.

## Overview

The system automatically detects the current day and renders the appropriate layout. Each day is designed with specific themes and purposes in mind:

### Monday - 🚀 Monday Motivation
- **Theme**: Productivity and goal-setting
- **Purpose**: Start the week with purpose and energy
- **Features**: Weekly goals, priority focus, energy tracking
- **Colors**: Blue to indigo gradients

### Tuesday - 🎨 Tuesday Creativity
- **Theme**: Innovation and collaboration
- **Purpose**: Build momentum and explore new ideas
- **Features**: Creative challenges, ideas board, collaboration hub
- **Colors**: Emerald to teal gradients

### Wednesday - 🧘 Wednesday Wisdom
- **Theme**: Reflection and balance
- **Purpose**: Midweek check-in and adjustment
- **Features**: Progress tracking, work-life balance, reflection questions
- **Colors**: Amber to orange gradients

### Thursday - ⚡ Thursday Thrive
- **Theme**: Execution and momentum
- **Purpose**: Build momentum and execute with precision
- **Features**: Task execution, performance metrics, action items
- **Colors**: Purple to violet gradients

### Friday - 🎉 Friday Finish
- **Theme**: Completion and celebration
- **Purpose**: Complete tasks and prepare for the weekend
- **Features**: Week completion overview, achievements, weekend planning
- **Colors**: Green to emerald gradients

### Saturday - 😌 Saturday Serenity
- **Theme**: Relaxation and personal growth
- **Purpose**: Rest, recharge, and pursue personal passions
- **Features**: Weekend mood, hobbies, wellness tracking
- **Colors**: Pink to rose gradients

### Sunday - 🌟 Sunday Sanctuary
- **Theme**: Preparation and renewal
- **Purpose**: Prepare for the week ahead
- **Features**: Weekly planning, intentions, reflection
- **Colors**: Sky to blue gradients

## Technical Implementation

### Components Structure
```
src/components/day-specific/
├── MondayLayout.tsx
├── TuesdayLayout.tsx
├── WednesdayLayout.tsx
├── ThursdayLayout.tsx
├── FridayLayout.tsx
├── SaturdayLayout.tsx
├── SundayLayout.tsx
└── index.ts
```

### Key Features

1. **Automatic Day Detection**: Uses the `useDayOfWeek` hook to automatically detect the current day
2. **Dynamic Rendering**: The Home component dynamically renders the appropriate layout
3. **Responsive Design**: All layouts are fully responsive and mobile-friendly
4. **Tailwind CSS**: Built with modern Tailwind CSS for consistent styling
5. **TypeScript**: Fully typed with TypeScript for better development experience

### Hook: useDayOfWeek

The `useDayOfWeek` hook provides:
- Current day detection
- Day utility functions
- Automatic midnight updates
- Type-safe day operations

```typescript
const { currentDay, isToday, getNextDay, getPreviousDay } = useDayOfWeek();
```

### Navigation Integration

The navigation bar displays the current day and updates automatically. Users can see which day they're viewing and the system maintains consistency across all pages.

## Customization

Each day layout can be customized by:
1. Modifying the component files in `src/components/day-specific/`
2. Adjusting colors, themes, and content
3. Adding new features specific to each day
4. Updating the visual design and layout structure

## Benefits

1. **User Engagement**: Different layouts keep the interface fresh and engaging
2. **Contextual Content**: Each day provides relevant information and tools
3. **Visual Variety**: Different color schemes and layouts prevent monotony
4. **Purpose-Driven Design**: Each day serves a specific purpose in the user's week
5. **Automatic Updates**: No manual intervention required - layouts change automatically

## Future Enhancements

Potential improvements could include:
- User preferences for specific days
- Customizable themes per day
- Integration with calendar systems
- Day-specific notifications and reminders
- Analytics tracking for day-based usage patterns

