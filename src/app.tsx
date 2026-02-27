import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {FavouritesContext} from './context/favourites-context';
import {NavigationBar} from './modules/navigation-bar';
import {Home} from './pages/home-page';
import {Music} from './pages/music-page';
import {Movies} from './pages/movies-page';
import {ApplicationWrapper} from './styles/styled-components';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import type {Item} from './types';

const queryClient = new QueryClient();
// @TODO add aria-label for all interactive elements and important content
export function App() {
  const [storageState, setStorageState] = useState<Item[]>(() => {
    const savedFavourites = localStorage.getItem('favourites');
    return savedFavourites ? JSON.parse(savedFavourites) : [];
  });

  useEffect(() => {
    const userData = JSON.stringify(storageState);
    localStorage.setItem('favourites', userData);
  }, [storageState]);

  return (
    <ApplicationWrapper>
      <QueryClientProvider client={queryClient}>
        <FavouritesContext
          value={{favourites: storageState, setFavourites: setStorageState}}
        >
          <BrowserRouter>
            <NavigationBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/music" element={<Music />} />
            </Routes>
          </BrowserRouter>
        </FavouritesContext>
      </QueryClientProvider>
    </ApplicationWrapper>
  );
}
