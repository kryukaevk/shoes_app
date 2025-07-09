import styled from 'styled-components';
import { Button, IconButton } from '../../../../components';
import { useDispatch } from 'react-redux';
import {
     CLOSE_MODAL,
     openModal,
     removeFromCart,
     saveOrderData,
     setOrderAccess,
     updateCart,
} from '../../../../actions';
import { FaTrashAlt } from 'react-icons/fa';
import { coutingQuantity } from './utils/counting-quantity';
import { useNavigate } from 'react-router-dom';

const CartContentContainer = ({ className, cartData }) => {
     const { items } = cartData;
     const dispatch = useDispatch();
     const navigate = useNavigate();

     const totalSum = items.reduce((acc, item) => acc + item.totalPrice, 0);
     const allQuantity = coutingQuantity(items);

     const onProductRemoveFromCart = (productId, size) => {
          dispatch(
               openModal({
                    text: 'Удалить товар из корзины?',
                    onConfirm: () => {
                         dispatch(removeFromCart(productId, size));
                         dispatch(CLOSE_MODAL);
                    },
                    onCancel: () => dispatch(CLOSE_MODAL),
               })
          );
     };

     const onChangeQuantity = (productId, size, newQuantity) => {
          if (newQuantity >= 1) {
               dispatch(updateCart(productId, size, newQuantity));
          }
     };

     const onPlaceAnOrder = () => {
          dispatch(setOrderAccess(true));

          dispatch(
               saveOrderData({
                    items,
                    totalSum,
                    allQuantity,
               })
          );
          navigate('/order');
     };

     return (
          <div className={className}>
               <h2>Корзина</h2>
               {items.map((item) => (
                    <div
                         key={`${item.productId}-${item.size}`}
                         className="cart-item"
                    >
                         <img
                              src={
                                   item.imageUrls && item.imageUrls.length > 0
                                        ? item.imageUrls[0]
                                        : '/placeholder-image.png'
                              }
                              alt={item.title}
                              className="item-image"
                         />
                         <div className="item-container">
                              <div className="item-details">
                                   <h3>{item.title}</h3>
                                   <p>Размер: {item.size}</p>
                                   <p>Цена: {item.totalPrice} ₽</p>
                                   <div className="quantity-controls">
                                        <Button
                                             onClick={() =>
                                                  onChangeQuantity(
                                                       item.productId,
                                                       item.size,
                                                       item.quantity - 1
                                                  )
                                             }
                                        >
                                             -
                                        </Button>
                                        <p>Количество: {item.quantity}</p>
                                        <Button
                                             onClick={() =>
                                                  onChangeQuantity(
                                                       item.productId,
                                                       item.size,
                                                       item.quantity + 1
                                                  )
                                             }
                                        >
                                             +
                                        </Button>
                                   </div>
                              </div>
                              <div className="cart-buttons">
                                   <IconButton
                                        icon={<FaTrashAlt />}
                                        size="20px"
                                        onClick={() =>
                                             onProductRemoveFromCart(
                                                  item.productId,
                                                  item.size
                                             )
                                        }
                                   >
                                        Удалить
                                   </IconButton>
                              </div>
                         </div>
                    </div>
               ))}
               <div className="total-amount-sum">
                    Общая сумма заказа: {totalSum} ₽
               </div>
               <div className="total-amount">
                    Общее количество заказов: {allQuantity}
               </div>
               <Button onClick={() => onPlaceAnOrder()}>Оформить заказ</Button>
          </div>
     );
};

export const CartContent = styled(CartContentContainer)`
     padding: 20px;
     width: 100%;
     max-width: 1200px;
     margin: 0 auto;

     h2 {
          margin-top: 30px;
          text-align: center;
     }

     .cart-item {
          display: flex;
          gap: 15px;
          margin-bottom: 20px;
          border-bottom: 1px solid #ddd;
          padding-bottom: 20px;
          flex-wrap: wrap;

          @media (max-width: 770px) {
               flex-direction: column;
               align-items: center;
          }
     }

     .item-image {
          width: 120px;
          height: 120px;
          object-fit: cover;

          @media (max-width: 480px) {
               width: 80px;
               height: 80px;
          }
     }

     .item-container {
          display: flex;
          flex: 1;
          gap: 15px;
          flex-wrap: wrap;

          @media (max-width: 770px) {
               flex-direction: column;
               align-items: center;
          }
     }

     .item-details {
          margin-top: 0;
          flex: 1;
          min-width: 200px;

          @media (max-width: 480px) {
               text-align: center;
               min-width: 100%;
          }

          & h3 {
               font-size: 18px;
               margin-bottom: 10px;

               @media (max-width: 480px) {
                    font-size: 16px;
               }
          }

          & p {
               font-size: 16px;
               margin: 5px 0;

               @media (max-width: 480px) {
                    font-size: 14px;
               }
          }
     }

     .quantity-controls {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 10px;

          @media (max-width: 480px) {
               justify-content: center;
          }
     }

     .total-amount,
     .total-amount-sum {
          text-align: center;
          padding-bottom: 20px;
          font-weight: bold;
          font-size: 18px;

          @media (max-width: 480px) {
               font-size: 16px;
          }
     }

     .cart-buttons {
          position: relative;
          top: 0;
          display: flex;
          align-items: center;

          @media (max-width: 480px) {
               justify-content: center;
               width: 100%;
          }
     }

     & > button {
          margin: 0 auto;
          display: block;

          @media (max-width: 480px) {
               width: 100%;
               max-width: 300px;
          }
     }
`;
