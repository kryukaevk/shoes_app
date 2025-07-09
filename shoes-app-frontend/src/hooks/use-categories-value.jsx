import { useEffect, useState } from 'react';
import { request } from '../utils';

export const useCategoriesValue = () => {
     const [categories, setCategories] = useState([]);

     useEffect(() => {
          request('/categories')
               .then(({ data }) => {
                    setCategories(data || []);
               })
               .catch((error) => {
                    console.error('Ошибка при загрузке категорий:', error);
                    setCategories([]);
               });
     }, []);

     return categories;
};
