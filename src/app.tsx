import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {useEffect, useReducer} from 'react';
import {FavouritesContext} from './context/favourites-context';
import {DispatchContext} from './context/dispatch-context';
import {NavigationBar} from './components/navigation-bar';
import {Home} from './pages/home-page';
import {Music} from './pages/music-page';
import {Movies} from './pages/movies-page';
import type {Action, Item} from './types';
import {ApplicationWrapper} from './styles/styled-components';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

function favouritesListReducer(items: Item[], action: Action) {
  switch (action.type) {
    case 'added': {
      const isDuplicate = items.some((item) => item.id === action.id);

      if (isDuplicate) {
        return items;
      }

      return [
        ...items,
        {
          id: action.id,
          artist: action.item!.artist,
          song: action.item!.song,
        },
      ];
    }

    case 'removed': {
      return items.filter((item) => item.id !== action.id);
    }

    default: {
      return items;
    }
  }
}

const queryClient = new QueryClient();

// @TODO add aria-label for all interactive elements and important content
export function App() {
  let initialState = [];

  const savedFavourites = localStorage.getItem('favourites');

  if (savedFavourites) {
    initialState = JSON.parse(savedFavourites);
  }

  const [favourites, dispatch] = useReducer(
    favouritesListReducer,
    initialState,
  );

  useEffect(() => {
    const userData = JSON.stringify(favourites);
    localStorage.setItem('favourites', userData);
  }, [favourites]);

  return (
    <ApplicationWrapper>
      <QueryClientProvider client={queryClient}>
        <FavouritesContext value={favourites}>
          <DispatchContext value={dispatch}>
            <BrowserRouter>
              <NavigationBar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/music" element={<Music />} />
              </Routes>
            </BrowserRouter>
          </DispatchContext>
        </FavouritesContext>
      </QueryClientProvider>
    </ApplicationWrapper>
  );
}
