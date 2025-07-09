import { Link } from 'react-router-dom';
import styled from 'styled-components';

const BreadcrumbsContainer = ({
     className,
     mainTo,
     catalogTo,
     homeText,
     currentPage,
     productPageText,
}) => {
     return (
          <div className={className}>
               <Link to={mainTo}>{homeText}</Link>
               {currentPage && (
                    <>
                         <span className="separator">/</span>
                         {!productPageText ? (
                              <div>{currentPage}</div>
                         ) : (
                              <Link to={catalogTo}>{currentPage}</Link>
                         )}
                    </>
               )}
               {productPageText && (
                    <>
                         <span className="separator">/</span>
                         <span>{productPageText}</span>
                    </>
               )}
          </div>
     );
};

export const Breadcrumbs = styled(BreadcrumbsContainer)`
     position: absolute;
     top: 76px;
     left: 12px;
     margin-bottom: 20px;
     font-size: 14px;
     color: #666;
     display: flex;

     a {
          color: #2e6bff;
          text-decoration: none;
          &:hover {
               text-decoration: underline;
          }
     }

     .separator {
          margin: 0 5px;
     }

     span {
          color: #333;
     }
`;
