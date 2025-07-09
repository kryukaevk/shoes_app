import styled from 'styled-components';

const ErrorMessageContainer = ({ className, isOrderAllowed, error }) => {
     return (
          <>
               {error ? (
                    <div className={className}>Ошибка: {error}</div>
               ) : (
                    !isOrderAllowed && (
                         <div className={className}>
                              Ошибка: Доступ к этой странице возможен только
                              через корзину.
                         </div>
                    )
               )}
          </>
     );
};

export const ErrorMessage = styled(ErrorMessageContainer)`
     width: 520px;
     margin: 100px;
     color: #d32f2f;
     font-size: 16px;
     text-align: center;
     padding: 20px;
     border: 1px solid #d32f2f;
     border-radius: 4px;
     background-color: #ffebee;
`;
