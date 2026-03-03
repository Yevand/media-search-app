import {useMemo, useState, type SubmitEvent} from 'react';
import {useFavouritesContext} from '../context/favourites-context';
import {useQuery} from '@tanstack/react-query';
import type {Item, MusicSearchResponse, Result} from '../types';
import {
  InputWrapper,
  SectionWrapper,
  StyledButton,
  StyledForm,
  StyledInput,
  StyledListItem,
  StyledSearchButton,
  StyledUnorderedList,
  TruncatedText,
  StyledLoading,
  StyledErrorBanner,
  StyledAside,
} from '../styles/styled-components';

const getMedia = async (
  options: {
    query: string;
    limit?: string;
    fmt?: string;
  },
  setErrorMessage: (error: string) => void,
): Promise<MusicSearchResponse | undefined> => {
  const {fmt = 'json', limit = '5', query} = options;
  const requestUrl = new URL('https://musicbrainz.org/ws/2/recording');
  if (query) requestUrl.searchParams.set('query', query);
  if (limit) requestUrl.searchParams.set('limit', limit);
  if (fmt) requestUrl.searchParams.set('fmt', fmt);

  try {
    const response = await fetch(requestUrl);
    return response.json();
  } catch (error) {
    if (typeof error === 'string') {
      setErrorMessage(error);
      console.error(`Search failed, message: ${error}`);
    } else {
      console.error(`Search failed, message: ${error}`);
    }
  }
};

interface ResultListProps {
  items: Item[];
}

const ResultList = ({items}: ResultListProps) => {
  const mediaContext = useFavouritesContext();

  function handleAdd(item: Item) {
    mediaContext.setFavourites((currentFavourites) => {
      const isDuplicate = currentFavourites.some(
        ({id: itemId}) => itemId === item.id,
      );

      if (isDuplicate) {
        return currentFavourites;
      }

      return [...currentFavourites, item];
    });
  }

  const listItems = items.map(({id, name, title}) => {
    const result = `${name} - ${title}`;
    return (
      <StyledListItem key={id}>
        <TruncatedText>{result}</TruncatedText>
        <StyledButton
          type="button"
          onClick={() => handleAdd({id, name, title})}
        >
          Add
        </StyledButton>
      </StyledListItem>
    );
  });

  return <StyledUnorderedList>{listItems}</StyledUnorderedList>;
};

export const MusicSearch = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const {data, isLoading, isError, error} = useQuery({
    queryKey: ['music', searchQuery],
    queryFn: async () => await getMedia({query: searchQuery}, setErrorMessage),
    enabled: !!searchQuery,
  });

  const searchResults: Item[] | undefined = useMemo(() => {
    if (!data?.recordings[0]) {
      return undefined;
    }

    return data?.recordings.map((result: Result) => {
      const {
        id,
        title,
        'artist-credit': [
          {
            artist: {name},
          },
        ],
      } = result;

      return {
        id,
        name,
        title,
      };
    });
  }, [data]);

  const searchSubmitHandle = (event: SubmitEvent) => {
    event.preventDefault();
    setSearchQuery(inputValue);
  };

  return (
    <SectionWrapper>
      <StyledForm onSubmit={searchSubmitHandle}>
        <InputWrapper>
          <StyledInput
            id="music-search"
            placeholder="Search for Metallica"
            value={inputValue}
            onChange={(event) => {
              setInputValue(event.target.value);
            }}
          />
          <StyledSearchButton type="submit">Search</StyledSearchButton>
        </InputWrapper>
      </StyledForm>
      {!searchQuery && (
        <StyledAside>
          <p>Here you can search for your favoiurite songs and artists</p>
        </StyledAside>
      )}
      {isLoading && <StyledLoading />}
      {isError && (
        <StyledErrorBanner role="alert">
          {(error?.message && errorMessage) ||
            'Unexpected error occurred while searching!'}
        </StyledErrorBanner>
      )}
      {!isLoading && !isError && !searchResults && searchQuery && (
        <StyledErrorBanner role="alert">{'No results!'}</StyledErrorBanner>
      )}
      {searchResults && <ResultList items={searchResults} />}
    </SectionWrapper>
  );
};
