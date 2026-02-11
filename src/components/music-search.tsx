import {useContext, useState, type SubmitEvent} from 'react';
import {DispatchContext} from '../context/dispatch-context';
import {useQuery} from '@tanstack/react-query';
import type {Action, Item, MusicSearchResponse, Result} from '../types';
import {
  InputGroup,
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

const getMedia = async (
  query: string,
  limit = 5,
): Promise<MusicSearchResponse> => {
  const URL = `https://musicbrainz.org/ws/2/recording?fmt=json&limit=${limit}&query=${query}`;
  const response = await fetch(URL);
  if (!response.ok) throw new Error(`Fetch failed, status: ${response.status}`);
  return response.json();
};

interface ResultListProps {
  items: Item[] | undefined;
}

const ResultList = ({items}: ResultListProps) => {
  const dispatch = useContext(DispatchContext);

  function handleAdd(id: Action['id'], item: Item) {
    if (dispatch) {
      dispatch({
        id: id,
        type: 'added',
        item: item,
      });
    }
  }

  // @TODO add truncation for long text in li
  const listItems = items?.map((item) => (
    <StyledListItem key={item.id}>
      <TruncatedText>{`${item.artist} - ${item.song}`} </TruncatedText>
      <StyledButton
        type="button"
        onClick={() => {
          handleAdd(item.id, item);
        }}
      >
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
    queryFn: async () => await getMedia(searchQuery),
    enabled: !!searchQuery,
  });

  const searchSubmitHandle = (event: SubmitEvent) => {
    event.preventDefault();
    setSearchQuery(inputValue);
  };

  const results = data?.recordings.map((result: Result) => ({
    id: result.id,
    artist: result['artist-credit'][0].artist.name,
    song: result.title,
  }));

  return (
    <SectionWrapper>
      <StyledForm onSubmit={searchSubmitHandle}>
        <InputGroup>
          <StyledInput
            id="music-search"
            placeholder="Search for Metallica"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          ></StyledInput>
          <StyledSearchButton type="submit">Search</StyledSearchButton>
        </InputGroup>
      </StyledForm>
      {isError && (
        <StyledErrorBanner role="alert">
          {error?.message?.toUpperCase() || 'UNEXPECTED ERROR OCCURRED'}
        </StyledErrorBanner>
      )}
      {isLoading && <StyledLoading />}
      {!isLoading && !isError && <ResultList items={results} />}
    </SectionWrapper>
  );
};
