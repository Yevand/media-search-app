import {MusicSearch} from '../components/music-search';
import {Favourites} from '../components/favourites-list';
import '../styles/app.css';

export function Music() {
  return (
      <div className="page-content">
        <section>
          <h2>{'My Favourite stuff'}</h2>
          <Favourites />
        </section>
        <section>
          <h2>{'Welcome to music page'}</h2>
          <MusicSearch />
        </section>
      </div>
  );
}
