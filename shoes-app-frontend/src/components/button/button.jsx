/*eslint no-unused-vars: ["error", {"args": "none"}]*/
import styled from 'styled-components';

const ButtonContainer = ({ children, className, alignSelf, ...props }) => {
     return (
          <button className={className} {...props}>
               {children}
          </button>
     );
};

export const Button = styled(ButtonContainer)`
     padding: 8px 20px;
     background-color: #21a1f1;
     color: white;
     border: none;
     border-radius: 4px;
     cursor: pointer;
     text-decoration: none;
     align-self: ${({ alignSelf }) => alignSelf || 'auto'};

     &:hover {
          background-color: rgb(18, 122, 187);
     }

     &:focus {
          outline: none;
     }

     &:disabled {
          background-color: #cccccc;
          cursor: default;
     }
`;
