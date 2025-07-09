import { request } from '../utils';
import { removeComment } from './remove-comment';

export const removeCommentAsync = (id, productId) => (dispatch) => {
     request(`/products/${productId}/comments/${id}`, 'DELETE').then(() => {
          dispatch(removeComment(id));
     });
};
