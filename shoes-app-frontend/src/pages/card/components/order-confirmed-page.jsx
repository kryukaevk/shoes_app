import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {
     selectPageOnConfirmedOrder,
     selectTextOrder,
} from '../../../selectors';
import { Button } from '../../../components';

const OrderConfirmedPageContainer = ({ className }) => {
     const textOrder = useSelector(selectTextOrder);
     const onConfirm = useSelector(selectPageOnConfirmedOrder);

     return (
          <div className={className}>
               <div className="box">
                    <h3>{textOrder}</h3>
                    <div className="buttons">
                         <Button width="120px" onClick={onConfirm}>
                              Вернуться на главную
                         </Button>
                    </div>
               </div>
          </div>
     );
};

export const OrderConfirmedPage = styled(OrderConfirmedPageContainer)`
     padding: 20px;
     max-width: 600px;
     margin: 0 auto;
     min-height: 30vh;
     display: flex;
     align-items: center;
     justify-content: center;

     h3 {
          color: black;
          text-align: center;
     }

     .box {
          background-color: #fff;
          border: 1px solid #000;
          border-radius: 4px;
          padding: 20px 30px;
          text-align: center;
     }

     .buttons {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 15px;
     }
`;
