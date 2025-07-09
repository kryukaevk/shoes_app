import styled from 'styled-components';
import { ROLE } from '../constants';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserRole, selectUserLogin, selectCartData } from '../selectors';
import { logout } from '../actions';
import {
     FaShoppingCart,
     FaUsers,
     FaSignInAlt,
     FaSignOutAlt,
     FaShoppingBag,
     FaPlus,
     FaFileAlt,
} from 'react-icons/fa';
import { IconLink, IconTextLink } from './icon';
import { SearchMain } from '../pages/catalog/components';
import { RoundQuantity } from './round-quantity';
import { coutingQuantity } from '../pages/cart/components/cart-content/utils/counting-quantity';
import { checkAccess } from '../utils/check-access';

const HeaderContainer = styled.header`
     display: flex;
     justify-content: space-between;
     align-items: center;
     padding: 20px;
     background-color: #272d39;
     position: fixed;
     top: 0;
     left: 0;
     right: 0;
     width: 100%;
     box-sizing: border-box;
     z-index: 20;
`;

const LeftContainer = styled.div`
     display: flex;
     align-items: center;
     gap: 18px;
`;

const RightContainer = styled.div`
     display: flex;
     justify-content: flex-end;
     align-items: center;
     gap: 10px;
`;

const LogoContainer = styled.div`
     position: absolute;
     top: 23px;
     right: 46%;
     @media (max-width: 770px) {
          display: none;
     }
`;

const SearchContainer = styled.div`
     @media (max-width: 770px) {
          display: none;
     }
`;

export const Header = () => {
     const roleId = useSelector(selectUserRole);
     const login = useSelector(selectUserLogin);
     const cartData = useSelector(selectCartData);
     const { items } = cartData;
     const allQuantity = coutingQuantity(items);
     const dispatch = useDispatch();

     const onLogout = () => {
          dispatch(logout());
     };

     const isEmployee = checkAccess([ROLE.ADMIN, ROLE.MODERATOR], roleId);
     const isAdmin = checkAccess([ROLE.ADMIN], roleId);
     return (
          <HeaderContainer>
               <LeftContainer>
                    <IconLink
                         to="/catalog"
                         icon={<FaShoppingBag />}
                         size={22}
                    ></IconLink>
                    <SearchContainer>
                         <SearchMain />
                    </SearchContainer>
               </LeftContainer>
               <LogoContainer>
                    <IconTextLink
                         to="/"
                         text="O B U V C L A S S I C"
                    ></IconTextLink>
               </LogoContainer>
               <RightContainer>
                    {roleId === ROLE.GUEST ? (
                         <IconLink
                              to="/login"
                              icon={<FaSignInAlt />}
                         ></IconLink>
                    ) : (
                         <>
                              <IconTextLink
                                   to={`/account/${login}`}
                                   text={login}
                                   containerStyles={{
                                        marginBottom: '7px',
                                        fontSize: '18px',
                                   }}
                              ></IconTextLink>
                              <IconLink
                                   to="/"
                                   icon={<FaSignOutAlt />}
                                   onClick={onLogout}
                              ></IconLink>
                         </>
                    )}
                    {isEmployee && (
                         <>
                              <IconLink
                                   to="/customer-orders"
                                   icon={<FaFileAlt />}
                              ></IconLink>
                              <IconLink
                                   to="/product"
                                   icon={<FaPlus />}
                              ></IconLink>
                         </>
                    )}
                    {isAdmin && (
                         <IconLink to="/users" icon={<FaUsers />}></IconLink>
                    )}
                    <div style={{ position: 'relative' }}>
                         <IconLink
                              to="/cart"
                              icon={<FaShoppingCart />}
                         ></IconLink>
                         {allQuantity > 0 && (
                              <RoundQuantity allQuantity={allQuantity} />
                         )}
                    </div>
               </RightContainer>
          </HeaderContainer>
     );
};
