import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Breadcrumbs, IconButton, Input } from '../../../../components';
import {
     FaTimes,
     FaPlus,
     FaSave,
     FaTrashAlt,
     FaBackward,
} from 'react-icons/fa';
import { ButtonsPanel } from '../buttons-panel/buttons-panel';
import { sanitizeContent } from './utils';
import { useDispatch } from 'react-redux';
import {
     CLOSE_MODAL,
     openModal,
     removeProductAsync,
     saveProductAsync,
} from '../../../../actions';
import { useNavigate } from 'react-router-dom';
import { useCategoriesValue, useSeasonsValue } from '../../../../hooks';

const ProductFormContainer = ({ className, product }) => {
     const dispatch = useDispatch();
     const navigate = useNavigate();

     const {
          id,
          title,
          price,
          manufacturer,
          sizes: initialSizes,
          description,
          categoryId,
          seasonId,
     } = product;

     const categories = useCategoriesValue();
     const seasons = useSeasonsValue();
     const [selectedSize, setSelectedSize] = useState('');
     const [editedSizes, setEditedSizes] = useState(initialSizes || []);
     const [newSize, setNewSize] = useState('');
     const [sizeError, setSizeError] = useState('');

     const [selectedCategory, setSelectedCategory] = useState(categoryId);
     const [selectedSeason, setSelectedSeason] = useState(seasonId);

     const [titleValue, setTitleValue] = useState(title);
     const [priceValue, setPriceValue] = useState(price);
     const [manufacturerValue, setManufacturerValue] = useState(manufacturer);

     const [imageFiles, setImageFiles] = useState([]);

     const [inputError, setInputError] = useState('');

     useEffect(() => {
          setTitleValue(title);
          setPriceValue(price);
          setManufacturerValue(manufacturer);
          setEditedSizes(initialSizes);
          setSelectedCategory(categoryId);
          setSelectedSeason(seasonId);
          setImageFiles([]);
     }, [title, price, manufacturer, initialSizes, categoryId, seasonId]);

     const descriptionRef = useRef(null);

     useEffect(() => {
          const descriptionElement = descriptionRef.current;

          const updatePlaceholder = () => {
               const textContent = descriptionElement.textContent.trim();
               if (textContent === '') {
                    descriptionElement.classList.add('placeholder');
               } else {
                    descriptionElement.classList.remove('placeholder');
               }
          };
          descriptionElement.innerHTML = product.description || '';

          updatePlaceholder();

          descriptionElement.addEventListener('input', updatePlaceholder);

          return () => {
               descriptionElement.removeEventListener(
                    'input',
                    updatePlaceholder
               );
          };
     }, [product]);

     const onSave = () => {
          const newDescription = sanitizeContent(
               descriptionRef.current.innerHTML
          );

          const formData = new FormData();
          formData.append('title', titleValue);
          formData.append('price', priceValue);
          formData.append('description', newDescription);
          formData.append('manufacturer', manufacturerValue);
          formData.append('sizes', editedSizes.join(','));
          formData.append('categoryId', selectedCategory);
          formData.append('seasonId', selectedSeason);

          imageFiles.forEach((file) => {
               formData.append('imageFiles', file);
          });

          dispatch(saveProductAsync(id, formData, setInputError)).then(
               (product) => {
                    navigate(`/product/${product.id}`);
               }
          );
     };

     const onProductRemove = (id) => {
          dispatch(
               openModal({
                    text: 'Удалить карточку товара?',
                    onConfirm: () => {
                         dispatch(removeProductAsync(id)).then(() => {
                              navigate('/');
                         });
                         dispatch(CLOSE_MODAL);
                    },
                    onCancel: () => dispatch(CLOSE_MODAL),
               })
          );
     };

     const handleAddSize = () => {
          if (newSize && !editedSizes.includes(newSize)) {
               const sizeToAdd = newSize.trim();
               if (!isNaN(Number(sizeToAdd))) {
                    const updatedSizes = [...editedSizes, sizeToAdd]
                         .map((size) => Number(size))
                         .sort((a, b) => a - b)
                         .map((size) => String(size));
                    setEditedSizes(updatedSizes);
                    setNewSize('');
               } else {
                    setSizeError('Размер должен быть числом');
               }
          }
     };

     const handleDeleteSize = (sizeToDelete) => {
          setEditedSizes(editedSizes.filter((size) => size !== sizeToDelete));
          if (selectedSize === sizeToDelete) {
               setSelectedSize('');
          }
     };

     const onTitleChange = ({ target }) => setTitleValue(target.value);
     const onPriceChange = ({ target }) => setPriceValue(target.value);
     const onManufacturerChange = ({ target }) =>
          setManufacturerValue(target.value);

     return (
          <div className={className}>
               {title ? (
                    <Breadcrumbs
                         mainTo="/"
                         catalogTo="/catalog"
                         homeText="Главная"
                         currentPage="Каталог"
                         productPageText={title}
                    />
               ) : (
                    <Breadcrumbs
                         mainTo="/"
                         catalogTo="/catalog"
                         homeText="Главная"
                         currentPage="Редактирование"
                    />
               )}
               <h2>Редактирование товара</h2>

               <div className="edit-page">
                    <div>
                         <div className="image-section">
                              <label>Изображения (до 3):</label>
                              <input
                                   className="select-image"
                                   type="file"
                                   accept="image/*"
                                   multiple
                                   onChange={(e) => {
                                        const newFiles = Array.from(
                                             e.target.files
                                        );
                                        const totalFiles =
                                             imageFiles.length +
                                             newFiles.length;
                                        if (totalFiles > 3) {
                                             alert(
                                                  'Можно загрузить не более 3 изображений'
                                             );
                                             return;
                                        }
                                        setImageFiles([
                                             ...imageFiles,
                                             ...newFiles.slice(
                                                  0,
                                                  3 - imageFiles.length
                                             ),
                                        ]);
                                   }}
                              />
                              <div className="image-preview">
                                   {imageFiles.map((file, index) => (
                                        <div
                                             key={index}
                                             className="image-preview-item"
                                        >
                                             <img
                                                  src={URL.createObjectURL(
                                                       file
                                                  )}
                                                  alt={`Preview ${index + 1}`}
                                                  style={{
                                                       width: '100px',
                                                       height: '100px',
                                                       objectFit: 'cover',
                                                  }}
                                             />
                                             <IconButton
                                                  icon={<FaTimes />}
                                                  size="14px"
                                                  onClick={() => {
                                                       setImageFiles(
                                                            imageFiles.filter(
                                                                 (_, i) =>
                                                                      i !==
                                                                      index
                                                            )
                                                       );
                                                  }}
                                             />
                                        </div>
                                   ))}
                              </div>
                              <div className="existing-images">
                                   {product.imageUrls?.map((url, index) => (
                                        <div
                                             key={index}
                                             className="image-preview-item"
                                        >
                                             <img
                                                  src={url}
                                                  alt={`Product image ${index + 1}`}
                                                  style={{
                                                       width: '100px',
                                                       height: '100px',
                                                       objectFit: 'cover',
                                                  }}
                                             />
                                        </div>
                                   ))}
                              </div>
                         </div>
                         <div className="create-product">
                              <Input
                                   value={titleValue}
                                   placeholder="Заголовок..."
                                   onChange={onTitleChange}
                              />
                              <Input
                                   value={priceValue}
                                   placeholder="Стоимость..."
                                   onChange={onPriceChange}
                              />
                              <Input
                                   value={manufacturerValue}
                                   placeholder="Производитель..."
                                   onChange={onManufacturerChange}
                              />
                              <select
                                   value={selectedSeason}
                                   onChange={(e) =>
                                        setSelectedSeason(e.target.value)
                                   }
                                   className="season-select"
                              >
                                   <option value="" disabled>
                                        Выберите сезон
                                   </option>
                                   {seasons.map(({ id, name }) => (
                                        <option key={id} value={id}>
                                             {name}
                                        </option>
                                   ))}
                              </select>
                              <select
                                   value={selectedCategory}
                                   onChange={(e) =>
                                        setSelectedCategory(e.target.value)
                                   }
                                   className="category-select"
                              >
                                   <option value="" disabled>
                                        Выберите категорию
                                   </option>
                                   {categories.map(({ id, name }) => (
                                        <option key={id} value={id}>
                                             {name}
                                        </option>
                                   ))}
                              </select>
                              <div
                                   ref={descriptionRef}
                                   contentEditable={true}
                                   suppressContentEditableWarning={true}
                                   className="description"
                              >
                                   {description}
                              </div>
                         </div>
                    </div>

                    <div className="content-wrapper">
                         <ButtonsPanel
                              id={id}
                              backButton={
                                   <IconButton
                                        icon={<FaBackward />}
                                        size="21px"
                                        onClick={() =>
                                             navigate(`/product/${id}`)
                                        }
                                        top={0}
                                   />
                              }
                              editButton={
                                   <IconButton
                                        icon={<FaSave />}
                                        onClick={onSave}
                                   />
                              }
                              deleteButton={
                                   <IconButton
                                        icon={<FaTrashAlt />}
                                        size="20px"
                                        onClick={() => onProductRemove(id)}
                                        top={0}
                                   />
                              }
                         />
                         <div className="sizes-editor">
                              <label>Размеры:</label>
                              <div className="sizes-list">
                                   {editedSizes.map((size) => (
                                        <div key={size} className="size-item">
                                             {size}
                                             <IconButton
                                                  icon={<FaTimes />}
                                                  size="14px"
                                                  onClick={() =>
                                                       handleDeleteSize(size)
                                                  }
                                             />
                                        </div>
                                   ))}
                              </div>
                              <div className="add-size">
                                   <Input
                                        value={newSize}
                                        onChange={(e) => {
                                             setNewSize(e.target.value);
                                             setSizeError('');
                                        }}
                                        placeholder="Новый размер..."
                                   />
                                   <IconButton
                                        icon={<FaPlus />}
                                        onClick={handleAddSize}
                                        size="20px"
                                        marginTop="3px"
                                   />
                              </div>
                              {sizeError && (
                                   <div className="size-error">{sizeError}</div>
                              )}
                         </div>
                    </div>
               </div>
               <div className="error-message">{inputError}</div>
          </div>
     );
};

