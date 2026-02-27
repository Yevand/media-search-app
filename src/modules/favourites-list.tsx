import {useState, useContext, useMemo} from 'react';
import {FavouritesContext} from '../context/favourites-context';
import type {Item} from '../types';
// import {type Action, type Item} from '../types';
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
  const mediaContext = useContext(FavouritesContext);
  const items = mediaContext?.favourites ?? EMPTY_ITEMS;

  const filteredItems = useMemo(() => {
    if (!filter.trim()) return items;

    const matcher = filter.toLowerCase();

    return items.filter((item) => {
      return (
        item.name.toLowerCase().includes(matcher) ||
        item.title.toLowerCase().includes(matcher)
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
    if (!mediaContext) {
      return;
    }

    mediaContext.setFavourites((currentFavourites) =>
      currentFavourites.filter(({id: itemId}) => itemId !== id),
    );
  }

  const favourites = filteredItems?.map((item) => (
    <StyledListItem key={item.id}>
      <TruncatedText>{`${item.name} - ${item.title}`}</TruncatedText>
      <StyledButton
        type="button"
        onClick={() => {
          handleRemove(item.id);
        }}
      >
        Remove
      </StyledButton>
    </StyledListItem>
  ));

  return <StyledUnorderedList>{favourites}</StyledUnorderedList>;
};

export function Favourites() {
  const [filter, setFilter] = useState<string>('');
  // @TODO add debounce or submit button
  // @TODO add pagination
  return (
    <SectionWrapper>
      <StyledForm>
        <InputWrapper>
          <StyledInput
            value={filter}
            id="filter-favourites"
            placeholder="Nothing Else Matters"
            onChange={(event) => setFilter(event.target.value)}
          ></StyledInput>
        </InputWrapper>
      </StyledForm>
      <FavouritesList filter={filter} />
    </SectionWrapper>
  );
}
