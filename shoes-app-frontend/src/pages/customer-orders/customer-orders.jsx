import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
     selectCustomerOrders,
     selectCustomerOrdersError,
     selectIsLoading,
     selectUserRole,
} from '../../selectors';
import {
     CLOSE_MODAL,
     loadCustomerOrdersAsync,
     openModal,
     removeFromCustomerOrdersAsync,
} from '../../actions';
import { CustomerOrdersContent } from './components';
import { IsLoadingPage } from '../../components/IsLoading';
import { Error } from '../../components';
import { ROLE } from '../../constants';
import { checkAccess } from '../../utils/check-access';

const CustomerOrdersContainer = ({ className }) => {
     const dispatch = useDispatch();
     const customerOrders = useSelector(selectCustomerOrders);
     const customerOrdersError = useSelector(selectCustomerOrdersError);
     const isLoading = useSelector(selectIsLoading);
     const [filter, setFilter] = useState('all');
     const [currentPage, setCurrentPage] = useState(1);
     const [ordersPerPage] = useState(5);

     const roleId = useSelector(selectUserRole);
     const isAdmin = checkAccess([ROLE.ADMIN], roleId);

     useEffect(() => {
          dispatch(loadCustomerOrdersAsync());
     }, [dispatch]);

     const onOrderRemoveFromCustomerOrders = (orderId) => {
          dispatch(
               openModal({
                    text: 'Вы действительно хотите удалить заказ?',
                    onConfirm: () => {
                         dispatch(removeFromCustomerOrdersAsync(orderId));
                         dispatch(CLOSE_MODAL);
                    },
                    onCancel: () => dispatch(CLOSE_MODAL),
               })
          );
     };

     return (
          <div className={className}>
               {isLoading ? (
                    <IsLoadingPage />
               ) : customerOrdersError ? (
                    <Error error={customerOrdersError} />
               ) : (
                    <CustomerOrdersContent
                         customerOrders={customerOrders}
                         onOrderRemoveFromCustomerOrders={
                              onOrderRemoveFromCustomerOrders
                         }
                         filter={filter}
                         setFilter={setFilter}
                         currentPage={currentPage}
                         setCurrentPage={setCurrentPage}
                         ordersPerPage={ordersPerPage}
                         isAdmin={isAdmin}
                    />
               )}
          </div>
     );
};

export const CustomerOrders = styled(CustomerOrdersContainer)``;
