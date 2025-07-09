import styled from 'styled-components';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useState } from 'react';

const ModalWindowForImgContainer = ({
     className,
     isOpen,
     onClose,
     imageUrls,
     initialIndex,
     alt,
}) => {
     const [currentIndex, setCurrentIndex] = useState(initialIndex || 0);

     if (!isOpen || !imageUrls || imageUrls.length === 0) return null;

     const handlePrevImage = () => {
          setCurrentIndex((prev) =>
               prev === 0 ? imageUrls.length - 1 : prev - 1
          );
     };

     const handleNextImage = () => {
          setCurrentIndex((prev) =>
               prev === imageUrls.length - 1 ? 0 : prev + 1
          );
     };

     return (
          <div className={className} onClick={onClose}>
               <div
                    className="modal-content"
                    onClick={(e) => e.stopPropagation()}
               >
                    <img
                         src={imageUrls[currentIndex]}
                         alt={`${alt} image ${currentIndex + 1}`}
                         className="modal-image"
                    />
                    {imageUrls.length > 1 && (
                         <>
                              <button
                                   className="nav-button prev"
                                   onClick={handlePrevImage}
                              >
                                   <FaArrowLeft />
                              </button>
                              <button
                                   className="nav-button next"
                                   onClick={handleNextImage}
                              >
                                   <FaArrowRight />
                              </button>
                         </>
                    )}
                    <button className="close-button" onClick={onClose}>
                         ×
                    </button>
               </div>
          </div>
     );
};

export const ModalWindowForImg = styled(ModalWindowForImgContainer)`
     position: fixed;
     top: 0;
     left: 0;
     right: 0;
     bottom: 0;
     background-color: rgba(0, 0, 0, 0.8);
     display: flex;
     justify-content: center;
     align-items: center;
     z-index: 1000;

     .modal-content {
          position: relative;
          background-color: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          max-width: 90vw;
          max-height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
     }

     .modal-image {
          max-width: 80vw;
          max-height: 80vh;
          object-fit: contain;
          border-radius: 4px;
     }

     .close-button {
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
          font-size: 24px;
          color: #333;
          cursor: pointer;
     }

     .nav-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.5);
          border: none;
          color: #fff;
          font-size: 24px;
          padding: 10px;
          cursor: pointer;
          border-radius: 4px;
          transition: background 0.2s ease;

          &:hover {
               background: rgba(0, 0, 0, 0.7);
          }
     }

     .prev {
          left: 10px;
     }

     .next {
          right: 10px;
     }
`;
