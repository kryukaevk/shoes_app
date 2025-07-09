import styled from 'styled-components';

const ErrorContainer = ({ className, error }) => {
     return (
          <div className={className}>
               <h3>Ошибка</h3>
               <p>{error}</p>
          </div>
     );
};

export const Error = styled(ErrorContainer)`
     display: flex;
     flex-direction: column;
     align-items: center;
     font-size: 20px;
     padding: 40px;
`;