export const ProductForm = styled(ProductFormContainer)`
     h2 {
          display: flex;
          justify-content: center;
          font-size: 24px;
          margin: 20px 0;
     }

     .edit-page {
          display: flex;
          padding: 65px;
          max-width: 800px;
          margin: 30px auto;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          position: relative;
     }

     .content-wrapper {
          display: flex;
          flex-direction: column;
          margin-top: 20px;
     }

     .sizes-editor {
          color: #666;
          line-height: 1.5;
          display: flex;
          flex-direction: column;
          gap: 10px;
     }

     .sizes-list {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
     }

     .size-item {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 5px 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
     }

     .size-error {
          color: red;
          font-size: 14px;
          margin-top: 5px;
     }

     .description {
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          line-height: 1.5;
          width: 400px;
          height: 150px;
          max-height: 300px;
          overflow-y: auto;
          white-space: pre-wrap;
          position: relative;
          top: 30px;

          &.placeholder::before {
               content: 'Введите описание...';
               color: #666;
               position: absolute;
               top: 10px;
               left: 10px;
               pointer-events: none;
          }

          &:focus::before {
               content: none;
          }
     }

     .category-select,
     .season-select {
          width: 100%;
          max-width: 210px;
          height: 43px;
          padding: 8px;
          border: 1px solid #ccc;
          font-size: 16px;
          border-radius: 4px;

          &:hover {
               cursor: pointer;
          }
     }

     .select-image {
          margin-bottom: 18px;
     }

     .image-section {
          display: flex;
          flex-direction: column;
          gap: 10px;
     }

     .image-preview {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
     }

     .image-preview-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
     }

     .existing-images {
          display: flex;
          gap: 5px;
          margin-bottom: 30px;
     }

     @media (max-width: 770px) {
          .edit-page {
               flex-direction: column;
               padding: 20px;
               margin: 20px 10px;
               gap: 20px;
               width: 450px;
          }

          h2 {
               font-size: 20px;
               margin-top: 65px;
          }

          .description {
               max-width: 100%;
               height: 120px;
               max-height: 250px;
          }

          .category-select,
          .season-select {
               max-width: 100%;
          }
     }

     @media (max-width: 480px) {
          .edit-page {
               padding: 15px;
               margin: 10px 5px;
               width: 300px;
          }

          h2 {
               font-size: 18px;
          }

          .description {
               height: 100px;
               max-height: 200px;
               width: 278px;
          }

          .size-item {
               font-size: 12px;
               padding: 3px 8px;
          }
     }
`;
