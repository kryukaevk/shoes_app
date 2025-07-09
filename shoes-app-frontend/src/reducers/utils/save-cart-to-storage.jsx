export const saveCartToStorage = (items) => {
     localStorage.setItem('cart', JSON.stringify(items));
};
