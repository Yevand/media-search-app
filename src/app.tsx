import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {useReducer} from 'react';
import {FavouritesContext} from './context/favourites-context';
import {DispatchContext} from './context/dispatch-context';
import {Navigation} from './components/navigation';
import {Home} from './pages/home-page';
import {Music} from './pages/music-page';
import {Movies} from './pages/movies-page';
import type {Action, Item} from './types';
import './styles/main.css';

function favouritesListReducer(items: Item[], action: Action) {
  switch (action.type) {
    case 'added': {
      const filteredItems = items.filter((item) => item.id !== action.id);

      return [
        ...filteredItems,
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
    case 'filtered': {
      return items.filter((item) => item.id === action.id);
    }
    default: {
      return items;
    }
  }
}

export function App() {
  const [favourites, dispatch] = useReducer(favouritesListReducer, []);

  return (
    <div className="application">
      <FavouritesContext value={favourites}>
        <DispatchContext value={dispatch}>
          <BrowserRouter>
            <Navigation />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/music" element={<Music />} />
            </Routes>
          </BrowserRouter>
        </DispatchContext>
      </FavouritesContext>
    </div>
  );
}
