import { ACTION_TYPE } from '../actions';

const initialproductState = {
     isLoading: false,
};

export const isLoadingReducer = (state = initialproductState, action) => {
     switch (action.type) {
          case ACTION_TYPE.START_LOADING:
               return { ...state, isLoading: true };
          case ACTION_TYPE.STOP_LOADING:
               return { ...state, isLoading: false };
          default:
               return state;
     }
};
