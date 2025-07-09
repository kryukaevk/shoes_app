import { Navigate, Outlet, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserLogin, selectUserRole } from '../../selectors';
import { ROLE } from '../../constants';

export const PrivateRouteAccount = () => {
     const currentUserLogin = useSelector(selectUserLogin);
     const roleId = useSelector(selectUserRole);
     const { login } = useParams();

     const isAuthorized = roleId !== ROLE.GUEST && currentUserLogin === login;

     return isAuthorized ? <Outlet /> : <Navigate to="/" replace />;
};
