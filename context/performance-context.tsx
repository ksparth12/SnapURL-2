"use client";

import React, { createContext, useContext, useReducer, useCallback, ReactNode, useMemo } from 'react';

// Define the types for our performance state
type PerformanceState = {
  prefersReducedMotion: boolean;
  isLowPowerMode: boolean;
  isHighPerformanceMode: boolean;
  fpsTarget: number;
  loadedAssets: Set<string>;
};

// Define the types for our actions
type PerformanceAction = 
  | { type: 'SET_REDUCED_MOTION'; payload: boolean }
  | { type: 'SET_LOW_POWER_MODE'; payload: boolean }
  | { type: 'SET_HIGH_PERFORMANCE_MODE'; payload: boolean }
  | { type: 'SET_FPS_TARGET'; payload: number }
  | { type: 'REGISTER_LOADED_ASSET'; payload: string };

// Initial state
const initialState: PerformanceState = {
  prefersReducedMotion: false,
  isLowPowerMode: false,
  isHighPerformanceMode: true,
  fpsTarget: 60,
  loadedAssets: new Set<string>(),
};

// Create the context
const PerformanceContext = createContext<{
  state: PerformanceState;
  setReducedMotion: (value: boolean) => void;
  setLowPowerMode: (value: boolean) => void;
  setHighPerformanceMode: (value: boolean) => void;
  setFpsTarget: (value: number) => void;
  registerLoadedAsset: (assetId: string) => void;
  isAssetLoaded: (assetId: string) => boolean;
}>({
  state: initialState,
  setReducedMotion: () => {},
  setLowPowerMode: () => {},
  setHighPerformanceMode: () => {},
  setFpsTarget: () => {},
  registerLoadedAsset: () => {},
  isAssetLoaded: () => false,
});

// Reducer function
function performanceReducer(state: PerformanceState, action: PerformanceAction): PerformanceState {
  switch (action.type) {
    case 'SET_REDUCED_MOTION':
      return { ...state, prefersReducedMotion: action.payload };
    case 'SET_LOW_POWER_MODE':
      return { ...state, isLowPowerMode: action.payload };
    case 'SET_HIGH_PERFORMANCE_MODE':
      return { ...state, isHighPerformanceMode: action.payload };
    case 'SET_FPS_TARGET':
      return { ...state, fpsTarget: action.payload };
    case 'REGISTER_LOADED_ASSET': {
      const newLoadedAssets = new Set(state.loadedAssets);
      newLoadedAssets.add(action.payload);
      return { ...state, loadedAssets: newLoadedAssets };
    }
    default:
      return state;
  }
}

// Provider component
export function PerformanceProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(performanceReducer, initialState);

  // Check for reduced motion preference
  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    dispatch({ type: 'SET_REDUCED_MOTION', payload: mediaQuery.matches });

    const handleChange = (e: MediaQueryListEvent) => {
      dispatch({ type: 'SET_REDUCED_MOTION', payload: e.matches });
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Detect low power mode (simplified heuristic)
  React.useEffect(() => {
    const checkBatteryStatus = async () => {
      try {
        // @ts-ignore - Battery API may not be typed
        if ('getBattery' in navigator) {
          // @ts-ignore
          const battery = await navigator.getBattery();
          if (battery.charging === false && battery.level < 0.2) {
            dispatch({ type: 'SET_LOW_POWER_MODE', payload: true });
          } else {
            dispatch({ type: 'SET_LOW_POWER_MODE', payload: false });
          }
        }
      } catch (e) {
        console.log('Battery API not supported');
      }
    };

    checkBatteryStatus();
    const interval = setInterval(checkBatteryStatus, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  // Action creators
  const setReducedMotion = useCallback((value: boolean) => {
    dispatch({ type: 'SET_REDUCED_MOTION', payload: value });
  }, []);

  const setLowPowerMode = useCallback((value: boolean) => {
    dispatch({ type: 'SET_LOW_POWER_MODE', payload: value });
  }, []);

  const setHighPerformanceMode = useCallback((value: boolean) => {
    dispatch({ type: 'SET_HIGH_PERFORMANCE_MODE', payload: value });
  }, []);

  const setFpsTarget = useCallback((value: number) => {
    dispatch({ type: 'SET_FPS_TARGET', payload: value });
  }, []);

  const registerLoadedAsset = useCallback((assetId: string) => {
    dispatch({ type: 'REGISTER_LOADED_ASSET', payload: assetId });
  }, []);

  const isAssetLoaded = useCallback(
    (assetId: string) => state.loadedAssets.has(assetId),
    [state.loadedAssets]
  );

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      state,
      setReducedMotion,
      setLowPowerMode,
      setHighPerformanceMode,
      setFpsTarget,
      registerLoadedAsset,
      isAssetLoaded,
    }),
    [
      state,
      setReducedMotion,
      setLowPowerMode,
      setHighPerformanceMode,
      setFpsTarget,
      registerLoadedAsset,
      isAssetLoaded,
    ]
  );

  return (
    <PerformanceContext.Provider value={contextValue}>
      {children}
    </PerformanceContext.Provider>
  );
}

// Custom hook to use the performance context
export function usePerformance() {
  const context = useContext(PerformanceContext);
  if (context === undefined) {
    throw new Error('usePerformance must be used within a PerformanceProvider');
  }
  return context;
}
