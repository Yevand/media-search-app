import {FavContextProvider} from '../context/favourites-context';
import {Favourites} from '../modules/favourites-list';
import {
  PageWrapper,
  ContentWrapper,
  StyledAside,
} from '../styles/styled-components';

export function Movies() {
  return (
    <PageWrapper>
      <FavContextProvider
        children={
          <ContentWrapper>
            <StyledAside>
              <h3>WORK IN PROGRESS</h3>
              <p>You can search for your favoiurite movies very soon!</p>
            </StyledAside>
            <Favourites />
          </ContentWrapper>
        }
      />
    </PageWrapper>
  );
}
