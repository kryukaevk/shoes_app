import { useState } from 'react';
import styled from 'styled-components';
import { Button } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { saveDeliveryData } from '../../../actions';
import { selectDeliveryData } from '../../../selectors';

const DeliveryContainer = ({ className, goToNextStep }) => {
     const dispatch = useDispatch();
     const deliveryData = useSelector(selectDeliveryData);

     const [formData, setFormData] = useState(deliveryData);

     const pickupPoints = [
          { id: 'point1', address: 'г. Санкт-Петербург, ул. Ленина, 10' },
          { id: 'point2', address: 'г. Москва, пр. Мира, 25' },
     ];

     const [errors, setErrors] = useState({});

     const validateForm = () => {
          const newErrors = {};
          if (formData.deliveryType === 'courier' && !formData.address.trim()) {
               newErrors.address = 'Адрес доставки обязателен';
          }
          if (formData.deliveryType === 'pickup') {
               const pickupPointValue =
                    typeof formData.pickupPoint === 'string'
                         ? formData.pickupPoint
                         : formData.pickupPoint?.id || '';
               if (!pickupPointValue.trim()) {
                    newErrors.pickupPoint = 'Выберите пункт самовывоза';
               }
          }
          setErrors(newErrors);
          return Object.keys(newErrors).length === 0;
     };

     const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData({ ...formData, [name]: value });
          setErrors({ ...errors, [name]: '' });
     };

     const handleSubmit = (e) => {
          e.preventDefault();
          if (validateForm()) {
               let deliveryDataToSave = { ...formData };
               if (formData.deliveryType === 'pickup') {
                    const selectedPoint = pickupPoints.find(
                         (point) => point.id === formData.pickupPoint
                    );
                    if (selectedPoint) {
                         deliveryDataToSave.pickupPoint = {
                              id: selectedPoint.id,
                              address: selectedPoint.address,
                         };
                    } else {
                         deliveryDataToSave.pickupPoint = {
                              id: '',
                              address: '',
                         };
                    }
               } else {
                    deliveryDataToSave.pickupPoint = { id: '', address: '' };
               }
               dispatch(saveDeliveryData(deliveryDataToSave));
               goToNextStep();
          }
     };

     return (
          <div className={className}>
               <h4>Данные доставки</h4>
               <form onSubmit={handleSubmit}>
                    <div className="form-group">
                         <label>Тип доставки</label>
                         <div className="radio-group">
                              <label>
                                   <input
                                        type="radio"
                                        name="deliveryType"
                                        value="courier"
                                        checked={
                                             formData.deliveryType === 'courier'
                                        }
                                        onChange={handleChange}
                                   />
                                   Курьер
                              </label>
                              <label>
                                   <input
                                        type="radio"
                                        name="deliveryType"
                                        value="pickup"
                                        checked={
                                             formData.deliveryType === 'pickup'
                                        }
                                        onChange={handleChange}
                                   />
                                   Самовывоз
                              </label>
                         </div>
                    </div>
                    {formData.deliveryType === 'courier' && (
                         <div className="form-group">
                              <label htmlFor="address">Адрес доставки</label>
                              <input
                                   type="text"
                                   id="address"
                                   name="address"
                                   value={formData.address}
                                   onChange={handleChange}
                                   placeholder="Введите адрес доставки"
                              />
                              {errors.address && (
                                   <span className="error">
                                        {errors.address}
                                   </span>
                              )}
                         </div>
                    )}
                    {formData.deliveryType === 'pickup' && (
                         <div className="form-group">
                              <label htmlFor="pickupPoint">
                                   Пункт самовывоза
                              </label>
                              <select
                                   id="pickupPoint"
                                   name="pickupPoint"
                                   value={formData.pickupPoint}
                                   onChange={handleChange}
                              >
                                   <option value="">
                                        Выберите пункт самовывоза
                                   </option>
                                   {pickupPoints.map((point) => (
                                        <option key={point.id} value={point.id}>
                                             {point.address}
                                        </option>
                                   ))}
                              </select>
                              {errors.pickupPoint && (
                                   <span className="error">
                                        {errors.pickupPoint}
                                   </span>
                              )}
                         </div>
                    )}
                    <Button type="submit">Далее</Button>
               </form>
          </div>
     );
};

export const Delivery = styled(DeliveryContainer)`
     padding: 20px;
     max-width: 600px;
     margin: 0 auto;

     h4 {
          margin-bottom: 20px;
          font-size: 20px;
          font-weight: bold;
     }

     .form-group {
          margin-bottom: 15px;
     }

     label {
          display: block;
          margin-bottom: 5px;
          font-size: 16px;
     }

     input,
     select {
          width: 100%;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
     }

     .radio-group {
          display: flex;
          gap: 20px;
          margin-bottom: 15px;
     }

     .radio-group label {
          display: flex;
          align-items: center;
          gap: 5px;
     }

     .error {
          color: #d32f2f;
          font-size: 14px;
          margin-top: 5px;
          display: block;
     }
`;
