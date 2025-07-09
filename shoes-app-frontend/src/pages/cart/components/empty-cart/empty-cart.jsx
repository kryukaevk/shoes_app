import styled from 'styled-components';

const EmptyCartContainer = ({ className }) => {
     return (
          <div className={className}>
               <h3>Ваша корзина пуста</h3>
          </div>
     );
};

export const EmptyCart = styled(EmptyCartContainer)`
     display: flex;
     justify-content: center;
     padding: 200px;
`;
