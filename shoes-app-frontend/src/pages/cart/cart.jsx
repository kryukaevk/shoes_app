import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectCartData } from '../../selectors';
import { CartContent } from './components/cart-content/cart-content';
import { useEffect } from 'react';
import { EmptyCart } from './components/empty-cart/empty-cart';
import { loadCartFromStorage } from '../../actions';
import { Breadcrumbs } from '../../components';

const CartContainer = ({ className }) => {
     const cartData = useSelector(selectCartData);
     const dispatch = useDispatch();

     useEffect(() => {
          dispatch(loadCartFromStorage());
     }, [dispatch]);

     return (
          <div className={className}>
               <div>
                    <Breadcrumbs
                         mainTo="/"
                         homeText="Главная"
                         currentPage="Корзина"
                    />
                    {cartData.items.length > 0 ? (
                         <CartContent cartData={cartData} />
                    ) : (
                         <EmptyCart />
                    )}
               </div>
          </div>
     );
};

export const Cart = styled(CartContainer)``;
