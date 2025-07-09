import styled from 'styled-components';
import { Button } from '../../../../components';

const PaginationContainer = ({ className, page, setPage, lastPage }) => {
     return (
          <div className={className}>
               <Button disabled={page === 1} onClick={() => setPage(1)}>
                    <span className="desktop-text">В начало</span>
                    <span className="mobile-text">«</span>
               </Button>
               <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
                    <span className="desktop-text">Предыдущая</span>
                    <span className="mobile-text">←</span>
               </Button>
               <div className="current-page">Страница: {page}</div>
               <Button
                    disabled={page === lastPage}
                    onClick={() => setPage(page + 1)}
               >
                    <span className="desktop-text">Следующая</span>
                    <span className="mobile-text">→</span>
               </Button>
               <Button
                    disabled={page === lastPage}
                    onClick={() => setPage(lastPage)}
               >
                    <span className="desktop-text">В конец</span>
                    <span className="mobile-text">»</span>
               </Button>
          </div>
     );
};

export const Pagination = styled(PaginationContainer)`
     display: flex;
     justify-content: center;
     align-items: center;
     gap: 12px;
     position: absolute;
     bottom: 12px;
     width: 100%;
     left: 0;
     padding: 0 10px;
     box-sizing: border-box;

     .current-page {
          margin: 5px;
          font-size: 16px;
     }

     /* Стили для кнопок (предполагается, что компонент Button поддерживает кастомизацию) */
     button {
          padding: 8px 16px;
          font-size: 14px;
     }

     /* Медиа-запрос для мобильных устройств (ширина экрана до 768px) */
     @media (max-width: 768px) {
          gap: 8px;
          bottom: 10px;

          .current-page {
               font-size: 14px;
          }

          button {
               padding: 6px 10px;
               font-size: 12px;
          }

          /* Показываем только мобильный текст на маленьких экранах */
          .desktop-text {
               display: none;
          }
          .mobile-text {
               display: inline;
          }
     }

     /* Стили для десктопов */
     @media (min-width: 769px) {
          .desktop-text {
               display: inline;
          }
          .mobile-text {
               display: none;
          }
     }
`;
