/*eslint no-unused-vars: ["error", {"args": "none"}]*/
import styled from 'styled-components';
import React from 'react';

export const IconLabelContainer = ({
     className,
     icon,
     size = 20,
     margin,
     ...props
}) => {
     return (
          <div className={className} {...props}>
               {icon &&
                    React.cloneElement(icon, {
                         size,
                         style: { margin: margin || '0' },
                    })}{' '}
          </div>
     );
};

export const IconLabel = styled(IconLabelContainer)``;
