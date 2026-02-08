import { createContext } from 'react';
import type { Item } from '../types';

export const FavouritesContext = createContext<Item[] | null>(null);
