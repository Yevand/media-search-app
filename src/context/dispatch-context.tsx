import { createContext, type ActionDispatch } from 'react';
import type { Action } from '../types';

export const DispatchContext = createContext<ActionDispatch<[Action]> | null>(
  null
);
