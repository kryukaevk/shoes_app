export const coutingQuantity = (items) => {
     return items.reduce((acc, item) => acc + item.quantity, 0);
};
