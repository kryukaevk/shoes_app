import { request } from '../utils';

export const loadHistoryOrders = async (
     login,
     setOrders,
     setError,
     setLoading
) => {
     try {
          const response = await request(
               `/orders?login=${encodeURIComponent(login)}`
          );

          if (response.error) {
               setError(response.error);
          } else {
               setOrders(response.data);
          }
     } catch (err) {
          setError(err.message);
     } finally {
          setLoading(false);
     }
};
