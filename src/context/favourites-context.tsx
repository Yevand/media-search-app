import {createContext, type Dispatch, type SetStateAction} from 'react';
import type {Item} from '../types';
// @TODO try zustand instead of context
interface FavouritesContextProps {
	favourites: Item[];
	setFavourites: Dispatch<SetStateAction<Item[] | []>>;
}

export const FavouritesContext = createContext<FavouritesContextProps | null>(null);
