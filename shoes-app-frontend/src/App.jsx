import { Route, Routes } from 'react-router-dom';
import {
     Error,
     Footer,
     Header,
     Home,
     ModalBeforeAction,
     PrivateRouteAccount,
     PrivateRouteCustomerOrders,
} from './components';
import {
     Authorization,
     Account,
     Registration,
     Users,
     Product,
     Catalog,
     Cart,
     Order,
     Card,
     CustomerOrders,
} from './pages';
import styled from 'styled-components';
import { useEffect, useLayoutEffect } from 'react';
import { loadCartFromStorage, setUser } from './actions';
import { useDispatch } from 'react-redux';

const AppContainer = styled.div`
     display: flex;
     flex-direction: column;
     min-height: 100vh;
     width: 100vw;
     max-width: 100vw;
     margin: 0;
     padding: 0;
     box-sizing: border-box;
     overflow-x: hidden;
`;

const Page = styled.main`
     position: relative;
     flex: 1;
     width: 100%;
     box-sizing: border-box;
     padding-top: 60px;

     @media (max-width: 768px) {
          padding-top: 50px;
     }

     @media (max-width: 480px) {
          padding-top: 40px;
     }
`;

const App = () => {
     const dispatch = useDispatch();

     useLayoutEffect(() => {
          const currentUserDataJSON = localStorage.getItem('userData');

          if (!currentUserDataJSON) {
               return;
          }

          const currentUserData = JSON.parse(currentUserDataJSON);

          dispatch(
               setUser({
                    ...currentUserData,
                    roleId: Number(currentUserData.roleId),
               })
          );
     }, [dispatch]);

     useEffect(() => {
          dispatch(loadCartFromStorage());
     }, [dispatch]);

     return (
          <AppContainer>
               <Header />
               <Page>
                    <Routes>
                         <Route path="/" element={<Home />} />
                         <Route path="/cart" element={<Cart />} />
                         <Route path="/cart/:id" element={<Cart />} />
                         <Route path="/login" element={<Authorization />} />
                         <Route
                              path="/account"
                              element={<PrivateRouteAccount />}
                         >
                              <Route path=":login" element={<Account />} />
                         </Route>
                         <Route path="/register" element={<Registration />} />
                         <Route path="/catalog" element={<Catalog />} />
                         <Route path="/users" element={<Users />} />
                         <Route path="/product/:id" element={<Product />} />
                         <Route
                              path="/product/:id/edit"
                              element={<Product />}
                         />
                         <Route path="/product" element={<Product />} />
                         <Route path="/order" element={<Order />} />
                         <Route path="/card" element={<Card />} />
                         <Route
                              path="/customer-orders"
                              element={<PrivateRouteCustomerOrders />}
                         >
                              <Route index element={<CustomerOrders />} />
                         </Route>
                         <Route path="*" element={<Error />} />
                    </Routes>
               </Page>
               <Footer />
               <ModalBeforeAction />
          </AppContainer>
     );
};

export default App;
