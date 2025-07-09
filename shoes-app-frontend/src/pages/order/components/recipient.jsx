import { useState } from 'react';
import styled from 'styled-components';
import { Button } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { saveRecipientData } from '../../../actions';
import { selectRecipientData } from '../../../selectors';

const RecipientContainer = ({ className, goToNextStep }) => {
     const dispatch = useDispatch();
     const recipientData = useSelector(selectRecipientData);

     const [formData, setFormData] = useState(recipientData);

     const [errors, setErrors] = useState({});

     const validateForm = () => {
          const newErrors = {};
          if (!formData.name.trim()) newErrors.name = 'Имя обязательно';
          if (!formData.surname.trim())
               newErrors.surname = 'Фамилия обязательно';
          if (!formData.phone.match(/^\+?\d{10,15}$/))
               newErrors.phone = 'Введите корректный номер телефона';
          if (!formData.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/))
               newErrors.email = 'Введите корректный email';
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
               dispatch(saveRecipientData(formData));
               goToNextStep();
          }
     };

     return (
          <div className={className}>
               <h4>Данные получателя</h4>
               <form onSubmit={handleSubmit}>
                    <div className="form-group">
                         <label htmlFor="name">Имя</label>
                         <input
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="Введите ваше имя"
                         />
                         {errors.name && (
                              <span className="error">{errors.name}</span>
                         )}
                    </div>
                    <div className="form-group">
                         <label htmlFor="surname">Фамилия</label>
                         <input
                              type="text"
                              id="surname"
                              name="surname"
                              value={formData.surname}
                              onChange={handleChange}
                              placeholder="Введите вашу фамилию"
                         />
                         {errors.name && (
                              <span className="error">{errors.surname}</span>
                         )}
                    </div>
                    <div className="form-group">
                         <label htmlFor="phone">Телефон</label>
                         <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="+7XXXXXXXXXX"
                         />
                         {errors.phone && (
                              <span className="error">{errors.phone}</span>
                         )}
                    </div>
                    <div className="form-group">
                         <label htmlFor="email">Email</label>
                         <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="example@email.com"
                         />
                         {errors.email && (
                              <span className="error">{errors.email}</span>
                         )}
                    </div>
                    <Button type="submit">Далее</Button>
               </form>
          </div>
     );
};

export const Recipient = styled(RecipientContainer)`
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

     input {
          width: 100%;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
     }

     .error {
          color: #d32f2f;
          font-size: 14px;
          margin-top: 5px;
          display: block;
     }
`;
