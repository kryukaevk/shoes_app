import { useState } from 'react';
import styled from 'styled-components';
import { Recipient, Delivery, Payment, OrderConfirmation } from '.';
import { Button } from '../../../components';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { startLoading } from '../../../actions';

const OrderContentContainer = ({
     className,
     steps,
     setIsSubmittingOrderLoading,
}) => {
     const navigate = useNavigate();
     const dispatch = useDispatch();

     const [activeIndex, setActiveIndex] = useState(0);

     const onCancelOrder = () => {
          navigate('/cart');
          dispatch(startLoading());
     };

     const goToNextStep = () => {
          if (activeIndex < steps.length - 1) {
               setActiveIndex(activeIndex + 1);
          }
     };

     const goToLastStep = () => {
          if (activeIndex <= steps.length - 1) {
               setActiveIndex(activeIndex - 1);
          }
     };

     return (
          <div className={className}>
               <h3>Оформление заказа</h3>
               <div className="steps-container">
                    <ul className="step-list">
                         {steps.map((step, index) => (
                              <li
                                   key={step.id}
                                   className={`steps-item ${
                                        index === activeIndex
                                             ? 'steps-active'
                                             : ''
                                   } ${index <= activeIndex ? 'steps-done' : ''}`}
                              >
                                   <span className="steps-item-button">
                                        {index + 1}
                                   </span>
                                   <span className="step-title">
                                        {step.title}
                                   </span>
                              </li>
                         ))}
                    </ul>
                    <div className="step-content">
                         {activeIndex === 0 && (
                              <Recipient goToNextStep={goToNextStep} />
                         )}
                         {activeIndex === 1 && (
                              <Delivery goToNextStep={goToNextStep} />
                         )}
                         {activeIndex === 2 && (
                              <Payment goToNextStep={goToNextStep} />
                         )}
                         {activeIndex === 3 && (
                              <OrderConfirmation
                                   setIsSubmittingOrderLoading={
                                        setIsSubmittingOrderLoading
                                   }
                              />
                         )}
                    </div>
                    <div className="buttons-container">
                         <Button className="nav-button" onClick={onCancelOrder}>
                              Отменить заказ
                         </Button>
                         <Button
                              className="nav-button"
                              onClick={goToLastStep}
                              disabled={activeIndex === 0}
                         >
                              Назад
                         </Button>
                    </div>
               </div>
          </div>
     );
};

export const OrderContent = styled(OrderContentContainer)`
     padding: 20px;
     max-width: 1000px;
     margin: 0 auto;
     box-sizing: border-box;

     h3 {
          margin-bottom: 20px;
          font-size: 24px;
          font-weight: bold;
          text-align: center;

          @media (max-width: 768px) {
               font-size: 20px;
          }

          @media (max-width: 480px) {
               font-size: 18px;
          }
     }

     .steps-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
          position: relative;
     }

     .step-list {
          display: flex;
          justify-content: space-between;
          list-style: none;
          padding: 0;
          margin: 0;
          border-bottom: 1px solid #ddd;

          @media (max-width: 768px) {
               justify-content: center;
               gap: 10px;
          }

          @media (max-width: 480px) {
               gap: 5px;
          }
     }

     .steps-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 0;
          color: #666;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;

          &.steps-active {
               color: #000;
               font-weight: bold;
          }

          &.steps-done .steps-item-button {
               background-color: #4caf50;
               color: white;
          }

          @media (max-width: 768px) {
               font-size: 14px;
          }

          @media (max-width: 480px) {
               .step-title {
                    display: none;
               }
          }
     }

     .steps-item-button {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 1px solid #ddd;
          background-color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;

          &:hover {
               background-color: #f0f0f0;
          }

          @media (max-width: 480px) {
               width: 24px;
               height: 24px;
               font-size: 14px;
          }
     }

     .step-content {
          margin: 20px 0;
          min-height: 200px;

          @media (max-width: 768px) {
               margin: 15px 0;
          }

          @media (max-width: 480px) {
               margin: 10px 0;
               min-height: 150px;
          }
     }

     .buttons-container {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 20px;
          position: relative;
          width: 100%;
          box-sizing: border-box;

          @media (max-width: 768px) {
               flex-direction: column;
               align-items: center;
               gap: 10px;
          }

          @media (max-width: 480px) {
               gap: 8px;
          }
     }

     .nav-button {
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          background-color: #007bff;
          color: white;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          width: 200px;

          &:hover {
               background-color: #0056b3;
          }

          &:disabled {
               background-color: #cccccc;
               cursor: not-allowed;
          }

          @media (max-width: 768px) {
               width: 100%;
               max-width: 300px;
               font-size: 14px;
               padding: 8px 16px;
          }

          @media (max-width: 480px) {
               font-size: 12px;
               padding: 6px 12px;
          }
     }
`;
