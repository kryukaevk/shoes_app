import styled from 'styled-components';

const FooterContainer = styled.footer`
     display: flex;
     flex-direction: column;
     align-items: center;
     padding: 20px;
     background-color: #272d39;
     color: white;
     z-index: 10;

     @media (min-width: 770px) {
          flex-direction: row;
          justify-content: flex-end;
          padding: 20px 40px;
     }
`;

const FooterText = styled.p`
     margin: 10px 0;
     font-size: 14px;
     color: #a9a9a9;
     cursor: pointer;
     text-align: center;

     &:hover {
          color: #21a1f1;
          transition: color 0.3s;
     }

     @media (min-width: 770px) {
          margin: 0 20px;
          font-size: 16px;
          text-align: right;
     }

     @media (max-width: 480px) {
          font-size: 12px;
          margin: 8px 0;
     }
`;

export const Footer = () => {
     return (
          <FooterContainer>
               <FooterText>Политика конфиденциальности</FooterText>
               <FooterText>Пользовательское соглашение</FooterText>
               <FooterText>Правила оказания услуг</FooterText>
          </FooterContainer>
     );
};
