import styled from 'styled-components';

const RoundQuantityContainer = ({ className, allQuantity }) => {
     return (
          <div className={className}>
               <div>{allQuantity}</div>
          </div>
     );
};

export const RoundQuantity = styled(RoundQuantityContainer)`
     display: flex;
     align-items: center;
     justify-content: center;
     position: absolute;
     top: -10px;
     right: -13px;
     width: 20px;
     height: 18px;
     background-color: #ff0000;
     border-radius: 50%;
     color: #ffffff;
     font-weight: bold;
     font-size: 16px;
`;
