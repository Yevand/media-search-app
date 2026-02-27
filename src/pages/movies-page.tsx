import {Favourites} from '../modules/favourites-list';
import {
  PageWrapper,
  ContentWrapper,
} from '../styles/styled-components';

export function Movies() {
  return (
    <PageWrapper>
      <ContentWrapper>
          <Favourites />
      </ContentWrapper>
    </PageWrapper>
  );
}
