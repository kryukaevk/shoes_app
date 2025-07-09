import { ACTION_TYPE } from '../actions';

const initialAppState = {
     wasLogout: false,
     isOrderAllowed: false,
     modalBeforeAction: {
          isOpen: false,
          text: '',
          onConfirm: () => {},
          onCancel: () => {},
     },
     pageOrderConfirmed: {
          isOrderConfirmed: false,
          text: '',
          onConfirm: () => {},
     },
};

export const appReducer = (state = initialAppState, action) => {
     switch (action.type) {
          case ACTION_TYPE.SET_ORDER_ACCESS:
               return { ...state, isOrderAllowed: action.payload };
          case ACTION_TYPE.LOGOUT:
               return {
                    ...state,
                    wasLogout: !state.wasLogout,
               };
          case ACTION_TYPE.OPEN_MODAL:
               return {
                    ...state,
                    modalBeforeAction: {
                         ...state.modalBeforeAction,
                         ...action.payload,
                         isOpen: true,
                    },
               };
          case ACTION_TYPE.OPEN_PAGE_ORDER_CONFIRMED:
               return {
                    ...state,
                    pageOrderConfirmed: {
                         ...state.pageOrderConfirmed,
                         ...action.payload,
                    },
               };
          case ACTION_TYPE.CLOSE_MODAL:
               return initialAppState;
          default:
               return state;
     }
};
