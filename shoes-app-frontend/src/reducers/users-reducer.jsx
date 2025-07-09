import { ACTION_TYPE } from '../actions';

const initialUsersState = {
     users: [],
     roles: [],
     errorMessage: null,
     shouldUpdateUserList: false,
};

export const usersReducer = (state = initialUsersState, action) => {
     switch (action.type) {
          case ACTION_TYPE.SET_USERS:
               return { ...state, users: action.payload };
          case ACTION_TYPE.SET_ROLES:
               return { ...state, roles: action.payload };
          case ACTION_TYPE.SET_ERROR_MESSAGE:
               return { ...state, errorMessage: action.payload };
          case ACTION_TYPE.TOGGLE_UPDATE_USER_LIST:
               return {
                    ...state,
                    shouldUpdateUserList: !state.shouldUpdateUserList,
               };
          case ACTION_TYPE.SET_ROLE:
               return {
                    ...state,
                    users: state.users.map((user) =>
                         user.id === action.payload.userId
                              ? { ...user, roleId: action.payload.roleId }
                              : user
                    ),
               };
          default:
               return state;
     }
};
