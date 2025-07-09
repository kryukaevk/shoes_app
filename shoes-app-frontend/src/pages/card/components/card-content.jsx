import styled from 'styled-components';
import { Button } from '../../../components';

const CardContentContainer = ({
     className,
     totalSum,
     paymentForTheOrder,
     cardDetails,
     handleChange,
     cancelPayment,
}) => {
     return (
          <div className={className}>
               <div className="payment-card">
                    <h3>Ввод данных карты</h3>
                    <div className="order-total">
                         <p>
                              <strong>Общая сумма к оплате:</strong> {totalSum}{' '}
                              ₽
                         </p>
                    </div>
                    <form onSubmit={paymentForTheOrder}>
                         <div className="form-group">
                              <label htmlFor="cardNumber">Номер карты</label>
                              <input
                                   type="text"
                                   id="cardNumber"
                                   name="cardNumber"
                                   value={cardDetails.cardNumber}
                                   onChange={handleChange}
                                   placeholder="1234 5678 9012 3456"
                                   required
                              />
                         </div>
                         <div className="form-group">
                              <label htmlFor="expiryDate">Срок действия</label>
                              <input
                                   type="text"
                                   id="expiryDate"
                                   name="expiryDate"
                                   value={cardDetails.expiryDate}
                                   onChange={handleChange}
                                   placeholder="ММ/ГГ"
                                   required
                              />
                         </div>
                         <div className="form-group">
                              <label htmlFor="cvv">CVV</label>
                              <input
                                   type="text"
                                   id="cvv"
                                   name="cvv"
                                   value={cardDetails.cvv}
                                   onChange={handleChange}
                                   placeholder="123"
                                   required
                              />
                         </div>
                         <div className="form-group">
                              <label htmlFor="cardHolder">Имя владельца</label>
                              <input
                                   type="text"
                                   id="cardHolder"
                                   name="cardHolder"
                                   value={cardDetails.cardHolder}
                                   onChange={handleChange}
                                   placeholder="IVAN IVANOV"
                                   required
                              />
                         </div>
                         <div className="buttons">
                              <Button onClick={cancelPayment}>Отмена</Button>
                              <Button type="submit">Подтвердить оплату</Button>
                         </div>
                    </form>
                    <p className="warning">
                         *Данная форма является эмуляцией и не является частью
                         платежной системы
                    </p>
               </div>
          </div>
     );
};

export const CardContent = styled(CardContentContainer)`
     padding: 20px;
     max-width: 600px;
     margin: 0 auto;

     h3 {
          margin-bottom: 20px;
          font-size: 24px;
          font-weight: bold;
          text-align: center;
     }

     .form-group {
          margin-bottom: 15px;
     }

     .form-group label {
          display: block;
          margin-bottom: 5px;
          font-size: 16px;
     }

     .form-group input {
          width: 100%;
          padding: 10px;
          font-size: 16px;
          border: 1px solid #ddd;
          border-radius: 4px;
     }

     .buttons {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
     }

     .warning {
          font-size: 10px;
     }
`;
