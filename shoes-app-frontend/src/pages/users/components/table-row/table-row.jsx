import styled from 'styled-components';

const TableRowContainer = ({ className, children }) => (
     <div className={className}>{children}</div>
);

export const TableRow = styled(TableRowContainer)`
     display: grid;
     grid-template-columns: 2fr 2fr 1fr 50px; // Добавлена колонка для иконки
     background-color: #f5f5f5;
     border-radius: 8px 8px 0 0;
     padding: 15px;
     font-weight: bold;
     color: #666;
     border-bottom: 1px solid #ddd;

     .login-column {
          padding-left: 10px;
     }

     .registered-at-column {
          padding-left: 10px;
     }

     .role-column {
          padding-left: 10px;
     }

     .action-column {
          padding-left: 10px;
     }
`;
