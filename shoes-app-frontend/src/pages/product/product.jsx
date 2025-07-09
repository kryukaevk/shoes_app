import { useEffect } from 'react';
import { useMatch, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ProductContent, ProductForm, Comments } from './components';
import { useDispatch } from 'react-redux';
import { loadProductAsync, RESET_PRODUCT_DATA } from '../../actions';
import { useSelector } from 'react-redux';
import {
     selectProduct,
     selectIsLoading,
     selectUserRole,
} from '../../selectors';
import { IsLoadingPage } from '../../components/IsLoading';
import { ROLE } from '../../constants';
import { checkAccess } from '../../utils/check-access';

const ProductContainer = ({ className }) => {
     const dispatch = useDispatch();
     const params = useParams();
     const isEditing = useMatch('/product/:id/edit');
     const isCreating = useMatch('/product');
     const product = useSelector(selectProduct);
     const isLoading = useSelector(selectIsLoading);
     const navigate = useNavigate();

     const roleId = useSelector(selectUserRole);
     const isEmployee = checkAccess([ROLE.ADMIN, ROLE.MODERATOR], roleId);

     useEffect(() => {
          if ((isCreating || isEditing) && !isEmployee) {
               navigate('/');
               return;
          }

          if (isCreating) {
               dispatch(RESET_PRODUCT_DATA);
               return;
          }

          dispatch(loadProductAsync(params.id));
     }, [dispatch, params.id, isCreating, isEditing, isEmployee, navigate]);

     return (
          <div className={className}>
               {isLoading || !product ? (
                    <IsLoadingPage />
               ) : (
                    <>
                         {isCreating || isEditing ? (
                              isEmployee && <ProductForm product={product} />
                         ) : (
                              <>
                                   <ProductContent product={product} />
                                   <Comments
                                        comments={product.comments}
                                        productId={product.id}
                                   />
                              </>
                         )}
                    </>
               )}
          </div>
     );
};

export const Product = styled(ProductContainer)`
     display: flex;
     flex-direction: column;
     align-items: center;
     min-height: 100vh;
     padding: 20px;

     @media (max-width: 768px) {
          padding: 10px;
     }

     @media (max-width: 480px) {
          padding: 5px;
     }
`;
