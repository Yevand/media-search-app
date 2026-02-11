import {useLocation} from 'react-router-dom';
import {
  StyledNavigationHeader,
  StyledNavigationList,
  StyledNavigationItem,
  StyledLink,
} from '../styles/styled-components';

const links = [
  {path: '/', name: 'home'},
  {path: '/music', name: 'music'},
  {path: '/movies', name: 'movies'},
];

// @TODO navbar should be sticky
export const NavigationBar = () => {
  const location = useLocation();

  return (
    <StyledNavigationHeader>
      <StyledNavigationList>
        {links.map((link) => (
          <StyledNavigationItem selected={link.path === location.pathname}>
            <StyledLink
              id={link.name}
              to={link.path}
              selected={link.path === location.pathname}
            >
              {link.name}
            </StyledLink>
          </StyledNavigationItem>
        ))}
      </StyledNavigationList>
    </StyledNavigationHeader>
  );
};
