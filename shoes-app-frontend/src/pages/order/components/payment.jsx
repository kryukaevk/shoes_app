import styled from 'styled-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentData } from '../../../actions';
import { Button } from '../../../components';
import { selectPaymentData } from '../../../selectors';

const PaymentContainer = ({ className, goToNextStep }) => {
     const dispatch = useDispatch();
     const paymentData = useSelector(selectPaymentData);
     const [paymentMethod, setPaymentMethod] = useState(
          paymentData.paymentMethod
     );

     const handlePaymentChange = (method) => {
          setPaymentMethod(method);
     };

     const handleSubmit = (e) => {
          e.preventDefault();
          dispatch(savePaymentData({ paymentMethod: paymentMethod }));
          goToNextStep();
     };

     return (
          <div className={className}>
               <h4>Выберите способ оплаты</h4>
               <div className="payment-options">
                    <label className="payment-option">
                         <input
                              type="radio"
                              name="payment"
                              value="cash"
                              checked={paymentMethod === 'cash'}
                              onChange={() => handlePaymentChange('cash')}
                         />
                         <span>Наличными при получении</span>
                    </label>
                    <label className="payment-option">
                         <input
                              type="radio"
                              name="payment"
                              value="card"
                              checked={paymentMethod === 'card'}
                              onChange={() => handlePaymentChange('card')}
                         />
                         <span>Картой при получении</span>
                    </label>
                    <label className="payment-option">
                         <input
                              type="radio"
                              name="payment"
                              value="online"
                              checked={paymentMethod === 'online'}
                              onChange={() => handlePaymentChange('online')}
                         />
                         <span>Картой онлайн</span>
                    </label>
               </div>
               <Button className="button" onClick={handleSubmit}>
                    Далее
               </Button>
          </div>
     );
};

export const Payment = styled(PaymentContainer)`
     padding: 20px;
     border-radius: 8px;

     h4 {
          margin-bottom: 15px;
          font-size: 18px;
          font-weight: bold;
     }

     .payment-options {
          display: flex;
          flex-direction: column;
          gap: 10px;
     }

     .payment-option {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 16px;
          cursor: pointer;

          input {
               width: 20px;
               height: 20px;
               cursor: pointer;
          }

          span {
               flex: 1;
          }
     }
     .button {
          margin-top: 20px;
     }
`;
