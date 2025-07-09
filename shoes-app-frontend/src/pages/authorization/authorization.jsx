import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Input, AuthErrorMessage } from '../../components';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../actions';
import { ROLE } from '../../constants';
import { selectUserRole } from '../../selectors';
import { useResetForm } from '../../hooks';
import { request } from '../../utils';

const authFormSchema = yup.object().shape({
     login: yup
          .string()
          .required('Заполните логин')
          .matches(
               /^\w+$/,
               'Неверно заполнен логин. Допускаются только буквы и цифры'
          )
          .min(3, 'Неверно заполнен логин. Минимум 3 символа')
          .max(15, 'Неверно заполнен логин. Максимум 15 символа'),
     password: yup
          .string()
          .required('Заполните пароль')
          .matches(
               /^[\w#%]+$/,
               'Неверно заполнен пароль. Допускаются буквы, цифры и знаки # %'
          )
          .min(6, 'Неверно заполнен пароль. Минимум 6 символов')
          .max(20, 'Неверно заполнен пароль. Максимум 20 символов'),
});

const StyledLink = styled(Link)`
     text-align: center;
     text-decoration: underline;
     margin: 10px 0;
     font-size: 18px;
     color: black;
`;

const AuthorizationContainer = ({ className }) => {
     const {
          register,
          reset,
          handleSubmit,
          formState: { errors },
     } = useForm({
          defaultValues: {
               login: '',
               password: '',
          },
          resolver: yupResolver(authFormSchema),
     });

     const dispatch = useDispatch();
     const navigate = useNavigate();
     const roleId = useSelector(selectUserRole);

     useEffect(() => {
          if (roleId !== ROLE.GUEST) {
               navigate('/');
          }
     }, [roleId, navigate]);

     useResetForm(reset);

     const [serverError, setServerError] = useState(null);

     const onSubmit = ({ login, password }) => {
          request('/auth/login', 'POST', { login, password }).then(
               ({ error, user }) => {
                    if (error) {
                         setServerError(`Ошибка запроса: ${error}`);
                         return;
                    }

                    dispatch(setUser(user));
                    localStorage.setItem('userData', JSON.stringify(user));
               }
          );
     };

     const formError = errors?.login?.message || errors?.password?.message;
     const errorMessage = formError || serverError;

     return (
          <div className={className}>
               <h2>Авторизация</h2>
               <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                         type="text"
                         placeholder="Логин..."
                         {...register('login', {
                              onChange: () => setServerError(null),
                         })}
                    />
                    <Input
                         type="password"
                         placeholder="Пароль..."
                         {...register('password', {
                              onChange: () => setServerError(null),
                         })}
                    />
                    <Button type="submit" disabled={!!formError}>
                         Авторизоваться
                    </Button>
                    {errorMessage && (
                         <AuthErrorMessage>{errorMessage}</AuthErrorMessage>
                    )}
                    <StyledLink to="/register">Регистрация</StyledLink>
               </form>
          </div>
     );
};

export const Authorization = styled(AuthorizationContainer)`
     display: flex;
     flex-direction: column;
     align-items: center;
     padding: 20px;
     min-height: calc(100vh - 60px);
     box-sizing: border-box;

     @media (max-width: 770px) {
          padding: 15px;
          min-height: calc(100vh - 50px);
     }

     @media (max-width: 480px) {
          padding: 10px;
     }

     & h2 {
          margin-bottom: 20px;
          font-size: 24px;

          @media (max-width: 480px) {
               font-size: 20px;
               margin-top: 30px;
          }
     }

     & form {
          display: flex;
          flex-direction: column;
          width: 100%;
          max-width: 400px;
          gap: 15px;

          @media (max-width: 480px) {
               max-width: 100%;
          }
     }

     & button {
          width: 100%;
     }

     & ${StyledLink} {
          font-size: 16px;
          margin-top: 10px;

          @media (max-width: 480px) {
               font-size: 14px;
          }
     }
`;
