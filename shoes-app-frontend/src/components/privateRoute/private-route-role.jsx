import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../selectors';

export const PrivateRouteRole = ({ restrictedRoles = [] }) => {
     const roleId = useSelector(selectUserRole); // Получаем roleId текущего пользователя из Redux

     console.log('roleId', roleId);
     console.log('restrictedRoles', restrictedRoles);

     // Если пользователь не авторизован (roleId отсутствует или null), перенаправляем на страницу логина
     //  if (!roleId && roleId !== 0) {
     //       return <Navigate to="/" replace />;
     //  }

     // Если роль пользователя входит в список ограниченных ролей, перенаправляем на главную страницу
     if (restrictedRoles.includes(roleId)) {
          return <Navigate to="/" replace />;
     }

     // Если проверки пройдены, рендерим дочерние компоненты
     return <Outlet />;
};
