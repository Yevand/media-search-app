import {Favourites} from '../components/favourites-list';
import '../styles/app.css';

export function Movies() {
  return (
    <div className="page-content">
      <section>
        <h2>{'My Favourite stuff'}</h2>
        <Favourites />
      </section>
      <section>
        <h2>{'Welcome to movies page'}</h2>
      </section>
    </div>
  );
}
