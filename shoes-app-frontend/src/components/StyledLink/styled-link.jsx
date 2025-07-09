import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
     text-decoration: none;
     color: #21a1f1;

     &:hover {
          color: rgb(18, 122, 187);
     }

     &:focus {
          outline: none;
     }
`;
