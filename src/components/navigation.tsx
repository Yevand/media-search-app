import {Link} from 'react-router-dom';
import '../styles/navigation.css';

export const Navigation = () => (
  <nav>
    <ul className='border rounded-xl'>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/movies">Movies</Link>
      </li>
      <li>
        <Link to="/music">Music</Link>
      </li>
    </ul>
  </nav>
);
