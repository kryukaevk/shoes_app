import React from 'react';
import { StyledLink } from '../StyledLink';
import styled from 'styled-components';

const IconLinkContainer = ({ to, icon, size = 21, ...props }) => {
     return (
          <StyledLink to={to} {...props}>
               {icon && React.cloneElement(icon, { size })}{' '}
          </StyledLink>
     );
};

export const IconLink = styled(IconLinkContainer)``;
