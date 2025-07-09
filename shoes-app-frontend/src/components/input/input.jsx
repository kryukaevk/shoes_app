/*eslint no-unused-vars: ["error", {"args": "none"}]*/
import styled from 'styled-components';

const InputContainer = ({
     className,
     width,
     height,
     marginBottom,
     border,
     radius,
     placeholder,
     ...props
}) => {
     return (
          <input className={className} {...props} placeholder={placeholder} />
     );
};

export const Input = styled(InputContainer)`
     height: ${({ height }) => height || '25px'};
     padding: 8px;
     border: ${({ border }) => border || '1px solid #ccc'};
     font-size: 15px;
     border-radius: ${({ radius }) => radius || '4px'};
     width: ${({ width }) => width || 'auto'};
     margin-bottom: ${({ marginBottom }) => marginBottom || 'auto'};
`;
