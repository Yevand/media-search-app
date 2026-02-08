import {useContext, useState, type FormEvent} from 'react';
import {DispatchContext} from '../context/dispatch-context';
import type {Action, Item, MusicSearchResponse, Result} from '../types';
import '../styles/music-search.css';

// use library and proccess errors
export async function getMusic(
  query: string,
  limit = 10,
): Promise<MusicSearchResponse> {
  const URL = `https://musicbrainz.org/ws/2/recording?fmt=json&limit=${limit}&query=${query}`;
  const response = await fetch(URL);

  return response.json();
}

interface ResultListProps {
  items: Item[];
}

const ResultList = ({items}: ResultListProps) => {
  const dispatch = useContext(DispatchContext);

  if (items.length === 0) {
    return <ul></ul>;
  }

  function handleAdd(id: Action['id'], item: Item) {
    if (dispatch) {
      dispatch({
        id: id,
        type: 'added',
        item: item,
      });
    }
  }

  const listItems = items.map((item) => (
    <li className="result" key={item.id}>
      {`${item.artist} - ${item.song}`}
      <button
        type="button"
        onClick={() => {
          handleAdd(item.id, item);
        }}
      >
        Add
      </button>
    </li>
  ));

  return <ul className="search-results">{listItems}</ul>;
};

export function MusicSearch() {
  const [searchResults, setSearchResults] = useState<Item[]>([]);
  const [query, setQuery] = useState<string>('');

  async function searchSubmitHandle(event: FormEvent) {
    event.preventDefault();

    const {recordings} = await getMusic(query);

    const results: Item[] = (recordings as Result[]).map((result: Result) => ({
      id: result.id,
      artist: result['artist-credit'][0].artist.name,
      song: result.title,
    }));

    setSearchResults(results);
  }

  return (
    <>
      <form onSubmit={searchSubmitHandle}>
        <input
          id="seach-music"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        ></input>
        <button type="submit">Search</button>
      </form>
      <ResultList items={searchResults} />
    </>
  );
}
