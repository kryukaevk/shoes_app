import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
     selectDeliveryData,
     selectIsLoading,
     selectIsOrderConfirmed,
     selectOrderData,
     selectPaymentData,
     selectRecipientData,
     selectUser,
} from '../../selectors';
import {
     CLOSE_MODAL,
     confirmTheOrderAsync,
     openPageOrderConfirmed,
     resetCart,
     resetOrderData,
} from '../../actions';
import { IsLoadingPage } from '../../components/IsLoading';
import { CardContent } from './components/card-content';
import { OrderConfirmedPage } from './components/order-confirmed-page';

const CardContainer = ({ className }) => {
     const navigate = useNavigate();
     const dispatch = useDispatch();
     const isLoading = useSelector(selectIsLoading);
     const recipientData = useSelector(selectRecipientData);
     const deliveryData = useSelector(selectDeliveryData);
     const paymentData = useSelector(selectPaymentData);
     const orderData = useSelector(selectOrderData);
     const user = useSelector(selectUser);
     const { totalSum } = useSelector(selectOrderData);
     const [cardDetails, setCardDetails] = useState({
          cardNumber: '',
          expiryDate: '',
          cvv: '',
          cardHolder: '',
     });
     const [isInitialLoading, setIsInitialLoading] = useState(true);
     const [isSubmittingLoading, setIsSubmittingLoading] = useState(false);

     const isOrderConfirmed = useSelector(selectIsOrderConfirmed);

     useEffect(() => {
          const timer = setTimeout(() => {
               setIsInitialLoading(false);
          }, 2000);

          return () => clearTimeout(timer);
     }, []);

     const handleChange = (e) => {
          const { name, value } = e.target;
          setCardDetails({ ...cardDetails, [name]: value });
     };

     const paymentForTheOrder = async (e) => {
          e.preventDefault();
          setIsSubmittingLoading(true);

          await confirmTheOrderAsync(
               recipientData,
               deliveryData,
               { ...paymentData, paymentMethod: 'Оплачен' },
               orderData,
               { name: user?.login || 'guest' }
          );

          setTimeout(() => {
               dispatch(
                    openPageOrderConfirmed({
                         isOrderConfirmed: true,
                         text: 'Ваш заказ оплачен, ожидайте звонка от менеджера для согласования заказа',
                         onConfirm: () => {
                              dispatch(CLOSE_MODAL);
                              navigate('/');
                         },
                    })
               );

               dispatch(resetCart());
               dispatch(resetOrderData());
               setIsSubmittingLoading(false);
          }, 2000);
     };

     const cancelPayment = () => {
          navigate('/order');
     };

     return (
          <div className={className}>
               {isLoading || isInitialLoading || isSubmittingLoading ? (
                    <IsLoadingPage />
               ) : (
                    <>
                         {!isOrderConfirmed ? (
                              <CardContent
                                   totalSum={totalSum}
                                   paymentForTheOrder={paymentForTheOrder}
                                   cardDetails={cardDetails}
                                   handleChange={handleChange}
                                   cancelPayment={cancelPayment}
                              />
                         ) : (
                              <OrderConfirmedPage />
                         )}
                    </>
               )}
          </div>
     );
};

export const Card = styled(CardContainer)``;
