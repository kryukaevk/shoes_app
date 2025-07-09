import styled from 'styled-components';
import { StyledLink } from '../StyledLink';

const TextContainer = styled.div`
     color: white;
     cursor: pointer;

     &:hover {
          color: #21a1f1;
     }

     &:focus {
          outline: none;
     }
`;

export const IconTextLink = ({ to, text, containerStyles, ...props }) => {
     return (
          <StyledLink to={to} {...props}>
               <TextContainer style={containerStyles}>{text}</TextContainer>
          </StyledLink>
     );
};
