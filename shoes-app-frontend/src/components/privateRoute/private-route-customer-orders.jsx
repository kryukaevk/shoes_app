import { useSelector } from 'react-redux';
import { selectUserRole } from '../../selectors';
import { checkAccess } from '../../utils';
import { ROLE } from '../../constants';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRouteCustomerOrders = () => {
     const roleId = useSelector(selectUserRole);
     const isAllowed = checkAccess([ROLE.ADMIN, ROLE.MODERATOR], roleId);

     return isAllowed ? <Outlet /> : <Navigate to="/" replace />;
};
