import { useState } from 'react';
import styled from 'styled-components';
import {
     Breadcrumbs,
     Button,
     IconButton,
     ModalWindowForImg,
} from '../../../../components';
import { FaPen } from 'react-icons/fa';
import { ButtonsPanel } from '../buttons-panel/buttons-panel';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, resetOrderData } from '../../../../actions';
import { checkAccess } from '../../../../utils/check-access';
import { selectUserRole } from '../../../../selectors';
import { ROLE } from '../../../../constants';

const ProductContentContainer = ({ className, product }) => {
     const { id, title, imageUrls, price, manufacturer, sizes, description } =
          product;

     const [isModalOpen, setIsModalOpen] = useState(false);
     const [selectedImageIndex, setSelectedImageIndex] = useState(0);
     const [selectedSize, setSelectedSize] = useState('');
     const dispatch = useDispatch();
     const navigate = useNavigate();

     const roleId = useSelector(selectUserRole);
     const isEmployee = checkAccess([ROLE.ADMIN, ROLE.MODERATOR], roleId);

     const handleMainImageClick = () => {
          setIsModalOpen(true);
     };

     const handleThumbnailClick = (index) => {
          setSelectedImageIndex(index);
     };

     const handleCloseModal = () => {
          setIsModalOpen(false);
     };

     const handleSizeClick = (size) => {
          setSelectedSize(size);
     };

     const addToCartHandler = () => {
          dispatch(
               addToCart({
                    productId: id,
                    title,
                    imageUrls,
                    price,
                    size: selectedSize,
                    quantity: 1,
               })
          );
          dispatch(resetOrderData());
     };

     return (
          <div className={className}>
               <Breadcrumbs
                    mainTo="/"
                    catalogTo="/catalog"
                    homeText="Главная"
                    currentPage="Каталог"
                    productPageText={title}
               />
               <div className="product-content">
                    {imageUrls &&
                         Array.isArray(imageUrls) &&
                         imageUrls.length > 0 && (
                              <div className="image-container">
                                   <img
                                        src={imageUrls[selectedImageIndex]}
                                        alt={`${title} main image`}
                                        onClick={handleMainImageClick}
                                        className="main-image"
                                   />
                                   <div className="thumbnail-container">
                                        {imageUrls.map((url, index) => (
                                             <img
                                                  key={index}
                                                  src={url}
                                                  alt={`${title} thumbnail ${index + 1}`}
                                                  onClick={() =>
                                                       handleThumbnailClick(
                                                            index
                                                       )
                                                  }
                                                  className={`thumbnail ${selectedImageIndex === index ? 'selected' : ''}`}
                                             />
                                        ))}
                                   </div>
                              </div>
                         )}
                    <div className="content-wrapper">
                         {isEmployee && (
                              <ButtonsPanel
                                   id={id}
                                   editButton={
                                        <IconButton
                                             icon={<FaPen />}
                                             size="19px"
                                             onClick={() =>
                                                  navigate(
                                                       `/product/${id}/edit`
                                                  )
                                             }
                                             top={0}
                                        />
                                   }
                              />
                         )}
                         <h2 className="title">{title}</h2>
                         <div className="price">Стоимость: {price} ₽</div>
                         <div className="manufacturer">
                              Производитель: {manufacturer}
                         </div>
                         <div className="sizes">
                              <label>Выберите размер: </label>
                              <div className="size-blocks">
                                   {sizes.map((size) => (
                                        <div
                                             key={size}
                                             className={`size-block ${selectedSize === size ? 'selected' : ''}`}
                                             onClick={() =>
                                                  handleSizeClick(size)
                                             }
                                        >
                                             {size}
                                        </div>
                                   ))}
                              </div>
                         </div>
                         <div className="description">
                              Описание: {description}
                         </div>
                         <Button
                              onClick={addToCartHandler}
                              alignSelf="flex-start"
                              disabled={!selectedSize}
                         >
                              Добавить в корзину
                         </Button>
                    </div>
               </div>
               <div className="footnote">
                    <p>*Не является товарным продуктом и продаже не подлежит</p>
               </div>

               <ModalWindowForImg
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    imageUrls={imageUrls}
                    initialIndex={selectedImageIndex}
                    alt={title}
               />
          </div>
     );
};

export const ProductContent = styled(ProductContentContainer)`
     .product-content {
          display: flex;
          gap: 45px;
          padding: 65px;
          max-width: 800px;
          margin: 30px auto;
          background-color: #系列;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          position: relative;
     }

     .image-container {
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
     }

     .main-image {
          height: 400px;
          width: 400px;
          object-fit: cover;
          border-radius: 4px;
          cursor: pointer;
          transition: transform 0.3s ease;

          &:hover {
               transform: scale(1.05);
          }
     }

     .thumbnail-container {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
     }

     .thumbnail {
          height: 80px;
          width: 80px;
          object-fit: cover;
          border-radius: 4px;
          cursor: pointer;
          border: 2px solid transparent;
          transition: border-color 0.2s ease;

          &.selected {
               border-color: #333;
          }

          &:hover {
               border-color: #666;
          }
     }

     .content-wrapper {
          display: flex;
          flex-direction: column;
          gap: 15px;
     }

     .title {
          margin: 0;
          font-size: 24px;
          color: #333;
     }

     .price {
          font-size: 20px;
          color: #2c2c2c;
          font-weight: 600;
     }

     .manufacturer {
          color: #666;
          line-height: 1.5;
     }

     .sizes {
          color: #666;
          line-height: 1.5;
          display: flex;
          flex-direction: column;
          gap: 10px;
     }

     .size-blocks {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
     }

     .size-block {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #ccc;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 16px;
          color: #333;

          &:hover {
               border-color: #333;
               background-color: #f5f5f5;
          }

          &.selected {
               border-color: #333;
               background-color: #333;
               color: #fff;
          }
     }

     .footnote {
          font-size: 10px;
     }

     .description {
          color: #666;
          line-height: 1.5;
          white-space: pre-line;
     }

     .buttons-panel {
          position: absolute;
          top: 20px;
          right: 20px;
          display: flex;
          gap: 10px;
     }

     @media (max-width: 770px) {
          .product-content {
               flex-direction: column;
               padding: 20px;
               margin: 20px 10px;
               margin-top: 56px;
               gap: 20px;
          }

          .main-image {
               width: 100%;
               height: auto;
               max-height: 300px;
          }

          .thumbnail {
               height: 60px;
               width: 60px;
          }

          .title {
               font-size: 20px;
          }

          .price {
               font-size: 18px;
          }

          .size-block {
               width: 35px;
               height: 35px;
               font-size: 14px;
          }

          .buttons-panel {
               top: 10px;
               right: 10px;
          }
     }

     @media (max-width: 480px) {
          .product-content {
               padding: 15px;
               margin: 60px 20px;
          }

          .title {
               font-size: 18px;
          }

          .price {
               font-size: 16px;
          }

          .size-block {
               width: 30px;
               height: 30px;
               font-size: 12px;
          }

          .thumbnail {
               height: 50px;
               width: 50px;
          }
     }
`;
