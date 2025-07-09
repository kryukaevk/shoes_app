import styled from 'styled-components';
import { UsersContent } from './components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
     CLOSE_MODAL,
     openModal,
     setErrorMessage,
     setRoles,
     setUsers,
     toggleUpdateUserList,
} from '../../actions';
import { Error } from '../../components';
import { request } from '../../utils';

const UsersContainer = ({ className }) => {
     const dispatch = useDispatch();
     const { users, roles, errorMessage, shouldUpdateUserList } = useSelector(
          (state) => state.users
     );

     useEffect(() => {
          Promise.all([request('/users'), request('/users/roles')]).then(
               ([usersRes, rolesRes]) => {
                    if (usersRes.error || rolesRes.error) {
                         dispatch(
                              setErrorMessage(usersRes.error || rolesRes.error)
                         );
                         return;
                    }
                    dispatch(setUsers(usersRes.data));
                    dispatch(setRoles(rolesRes.data));
                    dispatch(setErrorMessage(null));
               }
          );
     }, [shouldUpdateUserList, dispatch]);

     const onUserRemove = (userId) => {
          dispatch(
               openModal({
                    text: 'Удалить пользователя?',
                    onConfirm: () => {
                         request(`/users/${userId}`, 'DELETE').then(() => {
                              dispatch(toggleUpdateUserList());
                         });

                         dispatch(CLOSE_MODAL);
                    },
                    onCancel: () => dispatch(CLOSE_MODAL),
               })
          );
     };

     return (
          <div className={className}>
               {errorMessage ? (
                    <Error error={errorMessage} />
               ) : (
                    <UsersContent
                         users={users}
                         roles={roles}
                         onUserRemove={onUserRemove}
                    />
               )}
          </div>
     );
};

export const Users = styled(UsersContainer)``;
