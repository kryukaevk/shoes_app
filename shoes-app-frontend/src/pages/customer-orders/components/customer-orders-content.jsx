import styled from 'styled-components';
import { FaTrashAlt } from 'react-icons/fa';
import { Breadcrumbs, IconButton } from '../../../components';
import { useDispatch } from 'react-redux';
import { updateCustomerOrderAsync } from '../../../actions';
import { formatDate } from '../../../utils';

const CustomerOrdersContentContainer = ({
     className,
     customerOrders,
     onOrderRemoveFromCustomerOrders,
     filter,
     setFilter,
     currentPage,
     setCurrentPage,
     ordersPerPage,
     isAdmin,
}) => {
     const dispatch = useDispatch();

     const handleProcessedChange = (orderId, processed) => {
          dispatch(
               updateCustomerOrderAsync(orderId, { processed }, customerOrders)
          );
     };

     const sortedOrders = [...customerOrders].sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
     });

     const filteredOrders = sortedOrders.filter((order) => {
          if (filter === 'all') return true;
          if (filter === 'processed') return order.processed;
          if (filter === 'unprocessed') return !order.processed;
          return true;
     });

     const indexOfLastOrder = currentPage * ordersPerPage;
     const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
     const currentOrders = filteredOrders.slice(
          indexOfFirstOrder,
          indexOfLastOrder
     );

     const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

     const nextPage = () => {
          if (currentPage < totalPages) setCurrentPage(currentPage + 1);
     };

     const prevPage = () => {
          if (currentPage > 1) setCurrentPage(currentPage - 1);
     };

     return (
          <div className={className}>
               <Breadcrumbs
                    mainTo="/"
                    homeText="Главная"
                    currentPage="Заказы покупателей"
               />
               <h3>Заказы клиентов</h3>
               <div className="filter-buttons">
                    <button onClick={() => setFilter('all')}>Все</button>
                    <button onClick={() => setFilter('processed')}>
                         Обработанные
                    </button>
                    <button onClick={() => setFilter('unprocessed')}>
                         Необработанные
                    </button>
               </div>
               {currentOrders.length === 0 ? (
                    <div className="no-orders">
                         <p>Нет заказов</p>
                    </div>
               ) : (
                    currentOrders.map((order) => (
                         <div key={order.id} className="order">
                              <h4>Заказ #{order.id}</h4>
                              <p>
                                   <strong>Пользователь:</strong> {order.login}
                              </p>
                              <p>
                                   <strong>Получатель:</strong>{' '}
                                   {order.recipient.name}{' '}
                                   {order.recipient.surname}
                              </p>
                              <p>
                                   <strong>Телефон:</strong>{' '}
                                   {order.recipient.phone}
                              </p>
                              <p>
                                   <strong>Email:</strong>{' '}
                                   {order.recipient.email}
                              </p>
                              <p>
                                   <strong>Тип доставки:</strong>{' '}
                                   {order.delivery.deliveryType === 'courier'
                                        ? 'Курьер'
                                        : 'Самовывоз'}
                              </p>
                              {order.delivery.deliveryType === 'courier' && (
                                   <p>
                                        <strong>Адрес доставки:</strong>{' '}
                                        {order.delivery.address}
                                   </p>
                              )}
                              {order.delivery.deliveryType === 'pickup' && (
                                   <p>
                                        <strong>Пункт самовывоза:</strong>{' '}
                                        {order.delivery.pickupPoint}
                                   </p>
                              )}
                              <p>
                                   <strong>Способ оплаты:</strong>{' '}
                                   {order.payment.paymentMethod === 'cash'
                                        ? 'Наличными при получении'
                                        : order.payment.paymentMethod === 'card'
                                          ? 'Картой при получении'
                                          : order.payment.paymentMethod ===
                                              'Оплачен'
                                            ? 'Оплачен'
                                            : 'Картой онлайн'}
                              </p>
                              <h5>Товары:</h5>
                              <ul>
                                   {order.items.map((item, index) => (
                                        <li key={index}>
                                             <img
                                                  src={item.imageUrls[0]}
                                                  alt={item.title}
                                                  style={{
                                                       width: '50px',
                                                       height: '50px',
                                                       marginRight: '10px',
                                                  }}
                                             />
                                             <span>
                                                  {item.title} (Размер:{' '}
                                                  {item.size}, Кол-во:{' '}
                                                  {item.quantity}, Цена:{' '}
                                                  {item.totalPrice} руб.)
                                             </span>
                                        </li>
                                   ))}
                              </ul>
                              <p>
                                   <strong>Общая сумма:</strong>{' '}
                                   {order.totalSum} руб.
                              </p>
                              <p>
                                   <strong>Общее количество:</strong>{' '}
                                   {order.totalQuantity}
                              </p>
                              <p>
                                   <strong>Дата создания:</strong>{' '}
                                   {formatDate(order.createdAt)}
                              </p>
                              <p>
                                   <strong>Статус:</strong>{' '}
                                   {order.processed
                                        ? 'Обработан'
                                        : 'Не обработан'}
                                   <input
                                        type="checkbox"
                                        checked={order.processed}
                                        onChange={(e) =>
                                             handleProcessedChange(
                                                  order.id,
                                                  e.target.checked
                                             )
                                        }
                                        style={{ marginLeft: '10px' }}
                                   />
                              </p>
                              <div className="cart-buttons">
                                   {isAdmin && (
                                        <IconButton
                                             icon={<FaTrashAlt />}
                                             size="20px"
                                             onClick={() =>
                                                  onOrderRemoveFromCustomerOrders(
                                                       order.id
                                                  )
                                             }
                                        >
                                             Удалить
                                        </IconButton>
                                   )}
                              </div>
                         </div>
                    ))
               )}
               <div className="pagination">
                    <button onClick={prevPage} disabled={currentPage === 1}>
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
          </div>
     );
};

export const CustomerOrdersContent = styled(CustomerOrdersContentContainer)`
     .order {
          border: 1px solid #ccc;
          margin: 20px;
          padding: 40px;
          border-radius: 5px;
          position: relative;
     }
     h3 {
          font-size: 28px;
          font-weight: 600;
          color: #333;
          text-align: center;
          margin-bottom: 30px;

          @media (max-width: 480px) {
               font-size: 20px;
               margin-top: 60px;
          }
     }
     h4 {
          margin: 0 0 10px;
     }
     ul {
          list-style: none;
          padding: 0;
     }
     li {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
     }
     p {
          margin: 5px 0;
     }
     .cart-buttons {
          position: absolute;
          top: 10px;
          right: 10px;
     }
     .filter-buttons {
          margin-bottom: 20px;
          text-align: center;
     }
     .filter-buttons button {
          margin: 0 10px;
          padding: 8px 16px;
          font-size: 16px;
          cursor: pointer;
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
     .pagination span {
          font-size: 16px;
     }

     .no-orders {
          text-align: center;
          padding: 40px;
          font-size: 18px;
     }
`;
