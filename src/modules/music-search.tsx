import {useContext, useState, type SubmitEvent} from 'react';
import {FavouritesContext} from '../context/favourites-context';
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
} from '../styles/styled-components';

const getMedia = async (options: {
  query: string;
  limit?: string;
  fmt?: string;
}): Promise<MusicSearchResponse | undefined> => {
  const {fmt = 'json', limit = '5', query} = options;
  const requestUrl = new URL('https://musicbrainz.org/ws/2/recording');
  if (query) requestUrl.searchParams.set('query', query);
  if (limit) requestUrl.searchParams.set('limit', limit);
  if (fmt) requestUrl.searchParams.set('fmt', fmt);

  try {
    const response = await fetch(requestUrl);
    return response.json();
  } catch (error) {
    console.error(`Search failed, message: ${error}`)
  }
};

interface ResultListProps {
  items: Item[] | undefined;
}

const ResultList = ({items}: ResultListProps) => {
  const mediaContext = useContext(FavouritesContext);

  function handleAdd(item: Item) {
    if (!mediaContext) {
      return;
    }

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

  // @TODO add truncation for long text in li
  const listItems = items?.map((item) => (
    <StyledListItem key={item.id}>
      <TruncatedText>{`${item.name} - ${item.title}`}</TruncatedText>
      <StyledButton type="button" onClick={() => handleAdd(item)}>
        Add
      </StyledButton>
    </StyledListItem>
  ));

  return <StyledUnorderedList>{listItems}</StyledUnorderedList>;
};

export const MusicSearch = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const {data, isLoading, isError, error} = useQuery({
    queryKey: ['music', searchQuery],
    queryFn: async () => await getMedia({query: searchQuery}),
    enabled: !!searchQuery,
  });

  const searchSubmitHandle = (event: SubmitEvent) => {
    event.preventDefault();
    setSearchQuery(inputValue);
  };

  const searchResults = data?.recordings.map(
    ({
      id,
      title,
      'artist-credit': [
        {
          artist: {name},
        },
      ],
    }: Result) => ({
      id,
      name,
      title,
    }),
  );

  return (
    <SectionWrapper>
      <StyledForm onSubmit={searchSubmitHandle}>
        <InputWrapper>
          <StyledInput
            id="music-search"
            placeholder="Search for Metallica"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
          <StyledSearchButton type="submit">Search</StyledSearchButton>
        </InputWrapper>
      </StyledForm>
      {(() => {
        switch (true) {
          case isError:
            return (
              <StyledErrorBanner role="alert">
                {error?.message || 'Unexpected error!'}
              </StyledErrorBanner>
            );
          case isLoading:
            return <StyledLoading />;
          case !isLoading && !isError:
            return <ResultList items={searchResults} />;
          default:
            return null;
        }
      })()}
    </SectionWrapper>
  );
};
