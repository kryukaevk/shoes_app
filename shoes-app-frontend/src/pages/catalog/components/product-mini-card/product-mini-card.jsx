import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ProductMiniCardContainer = ({
     className,
     id,
     title,
     imageUrl,
     price,
     hideCatalog,
     setSearchPhrase,
}) => {
     const handleClick = () => {
          hideCatalog();
          setSearchPhrase('');
     };

     return (
          <div className={className}>
               <Link to={`/product/${id}`} onClick={handleClick}>
                    <div className="image-title">
                         <img src={imageUrl} alt={title} />
                         <h3 className="title">{title}</h3>
                    </div>

                    <div className="price-comment-wrapper">
                         <span className="price">{price} ₽</span>
                    </div>
               </Link>
          </div>
     );
};

export const ProductMiniCard = styled(ProductMiniCardContainer)`
     width: 320px;
     border-radius: 8px;
     overflow: hidden;
     border: 1px solid #ccc;

     &:hover {
          border: 1px solid #666;
     }

     .image-title {
          display: flex;
          gap: 12px;
     }

     a {
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
     }

     img {
          width: 50px;
          height: 50px;
          object-fit: cover;
     }

     .product-info {
          padding: 10px;
     }

     .title {
          font-size: 14px;
          margin: 17px 0 8px 0;
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
`;
