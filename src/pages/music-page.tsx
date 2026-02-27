import {MusicSearch} from '../modules/music-search';
import {Favourites} from '../modules/favourites-list';
import {PageWrapper, ContentWrapper} from '../styles/styled-components';

export function Music() {
  return (
    <PageWrapper>
      <ContentWrapper>
        <MusicSearch />
        <Favourites />
      </ContentWrapper>
    </PageWrapper>
  );
}
