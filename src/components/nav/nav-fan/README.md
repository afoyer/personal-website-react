# NavFan Component

A navigation component that displays a fan/arc menu when hovered. Items spread out in an arc pattern with smooth animations.

## Features

- **Arc Animation**: Items animate outward in a fan/arc pattern
- **Dynamic Positioning**: More items = more arcing on the outer ones
- **Direction Control**: Can fan out to the left or right
- **Customizable**: Radius, arc angle, colors, and more
- **Smooth Animations**: Staggered entrance with custom easing
- **Similar Styling**: Matches the NavButton component design

## Usage

```tsx
import NavFan, { NavFanItem } from "./components/nav/nav-fan";

const menuItems: NavFanItem[] = [
  { id: "item1", label: "Option 1", onClick: () => console.log("1") },
  { id: "item2", label: "Option 2", onClick: () => console.log("2") },
  { id: "item3", label: "Option 3", onClick: () => console.log("3") },
  { id: "item4", label: "Option 4", onClick: () => console.log("4") },
  { id: "item5", label: "Option 5", onClick: () => console.log("5") },
];

function MyComponent() {
  return (
    <NavFan items={menuItems} direction="right" radius={120} maxArcAngle={60}>
      Menu
    </NavFan>
  );
}
```

## Props

### NavFanProps

| Prop                   | Type                | Default                | Description                                             |
| ---------------------- | ------------------- | ---------------------- | ------------------------------------------------------- |
| `children`             | `ReactNode`         | -                      | **Required**. Content displayed on the trigger button   |
| `items`                | `NavFanItem[]`      | -                      | **Required**. Array of menu items to display in the fan |
| `direction`            | `'left' \| 'right'` | `'right'`              | Direction the fan opens                                 |
| `hoverBackgroundColor` | `string`            | `'rgba(0, 0, 255, 1)'` | Background color when hovering the trigger button       |
| `backgroundColor`      | `string`            | `'rgba(0, 0, 0, 0.1)'` | Default background color of the trigger button          |
| `radius`               | `number`            | `120`                  | Distance (in pixels) items spread from the trigger      |
| `maxArcAngle`          | `number`            | `60`                   | Maximum angle (in degrees) the arc spans                |
| `delay`                | `number`            | `0.1`                  | Initial animation delay for the trigger button          |
| `className`            | `string`            | `''`                   | Additional CSS classes for the trigger button           |

### NavFanItem

| Property  | Type         | Required | Description                               |
| --------- | ------------ | -------- | ----------------------------------------- |
| `id`      | `string`     | Yes      | Unique identifier for the item            |
| `label`   | `string`     | Yes      | Text displayed on the item                |
| `icon`    | `ReactNode`  | No       | Optional icon to display before the label |
| `onClick` | `() => void` | No       | Function called when the item is clicked  |

## Examples

### Basic Fan Menu

```tsx
<NavFan
  items={[
    { id: "1", label: "Home", onClick: () => navigate("/") },
    { id: "2", label: "About", onClick: () => navigate("/about") },
    { id: "3", label: "Contact", onClick: () => navigate("/contact") },
  ]}
>
  Navigate
</NavFan>
```

### With Icons

```tsx
import { Home, User, Mail, Settings, Info } from "lucide-react";

<NavFan
  items={[
    {
      id: "1",
      label: "Home",
      icon: <Home size={16} />,
      onClick: () => navigate("/"),
    },
    {
      id: "2",
      label: "Profile",
      icon: <User size={16} />,
      onClick: () => navigate("/profile"),
    },
    {
      id: "3",
      label: "Messages",
      icon: <Mail size={16} />,
      onClick: () => navigate("/messages"),
    },
    {
      id: "4",
      label: "Settings",
      icon: <Settings size={16} />,
      onClick: () => navigate("/settings"),
    },
    {
      id: "5",
      label: "About",
      icon: <Info size={16} />,
      onClick: () => navigate("/about"),
    },
  ]}
>
  Menu
</NavFan>;
```

### Opening to the Left

```tsx
<NavFan items={menuItems} direction="left">
  Options
</NavFan>
```

### Custom Styling

```tsx
<NavFan
  items={menuItems}
  hoverBackgroundColor="rgba(255, 0, 0, 1)"
  backgroundColor="rgba(0, 0, 0, 0.2)"
  radius={150}
  maxArcAngle={90}
  className="font-bold"
>
  Custom Menu
</NavFan>
```

## How It Works

The component calculates item positions using trigonometry:

1. **Arc Calculation**: Items are distributed evenly across the specified `maxArcAngle`
2. **Center-Based**: The center item has an angle of 0°, outer items spread outward
3. **Dynamic Arcing**: More items = more spread, with outer items having larger angles
4. **Smooth Animation**: Each item animates with a slight stagger for a fluid effect

### Position Formula

```typescript
const centerIndex = (total - 1) / 2;
const distanceFromCenter = index - centerIndex;
const angle = distanceFromCenter * (maxArcAngle / (total - 1));
const x = cos(angle) * radius * directionMultiplier;
const y = -sin(angle) * radius;
```

This ensures that:

- With 1 item: centered (0° angle)
- With 3 items: -30°, 0°, +30° (if maxArcAngle = 60)
- With 5 items: -30°, -15°, 0°, +15°, +30°

The more items you add, the more pronounced the arc becomes!
