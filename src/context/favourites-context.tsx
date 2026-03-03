import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactElement,
} from 'react';
import type {Item} from '../types';

interface FavouritesContextProps {
  favourites: Item[];
  setFavourites: React.Dispatch<React.SetStateAction<Item[]>>;
}

const FavouritesContext = createContext<FavouritesContextProps | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useFavouritesContext() {
  const context = useContext(FavouritesContext);

  if (!context) {
    throw new Error('No context provided!');
  }
  return context;
}

export function FavContextProvider({children}: {children: ReactElement}) {
  const [storageState, setStorageState] = useState<Item[]>(() => {
    const savedFavourites = localStorage.getItem('favourites');
    return savedFavourites ? JSON.parse(savedFavourites) : [];
  });

  useEffect(() => {
    const userData = JSON.stringify(storageState);
    localStorage.setItem('favourites', userData);
  }, [storageState]);

  return (
    <FavouritesContext
      value={{favourites: storageState, setFavourites: setStorageState}}
    >
      {children}
    </FavouritesContext>
  );
}
