import styled from 'styled-components';
import { IconButton } from '../../../../components/icon';
import { TableRow } from '../table-row/table-row';
import { FaSave, FaTrash } from 'react-icons/fa';
import { useState } from 'react';
import { request } from '../../../../utils';
import { useDispatch } from 'react-redux';
import { setRole } from '../../../../actions';

const UserRowContainer = ({
     className,
     id,
     login,
     registeredAt,
     roleId: userRoleId,
     roles,
     onUserRemove,
}) => {
     const dispatch = useDispatch();
     const [initialRoleId, setInitialRoleId] = useState(userRoleId);
     const [selectedRoleId, setSelectedRoleId] = useState(userRoleId);
     const onRoleChange = ({ target }) => {
          setSelectedRoleId(Number(target.value));
     };

     const isSaveButtonDisabled = selectedRoleId === initialRoleId;

     const onRoleSave = (userId, newUserRoleId) => {
          request(`/users/${userId}`, 'PATCH', { roleId: newUserRoleId }).then(
               () => {
                    setInitialRoleId(newUserRoleId);
                    dispatch(setRole(userId, newUserRoleId));
               }
          );
     };

     return (
          <div className={className}>
               <TableRow>
                    <div className="login-column">{login}</div>
                    <div className="registered-at-column">{registeredAt}</div>
                    <div className="role-column">
                         <select value={selectedRoleId} onChange={onRoleChange}>
                              {roles.map(({ id: roleId, name: roleName }) => (
                                   <option key={roleId} value={roleId}>
                                        {roleName}
                                   </option>
                              ))}
                         </select>
                    </div>
                    <div className="action-column">
                         <IconButton
                              icon={<FaSave />}
                              onClick={() => onRoleSave(id, selectedRoleId)}
                              disabled={isSaveButtonDisabled}
                         />
                         <IconButton
                              icon={<FaTrash />}
                              onClick={onUserRemove}
                         />
                    </div>
               </TableRow>
          </div>
     );
};

export const UserRow = styled(UserRowContainer)`
     & > div {
          background-color: white;
          border-radius: 0;
     }

     .action-column {
          display: flex;
          gap: 10px;
     }
`;
