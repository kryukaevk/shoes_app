import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
     selectIsLoading,
     selectIsOrderAllowed,
     selectIsOrderConfirmed,
} from '../../selectors';
import { useEffect, useState } from 'react';
import { ErrorMessage, OrderContent } from './components';
import { handlerOrderData } from '../../actions';
import { IsLoadingPage } from '../../components/IsLoading';
import { OrderConfirmedPage } from '../card/components/order-confirmed-page';

const OrderContainer = ({ className }) => {
     const dispatch = useDispatch();
     const isOrderAllowed = useSelector(selectIsOrderAllowed);
     const [steps, setSteps] = useState([]);
     const isLoading = useSelector(selectIsLoading);
     const [error, setError] = useState(null);
     const [isSubmittingOrderLoading, setIsSubmittingOrderLoading] =
          useState(false);

     const isOrderConfirmed = useSelector(selectIsOrderConfirmed);

     useEffect(() => {
          dispatch(handlerOrderData(setError, setSteps));
     }, [dispatch, setError]);

     return (
          <div className={className}>
               {isLoading || isSubmittingOrderLoading ? (
                    <IsLoadingPage />
               ) : error || !isOrderAllowed ? (
                    <div className="error-message">
                         <ErrorMessage
                              isOrderAllowed={isOrderAllowed}
                              error={error}
                         />
                    </div>
               ) : !isOrderConfirmed ? (
                    <OrderContent
                         steps={steps}
                         setIsSubmittingOrderLoading={
                              setIsSubmittingOrderLoading
                         }
                    />
               ) : (
                    <OrderConfirmedPage />
               )}
          </div>
     );
};

export const Order = styled(OrderContainer)`
     .error-message {
          display: flex;
          justify-content: center;
     }
`;
