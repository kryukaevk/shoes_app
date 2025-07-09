import { useEffect, useState } from 'react';
import { request } from '../utils';

export const useSeasonsValue = () => {
     const [seasons, setSeasons] = useState([]);

     useEffect(() => {
          request('/seasons')
               .then(({ data }) => {
                    setSeasons(data || []);
               })
               .catch((error) => {
                    console.error('Ошибка при загрузке сезонов:', error);
                    setSeasons([]);
               });
     }, []);

     return seasons;
};
