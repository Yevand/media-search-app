import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {NavigationBar} from './modules/navigation-bar';
import {Home} from './pages/home-page';
import {Music} from './pages/music-page';
import {Movies} from './pages/movies-page';
import {ApplicationWrapper} from './styles/styled-components';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();
export function App() {
  return (
    <ApplicationWrapper>
      <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <NavigationBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/music" element={<Music />} />
            </Routes>
          </BrowserRouter>
      </QueryClientProvider>
    </ApplicationWrapper>
  );
}
