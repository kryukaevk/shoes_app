import styled from 'styled-components';
import { Button } from '../../../components';

const OrderConfirmationContentContainer = ({
     className,
     items,
     allQuantity,
     totalSum,
     recipientData,
     deliveryData,
     paymentData,
     handleConfirmTheOder,
}) => {
     return (
          <div className={className}>
               <h3>Подтверждение заказа</h3>
               <div className="order-summary">
                    <div className="summary-section">
                         <h4>Товары в заказе</h4>
                         {items.map((item) => (
                              <div
                                   key={`${item.productId}-${item.size}`}
                                   className="cart-item"
                              >
                                   <img
                                        src={
                                             item.imageUrls && item.imageUrls[0]
                                        }
                                        alt={item.title}
                                        className="cart-item-image"
                                   />
                                   <div className="cart-item-details">
                                        <p>
                                             <strong>{item.title}</strong>
                                        </p>
                                        <p>Размер: {item.size}</p>
                                        <p>Количество: {item.quantity}</p>
                                        <p>Цена: {item.totalPrice} ₽</p>
                                   </div>
                              </div>
                         ))}
                         <div className="cart-totals">
                              <p>
                                   <strong>Общее количество товаров:</strong>{' '}
                                   {allQuantity}
                              </p>
                              <p>
                                   <strong>Общая сумма:</strong> {totalSum} ₽
                              </p>
                         </div>
                    </div>
                    <div className="summary-section">
                         <h4>Данные получателя</h4>
                         <p>
                              <strong>Имя:</strong> {recipientData.name}{' '}
                              {recipientData.surname}
                         </p>
                         <p>
                              <strong>Телефон:</strong> {recipientData.phone}
                         </p>
                         <p>
                              <strong>Email:</strong> {recipientData.email}
                         </p>
                    </div>
                    <div className="summary-section">
                         <h4>Данные доставки</h4>
                         <p>
                              <strong>Тип доставки:</strong>{' '}
                              {deliveryData.deliveryType === 'courier'
                                   ? 'Курьер'
                                   : 'Самовывоз'}
                         </p>
                         {deliveryData.deliveryType === 'courier' && (
                              <p>
                                   <strong>Адрес:</strong>{' '}
                                   {deliveryData.address}
                              </p>
                         )}
                         {deliveryData.deliveryType === 'pickup' && (
                              <p>
                                   <strong>Пункт самовывоза:</strong>{' '}
                                   {deliveryData.pickupPoint.address}
                              </p>
                         )}
                    </div>
                    <div className="summary-section">
                         <h4>Оплата</h4>
                         <p>
                              <strong>Способ оплаты:</strong>{' '}
                              {paymentData.paymentMethod === 'cash'
                                   ? 'Наличными при получении'
                                   : paymentData.paymentMethod === 'card'
                                     ? 'Картой при получении'
                                     : 'Картой онлайн'}
                         </p>
                    </div>
               </div>
               <Button onClick={handleConfirmTheOder}>Подтвердить заказ</Button>
          </div>
     );
};

export const OrderConfirmationContent = styled(
     OrderConfirmationContentContainer
)`
     padding: 20px;
     max-width: 600px;
     margin: 0 auto;

     h3 {
          margin-bottom: 20px;
          font-size: 24px;
          font-weight: bold;
          text-align: center;
     }

     .order-summary {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 20px;
     }

     .summary-section {
          border: 1px solid #ddd;
          border-radius: 4px;
          padding: 15px;
     }

     .summary-section h4 {
          color: grey;
          margin-bottom: 10px;
          font-size: 18px;
          font-weight: bold;
     }

     .summary-section p {
          margin: 5px 0;
          font-size: 16px;
     }

     .summary-section p strong {
          color: #333;
     }

     .cart-item {
          display: flex;
          gap: 15px;
          margin-bottom: 15px;
          align-items: center;
     }

     .cart-item-image {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 4px;
     }

     .cart-item-details {
          flex: 1;
     }

     .cart-item-details p {
          margin: 5px 0;
     }

     .cart-totals {
          margin-top: 15px;
          border-top: 1px solid #ddd;
          padding-top: 10px;
     }

     .cart-totals p {
          font-size: 16px;
          font-weight: bold;
     }

     button {
          display: block;
          margin: 0 auto;
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          background-color: #007bff;
          color: white;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s ease;

          &:hover {
               background-color: #0056b3;
          }
     }
`;
