import {useState, useMemo, useEffect} from 'react';
import {useFavouritesContext} from '../context/favourites-context';
import type {Item} from '../types';
import {
  InputWrapper,
  SectionWrapper,
  StyledButton,
  StyledForm,
  StyledInput,
  StyledListItem,
  StyledParagraph,
  StyledUnorderedList,
  TruncatedText,
} from '../styles/styled-components';

interface FavouritesListProps {
  filter: string;
}

const EMPTY_ITEMS: Item[] = [];

const FavouritesList = ({filter}: FavouritesListProps) => {
  const mediaContext = useFavouritesContext();
  const items = mediaContext?.favourites ?? EMPTY_ITEMS;

  const filteredItems = useMemo(() => {
    if (!filter.trim()) return items;

    const matchers = filter.toLowerCase().split(' ');

    return items.filter(({name, title}) => {
      const combined = `${name.toLowerCase()} - ${title.toLowerCase()}`;

      return matchers.every(
        (matcher) =>
          name.toLowerCase().includes(matcher) ||
          title.toLowerCase().includes(matcher) ||
          combined.includes(matcher),
      );
    });
  }, [items, filter]);

  if (items?.length === 0) {
    return (
      <SectionWrapper>
        <StyledParagraph>{'No media found...'}</StyledParagraph>
      </SectionWrapper>
    );
  }

  function handleRemove(id: string) {
    mediaContext.setFavourites((currentFavourites) =>
      currentFavourites.filter(({id: itemId}) => itemId !== id),
    );
  }

  const favourites = filteredItems?.map(({id, name, title}) => {
    const result = `${name} - ${title}`;

    return (
      <StyledListItem key={id}>
        <TruncatedText>{result}</TruncatedText>
        <StyledButton
          type="button"
          onClick={() => {
            handleRemove(id);
          }}
        >
          Remove
        </StyledButton>
      </StyledListItem>
    );
  });

  return <StyledUnorderedList>{favourites}</StyledUnorderedList>;
};

export function Favourites() {
  const [filter, setFilter] = useState<string>('');
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    const trigger = setTimeout(() => setFilter(query), 500);
    return () => clearTimeout(trigger);
  }, [query]);

  return (
    <SectionWrapper>
      <StyledForm>
        <InputWrapper>
          <StyledInput
            value={query}
            id="filter-favourites"
            placeholder="Nothing Else Matters"
            onChange={(event) => {
              setQuery(event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
              }
            }}
          ></StyledInput>
        </InputWrapper>
      </StyledForm>
      <FavouritesList filter={filter} />
    </SectionWrapper>
  );
}
