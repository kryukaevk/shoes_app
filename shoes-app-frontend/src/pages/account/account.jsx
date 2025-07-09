import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserLogin } from '../../selectors';
import styled from 'styled-components';
import { IsLoadingPage } from '../../components/IsLoading';
import { Breadcrumbs } from '../../components';
import { loadHistoryOrders } from '../../actions';
import { formatDate } from '../../utils';

const OrdersContainer = styled.div`
     padding: 20px;
     max-width: 900px;
     margin: 0 auto;
     box-sizing: border-box;

     @media (max-width: 770px) {
          padding: 15px;
     }

     @media (max-width: 480px) {
          padding: 10px;
     }

     & h3 {
          font-size: 24px;
          text-align: center;
          margin-bottom: 20px;

          @media (max-width: 480px) {
               font-size: 20px;
               margin-top: 45px;
          }
     }

     & h4 {
          font-size: 20px;
          margin-bottom: 15px;

          @media (max-width: 480px) {
               font-size: 18px;
          }
     }

     .pagination {
          margin-top: 20px;
          margin-bottom: 20px;
          text-align: center;
     }

     .pagination button {
          margin: 0 10px;
          padding: 8px 16px;
          font-size: 16px;
          cursor: pointer;
     }

     .pagination button:disabled {
          opacity: 0.5;
     }

     .pagination span {
          font-size: 16px;
     }
`;

const OrderCard = styled.div`
     border: 1px solid #ccc;
     border-radius: 8px;
     padding: 15px;
     margin-bottom: 15px;

     @media (max-width: 480px) {
          padding: 10px;
     }
`;

const OrderHeader = styled.h4`
     margin: 0 0 10px;
     font-size: 18px;

     @media (max-width: 480px) {
          font-size: 16px;
     }
`;

const OrderItem = styled.div`
     display: flex;
     gap: 10px;
     margin-bottom: 10px;
     flex-wrap: wrap;

     @media (max-width: 480px) {
          flex-direction: column;
          align-items: center;
     }

     & img {
          width: 60px;
          height: 60px;
          object-fit: cover;

          @media (max-width: 480px) {
               width: 50px;
               height: 50px;
          }
     }

     & div {
          font-size: 16px;

          @media (max-width: 480px) {
               font-size: 14px;
               text-align: center;
          }
     }
`;

const NoOrders = styled.p`
     text-align: center;
     color: #888;
     font-size: 16px;

     @media (max-width: 480px) {
          font-size: 14px;
     }
`;

export const Account = () => {
     const login = useSelector(selectUserLogin);
     const [orders, setOrders] = useState([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);
     const [currentPage, setCurrentPage] = useState(1);
     const ordersPerPage = 5;

     useEffect(() => {
          loadHistoryOrders(login, setOrders, setError, setLoading);
     }, [login]);

     const sortedOrders = [...orders].sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
     });

     const indexOfLastOrder = currentPage * ordersPerPage;
     const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
     const currentOrders = sortedOrders.slice(
          indexOfFirstOrder,
          indexOfLastOrder
     );
     const totalPages = Math.ceil(sortedOrders.length / ordersPerPage);

     const nextPage = () => {
          if (currentPage < totalPages) setCurrentPage(currentPage + 1);
     };

     const prevPage = () => {
          if (currentPage > 1) setCurrentPage(currentPage - 1);
     };

     return (
          <OrdersContainer>
               <Breadcrumbs
                    mainTo="/"
                    homeText="Главная"
                    currentPage="Личный кабинет"
               />
               <h3>Личный кабинет пользователя {login}</h3>
               <h4>История заказов</h4>
               {loading ? (
                    <IsLoadingPage />
               ) : error ? (
                    <p>Ошибка: {error}</p>
               ) : orders.length === 0 ? (
                    <NoOrders>У вас пока нет заказов</NoOrders>
               ) : (
                    <>
                         {currentOrders.map((order) => (
                              <OrderCard key={order.id}>
                                   <OrderHeader>
                                        Заказ от {formatDate(order.createdAt)}{' '}
                                        (ID: {order.id})
                                   </OrderHeader>
                                   <div>
                                        <strong>Получатель:</strong>{' '}
                                        {order.recipient.name}{' '}
                                        {order.recipient.surname}
                                   </div>
                                   <div>
                                        <strong>
                                             {order.delivery.deliveryType ===
                                             'pickup'
                                                  ? 'Пункт выдачи:'
                                                  : 'Адрес доставки:'}
                                        </strong>{' '}
                                        {order.delivery.deliveryType ===
                                        'pickup'
                                             ? order.delivery.pickupPoint
                                             : order.delivery.address}
                                   </div>
                                   <div>
                                        <strong>Способ оплаты:</strong>{' '}
                                        {order.payment.paymentMethod === 'cash'
                                             ? 'Наличными при получении'
                                             : order.payment.paymentMethod ===
                                                 'card'
                                               ? 'Картой при получении'
                                               : order.payment.paymentMethod ===
                                                   'Оплачен'
                                                 ? 'Оплачен'
                                                 : 'Картой онлайн'}
                                   </div>
                                   <div>
                                        <strong>Товары:</strong>
                                        {order.items.map((item, index) => (
                                             <OrderItem key={index}>
                                                  <img
                                                       src={item.imageUrls[0]}
                                                       alt={item.title}
                                                       width="50"
                                                  />
                                                  <div>
                                                       {item.title} (Размер:{' '}
                                                       {item.size}, Кол-во:{' '}
                                                       {item.quantity})
                                                       <br />
                                                       Цена: {item.totalPrice} ₽
                                                  </div>
                                             </OrderItem>
                                        ))}
                                   </div>
                                   <div>
                                        <strong>Общая сумма:</strong>{' '}
                                        {order.totalSum} ₽
                                   </div>
                                   <div>
                                        <strong>Общее количество:</strong>{' '}
                                        {order.totalQuantity} шт.
                                   </div>
                              </OrderCard>
                         ))}
                         <div className="pagination">
                              <button
                                   onClick={prevPage}
                                   disabled={currentPage === 1}
                              >
                                   Назад
                              </button>
                              <span>
                                   Страница {currentPage} из {totalPages}
                              </span>
                              <button
                                   onClick={nextPage}
                                   disabled={currentPage === totalPages}
                              >
                                   Вперед
                              </button>
                         </div>
                    </>
               )}
          </OrdersContainer>
     );
};
