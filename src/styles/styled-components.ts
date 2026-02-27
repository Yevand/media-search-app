import {Link} from 'react-router-dom';
import styled, {keyframes} from 'styled-components';
import './index.css';

const desktop = `@media screen and (min-width: 992px)`;

export const ApplicationWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
`;

export const PageWrapper = styled.main`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 5rem;
`;

export const ContentWrapper = styled.div`
  width: 90vw;
  margin-top: 5rem;
  display: grid;
  grid-template-columns: minmax(0, 100%);
  justify-content: center;
  gap: calc(var(--gap) * 2);

  ${desktop} {
    grid-template-columns: 45% 45%;
    justify-content: space-between;
    max-width: 1280px;
  }
`;

export const SectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

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
    text-align: center;
    margin-top: 0;
    padding: 0;
    color: var(--blue);
    font-size: 1.2rem;
  }

  p {
    text-align: center;
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
  margin-bottom: 1rem;
  flex-direction: column;
  ${desktop} {
    flex-direction: row;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  align-self: center;
  align-items: stretch;
  justify-content: space-between;
  width: 100%;
  height: 2.5rem;
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

export const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  border: none;
  border-radius: 0 20px 20px 0;
  width: var(--button-fixed-width);
  flex-shrink: 0;
  cursor: pointer;
  background-color: var(--grey-light);
`;

export const StyledSearchButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 0 20px 20px 0;
  height: 100%;
  width: var(--button-fixed-width);
  cursor: pointer;
  background-color: var(--grey-light);
`;

export const StyledUnorderedList = styled.ul`
  list-style: none;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  margin: 0;
`;

export const StyledListItem = styled.li`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.5rem;
  margin-bottom: 0.5rem;
  border-top: 0.5px solid var(--grey);
  gap: var(--gap);
`;

export const TruncatedText = styled.span`
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
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
  justify-content: center;
  list-style-type: none;
  width: 100%;
  padding: 0 10px;
  gap: var(--gap);
  margin: 0;
`;

export const StyledNavigationItem = styled.li<{selected: boolean}>`
  padding: 0.5rem 0.5rem;
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
  margin: 1rem 0;
  padding: 0.75rem 1rem;
  background-color: #fff5f5;
  color: #c53030;
  border: 1px solid #feb2b2;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
`;
