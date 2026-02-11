import {Link} from 'react-router-dom';
import styled, {keyframes} from 'styled-components';
import './index.css';

const desktop = `@media screen and (min-width: 992px)`;

export const ApplicationWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  font-family: sans-serif;
  text-align: center;
`;

export const PageWrapper = styled.main`
  width: 100%;
  margin-top: 5rem;
`;

export const ContentWrapper = styled.div`
  margin-top: 5rem;
  width: 100%;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  justify-content: center;
  justify-items: center;
  padding: 0 1rem;

  ${desktop} {
    grid-template-columns: 45% 45%;
    justify-content: space-between;
    max-width: 1200px;
  }
`;

export const SectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: var(--max-content-width);
  min-width: 0;

  h2 {
    margin-top: 0;
    margin-bottom: 16px;
    color: var(--base-color);
    font-size: 1.2rem;
  }
`;

export const StyledAside = styled.aside`
  padding: 0;
  border-radius: 12px;
  line-height: 1.6;
  font-size: 0.95rem;
  width: 100%;

  h3 {
    margin-top: 0;
    padding: 0;
    color: var(--blue);
    font-size: 1.2rem;
  }

  p {
    color: var(--base-color);
  }
`;

export const StyledParagraph = styled.p`
  margin: 0;
  color: var(--base-color);
`;

export const StyledForm = styled.form`
  display: flex;
  width: 100%;
  margin-bottom: 16px;
  flex-direction: column;
  ${desktop} {
    flex-direction: row;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  align-self: center;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border: 2px solid var(--grey);
  border-radius: 20px;
  overflow: hidden;
  background: white;
`;

export const StyledInput = styled.input`
  border: none;
  outline: none;
  flex: 1;
  min-width: 0;
  padding: 0.5rem 1rem;
  font-size: 1rem;
`;

export const StyledSearchButton = styled.button`
  border: none;
  padding: 0.5rem 1.5rem;
  cursor: pointer;
  background-color: var(--grey-light);
`;

export const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  padding: 0.25rem 0.5rem;
  border: none;
  width: var(--button-fixed-width);
  flex-shrink: 0;
  cursor: pointer;
`;

export const StyledUnorderedList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const StyledListItem = styled.li`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border-top: 0.5px solid var(--grey);
  min-width: 0;
  gap: 1rem;
`;

export const TruncatedText = styled.span`
  flex: 1;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
`;

export const StyledNavigationHeader = styled.header`
  display: flex;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  height: 5rem;
  background-color: white;
  border-bottom: 1px solid var(--grey);
  z-index: 10;
`;

export const StyledNavigationList = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: auto;
  min-width: var(--min-content-width);
  max-width: var(--max-content-width);
  gap: calc(var(--flex-gap) * 1);
  list-style-type: none;
  padding: 0;
`;

export const StyledNavigationItem = styled.li<{selected: boolean}>`
  padding: 0.5rem 1rem;
  border: ${(props) =>
    props.selected ? '1px solid var(--grey);' : '1px solid var(--grey);'};
  border-radius: 16px;
  background-color: ${(props) =>
    props.selected ? 'var(--blue)' : 'transparent'};
`;

export const StyledLink = styled(Link)<{selected: boolean}>`
  color: ${(props) => (props.selected ? 'white' : 'black')};
  text-transform: uppercase;
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: bold;
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const StyledLoading = styled.div`
  width: 40px;
  height: 40px;
  margin: 2rem auto;
  border: 4px solid var(--grey-light);
  border-top: 4px solid var(--blue);
  border-radius: 50%;
  animation: ${rotate} 0.8s linear infinite;
`;

export const StyledErrorBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: var(--max-content-width);
  margin: 1rem 0;
  padding: 0.75rem 1rem;
  background-color: #fff5f5;
  color: #c53030;
  border: 1px solid #feb2b2;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
`;
