import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// App state atoms with persistence
export const themeAtom = atomWithStorage<'light' | 'dark'>('theme', 'light');
export const globalCountAtom = atom(0);
export const isLoadingAtom = atom(false);
export const sidebarOpenAtom = atom(false);

// Window dimensions storage (persisted in localStorage)
export interface WindowDimensions {
  width: number;
  height: number;
}

export const windowDimensionsAtom = atomWithStorage<Record<string, WindowDimensions>>(
  'window-dimensions',
  {}
);

// Derived atoms
export const isDarkModeAtom = atom(get => get(themeAtom) === 'dark');

// Action atoms
export const toggleThemeAtom = atom(null, (get, set) => {
  const currentTheme = get(themeAtom);
  set(themeAtom, currentTheme === 'light' ? 'dark' : 'light');
});

export const incrementGlobalCountAtom = atom(null, (get, set) => {
  const currentCount = get(globalCountAtom);
  set(globalCountAtom, currentCount + 1);
});

export const decrementGlobalCountAtom = atom(null, (get, set) => {
  const currentCount = get(globalCountAtom);
  set(globalCountAtom, currentCount - 1);
});

export const resetGlobalCountAtom = atom(null, (_get, set) => {
  set(globalCountAtom, 0);
});

export const toggleSidebarAtom = atom(null, (get, set) => {
  const currentState = get(sidebarOpenAtom);
  set(sidebarOpenAtom, !currentState);
});

// Window dimension actions
export const updateWindowDimensionsAtom = atom(
  null,
  (get, set, { windowId, dimensions }: { windowId: string; dimensions: WindowDimensions }) => {
    const current = get(windowDimensionsAtom);
    set(windowDimensionsAtom, {
      ...current,
      [windowId]: dimensions,
    });
  }
);

export const getWindowDimensionsAtom = atom(
  (get) => (windowId: string): WindowDimensions | undefined => {
    const dimensions = get(windowDimensionsAtom);
    return dimensions[windowId];
  }
);

// Fractal background colors
export interface FractalColors {
  first: string;
  second: string;
  third: string;
}

export const fractalColorsAtom = atom<FractalColors>({
  first: "#FF0080",
  second: "#7928CA",
  third: "#0070F3",
});

// Action atom to update fractal colors
export const updateFractalColorsAtom = atom(
  null,
  (_get, set, colors: FractalColors) => {
    set(fractalColorsAtom, colors);
  }
);
