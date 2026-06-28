import { useEffect, useLayoutEffect } from 'react';

// useLayoutEffect lato client, useEffect lato server (evita warning SSR).
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;
