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

export const NavigationBar = () => {
  const location = useLocation();

  return (
    <StyledNavigationHeader>
      <StyledNavigationList>
        {links.map(({name, path}) => (
          <StyledNavigationItem
            key={name}
            selected={path === location.pathname}
          >
            <StyledLink
              id={name}
              to={path}
              selected={path === location.pathname}
            >
              {name}
            </StyledLink>
          </StyledNavigationItem>
        ))}
      </StyledNavigationList>
    </StyledNavigationHeader>
  );
};
