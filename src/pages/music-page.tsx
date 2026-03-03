import {MusicSearch} from '../modules/music-search';
import {Favourites} from '../modules/favourites-list';
import {PageWrapper, ContentWrapper} from '../styles/styled-components';
import {FavContextProvider} from '../context/favourites-context';

export function Music() {
  return (
    <PageWrapper>
      <FavContextProvider
        children={
          <ContentWrapper>
            <MusicSearch />
            <Favourites />
          </ContentWrapper>
        }
      />
    </PageWrapper>
  );
}
