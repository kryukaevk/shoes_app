export const formatDate = (isoDate) => {
     return isoDate.replace(/T(\d{2}:\d{2}).*/, ' $1');
};
