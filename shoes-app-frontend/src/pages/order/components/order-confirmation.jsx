import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
     selectDeliveryData,
     selectOrderData,
     selectPaymentData,
     selectRecipientData,
     selectUser,
} from '../../../selectors';
import {
     CLOSE_MODAL,
     confirmTheOrderAsync,
     openPageOrderConfirmed,
     resetCart,
     resetOrderData,
} from '../../../actions';
import { useNavigate } from 'react-router-dom';
import { OrderConfirmationContent } from './order-confirmation-content';

const OrderConfirmationContainer = ({
     className,
     setIsSubmittingOrderLoading,
}) => {
     const dispatch = useDispatch();
     const navigate = useNavigate();

     const recipientData = useSelector(selectRecipientData);
     const deliveryData = useSelector(selectDeliveryData);
     const paymentData = useSelector(selectPaymentData);

     const orderData = useSelector(selectOrderData);
     const user = useSelector(selectUser);

     const { items, totalSum, allQuantity } = orderData;

     const handleConfirmTheOder = async () => {
          setIsSubmittingOrderLoading(true);
          try {
               if (paymentData.paymentMethod === 'online') {
                    navigate('/card');
               } else {
                    setTimeout(async () => {
                         try {
                              await confirmTheOrderAsync(
                                   recipientData,
                                   deliveryData,
                                   paymentData,
                                   orderData,
                                   { name: user?.login || 'guest' }
                              );
                              dispatch(
                                   openPageOrderConfirmed({
                                        isOrderConfirmed: true,
                                        text: 'Ваш заказ подтверждён, ожидайте звонка от менеджера для согласования заказа',
                                        onConfirm: () => {
                                             dispatch(CLOSE_MODAL);
                                             navigate('/');
                                        },
                                   })
                              );
                              dispatch(resetCart());
                              dispatch(resetOrderData());
                         } catch (error) {
                              console.error(
                                   'Ошибка при подтверждении заказа:',
                                   error
                              );
                              dispatch(
                                   openPageOrderConfirmed({
                                        isOrderConfirmed: false,
                                        text: `Ошибка при оформлении заказа: ${error.message}`,
                                        onConfirm: () => dispatch(CLOSE_MODAL),
                                   })
                              );
                         } finally {
                              setIsSubmittingOrderLoading(false);
                         }
                    }, 2000);
               }
          } catch (error) {
               console.error('Ошибка при обработке заказа:', error);
               setIsSubmittingOrderLoading(false);
          }
     };

     return (
          <div className={className}>
               <OrderConfirmationContent
                    items={items}
                    allQuantity={allQuantity}
                    totalSum={totalSum}
                    recipientData={recipientData}
                    deliveryData={deliveryData}
                    paymentData={paymentData}
                    handleConfirmTheOder={handleConfirmTheOder}
               />
          </div>
     );
};

export const OrderConfirmation = styled(OrderConfirmationContainer)`
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
