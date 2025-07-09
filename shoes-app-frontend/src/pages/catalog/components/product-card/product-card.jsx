import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ProductCardContainer = ({
     className,
     id,
     title,
     imageUrl,
     price,
     sizes,
     commentsCount,
}) => {
     const sizesString = Array.isArray(sizes) ? sizes.join(', ') : sizes;
     return (
          <div className={className}>
               <div className={className}>
                    <Link to={`/product/${id}`}>
                         <img src={imageUrl} alt={title} />
                         <div className="product-info">
                              <h3 className="title">{title}</h3>
                              <div className="price-comment-wrapper">
                                   <span className="price">{price} ₽</span>
                                   <div className="sizes-comments">
                                        <span className="sizes">
                                             {sizesString}
                                        </span>
                                        <span className="comments">
                                             Отзывы: {commentsCount}
                                        </span>
                                   </div>
                              </div>
                         </div>
                    </Link>
               </div>
          </div>
     );
};

export const ProductCard = styled(ProductCardContainer)`
     width: 200px;
     margin: 10px;
     border-radius: 8px;
     overflow: hidden;
     box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
     transition: transform 0.2s;

     &:hover {
          transform: translateY(-5px);
     }

     a {
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
     }

     img {
          width: 100%;
          height: 150px;
          object-fit: cover;
     }

     .product-info {
          padding: 10px;
     }

     .title {
          font-size: 14px;
          margin: 0 0 8px 0;
          line-height: 1.2;
          height: 34px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
     }

     .price-comment-wrapper {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
     }

     .price {
          font-weight: bold;
          color: #21a1f1;
          font-size: 14px;
          margin-bottom: 4px;
     }

     .sizes-comments {
          display: flex;
          flex-direction: column;
          gap: 8px;
     }

     .sizes {
          font-size: 12px;
          color: #444;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
     }

     .comments {
          font-size: 12px;
          color: #666;
     }
`;
