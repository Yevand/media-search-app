import {useState, useContext, useMemo} from 'react';
import {FavouritesContext} from '../context/favourites-context';
import {DispatchContext} from '../context/dispatch-context';
import {type Action, type Item} from '../types';
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
  items: Item[];
}

const FavouritesList = ({items}: FavouritesListProps) => {
  const dispatch = useContext(DispatchContext);

  if (items.length === 0) {
    return (
      <SectionWrapper>
        <StyledParagraph>{'No media found...'}</StyledParagraph>
      </SectionWrapper>
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
    <StyledListItem key={item.id}>
      <TruncatedText>{`${item.artist} - ${item.song}`}</TruncatedText>
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
  const favourites = useContext(FavouritesContext);

  // @TODO add debounce or submit button
  const filteredItems = useMemo(() => {
    if (!favourites) return [];
    if (!filter.trim()) return favourites;

    const matcher = filter.toLowerCase();

    return favourites.filter((item) => {
      return (
        item.artist.toLowerCase().includes(matcher) ||
        item.song.toLowerCase().includes(matcher)
      );
    });
  }, [favourites, filter]);

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
      <FavouritesList items={filteredItems} />
    </SectionWrapper>
  );
}
