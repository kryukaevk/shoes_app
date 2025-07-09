import styled from 'styled-components';
import { ROLE } from '../../../constants';
import { Breadcrumbs } from '../../../components';
import { TableRow } from './table-row/table-row';
import { UserRow } from './user-row/user-row';
import { formatDate } from '../../../utils';

const UsersContentContainer = ({ className, users, roles, onUserRemove }) => {
     return (
          <div className={className}>
               <Breadcrumbs
                    mainTo="/"
                    homeText="Главная"
                    currentPage="Пользователи"
               />
               <h2>Пользователи</h2>
               <div>
                    <TableRow>
                         <div className="login-column">Логин</div>
                         <div className="registered-at-column">
                              Дата регистрации
                         </div>
                         <div className="role-column">Роль</div>
                         <div className="action-column"></div>
                    </TableRow>
                    {users.map(({ id, login, registeredAt, roleId }) => {
                         return (
                              <UserRow
                                   key={id}
                                   id={id}
                                   login={login}
                                   registeredAt={formatDate(registeredAt)}
                                   roleId={roleId}
                                   roles={roles.filter(
                                        ({ id: roleId }) =>
                                             roleId !== ROLE.GUEST
                                   )}
                                   onUserRemove={() => onUserRemove(id)}
                              />
                         );
                    })}
               </div>
          </div>
     );
};

export const UsersContent = styled(UsersContentContainer)`
     max-width: 800px;
     margin: 0 auto;
     padding: 20px;
     box-sizing: border-box;

     @media (max-width: 768px) {
          padding: 15px;
     }

     @media (max-width: 480px) {
          padding: 10px;
     }

     & h2 {
          text-align: center;
          font-size: 24px;
          margin-bottom: 20px;
          color: #333;

          @media (max-width: 480px) {
               font-size: 20px;
               margin-top: 50px;
          }
     }

     & .login-column,
     & .registered-at-column,
     & .role-column,
     & .action-column {
          font-size: 16px;
          padding: 10px;

          @media (max-width: 768px) {
               font-size: 14px;
               padding: 8px;
          }

          @media (max-width: 480px) {
               display: block;
               width: 100%;
               text-align: center;
          }
     }

     & .table-row {
          display: flex;
          border-bottom: 1px solid #ddd;

          @media (max-width: 480px) {
               flex-direction: column;
               align-items: center;
               gap: 5px;
          }
     }
`;
