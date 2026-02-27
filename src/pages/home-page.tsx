import {Favourites} from '../modules/favourites-list';
import {
  SectionWrapper,
  PageWrapper,
  ContentWrapper,
  StyledAside,
} from '../styles/styled-components';

export function Home() {
  return (
    <PageWrapper>
      <ContentWrapper>
        <SectionWrapper>
          <StyledAside>
            <h3>Your digital media collection</h3>
            <p>
              Use the search bar to explore millions of tracks and cinematic
              masterpieces.
            </p>
          </StyledAside>
        </SectionWrapper>

        <Favourites />
      </ContentWrapper>
    </PageWrapper>
  );
}
