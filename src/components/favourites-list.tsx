import {useState, useContext} from 'react';
import {FavouritesContext} from '../context/favourites-context';
import {DispatchContext} from '../context/dispatch-context';
import {type Action, type Item} from '../types';
import '../styles/favourites.css';

interface FavouritesListProps {
  items: Item[];
}

const FavouritesList = ({items}: FavouritesListProps) => {
  const dispatch = useContext(DispatchContext);

  if (items.length === 0) {
    return (
      <>
        <h3>{'Music'}</h3>
        <span>{'No music found'}</span>
      </>
    );
  }

  function handleRemove(id: Action['id']) {
    if (dispatch) {
      dispatch({
        id: id,
        type: 'removed',
      });
    }
  }

  const favourites = items.map((item) => (
    <li className="result" key={item.id}>
      {`${item.artist} - ${item.song}`}
      <button
        type="button"
        onClick={() => {
          handleRemove(item.id);
        }}
      >
        Remove
      </button>
    </li>
  ));

  return <ul className="search-results">{favourites}</ul>;
};

export function Favourites() {
  const [filter, setFilter] = useState<string>('');
  const favourites = useContext(FavouritesContext);

  // add debounce
  function handleFilter(query: string, items: Item[] | null) {
    const REGEXP = new RegExp(query, 'i');
    const filteredItems: Item[] = [];

    if (!items) {
      return filteredItems;
    }

    for (const item of items) {
      const result = REGEXP.test(item.artist) || REGEXP.test(item.song);
      if (result === true) {
        filteredItems.push(item);
      }
    }

    return filteredItems;
  }

  return (
    <>
      <form>
        <input
          value={filter}
          id="filter-favourites"
          onChange={(event) => setFilter(event.target.value)}
        ></input>
      </form>
      <FavouritesList items={handleFilter(filter, favourites)} />
    </>
  );
}
