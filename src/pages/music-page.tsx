import {MusicSearch} from '../components/music-search';
import {Favourites} from '../components/favourites-list';
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
