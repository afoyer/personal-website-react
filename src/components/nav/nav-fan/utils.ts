export function calculateArcMenuPosition(
  index: number,
  total: number,
  radius: number,
  maxArcAngle: number,
  direction: "left" | "right"
): { x: number; y: number } {
  const centerIndex = (total - 1) / 2;
  const distanceFromCenter = index - centerIndex;

  // Vertical spacing between items
  const verticalSpacing = maxArcAngle;
  const y = distanceFromCenter * verticalSpacing;

  // Horizontal offset creates the arc - parabolic curve
  // Center items (closer to 0) extend furthest, edge items curve back
  const normalizedDistance = distanceFromCenter / (total > 1 ? total / 2 : 1);
  const arcDepth = radius * 0.25; // 25% of radius for the arc depth
  const horizontalOffset =
    radius - normalizedDistance * normalizedDistance * arcDepth;

  const xMultiplier = direction === "right" ? 1 : -1;
  const x = horizontalOffset * xMultiplier;

  return { x, y };
}

export function calculateFullScreenPosition(
  index: number,
  total: number
): { x: number; y: number } {
  const centerIndex = (total - 1) / 2;
  const distanceFromCenter = index - centerIndex;

  // Calculate spacing based on viewport height and number of items
  const buttonHeight = 60;
  const padding = 100; // Top and bottom padding
  const availableHeight = window.innerHeight - padding;
  const maxSpacing = 80;
  const neededHeight = (total - 1) * maxSpacing + buttonHeight;
  const verticalSpacing =
    neededHeight > availableHeight
      ? Math.floor((availableHeight - buttonHeight) / (total - 1))
      : maxSpacing;

  return {
    x: 0, // Centered horizontally (handled by container)
    y: distanceFromCenter * verticalSpacing,
  };
}
