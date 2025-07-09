import React from 'react';
import styled from 'styled-components';

const IconButtonContainer = ({
     className,
     icon,
     size = 21,
     disabled = false,
     marginTop,
     ...props
}) => {
     const updatedProps = disabled ? { ...props, onClick: undefined } : props;

     return (
          <div className={className}>
               {icon &&
                    React.cloneElement(icon, {
                         size,
                         style: { marginTop },
                         ...updatedProps,
                    })}
          </div>
     );
};

export const IconButton = styled(IconButtonContainer)`
     cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
     opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
     pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
     position: relative;
     align-self: ${({ alignSelf }) => alignSelf || 'auto'};
     margin-top: ${({ marginTop }) => marginTop || '0px'};

     &:hover {
          color: ${({ disabled }) => (disabled ? 'inherit' : '#21a1f1')};
     }
`;
