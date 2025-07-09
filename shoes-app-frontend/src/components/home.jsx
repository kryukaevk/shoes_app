import styled from 'styled-components';

const Container = styled.div`
     width: 100vw;
     height: calc(100vh - 60px);
     position: relative;
     overflow: hidden;

     @media (max-width: 770px) {
          height: calc(100vh - 50px);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
     }

     @media (max-width: 480px) {
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
     }
`;

const FullScreenImage = styled.img`
     width: 100vw;
     height: 100%;
     object-fit: none;
     position: absolute;
     top: 0;
     left: 0;

     @media (max-width: 770px) {
          height: 45%;
          object-fit: cover;
          position: relative;
     }
`;

const MobileBottomImage = styled.img`
     display: none;

     @media (max-width: 768px) {
          display: block;
          width: 100vw;
          height: 45%;
          object-fit: cover;
          position: relative;
     }
`;

const TitleText = styled.h1`
     display: none;

     @media (max-width: 770px) {
          display: block;
          text-align: center;
          font-size: 16px;
          font-weight: bold;
          color: #242424;
          text-transform: uppercase;
          letter-spacing: 0.2rem;
          flex: 0 0 auto;
          margin: 0;
          margin-top: -45px;
          padding: 10px 0;
     }
`;

export const Home = () => {
     return (
          <Container>
               <FullScreenImage
                    src="/images/shoes.jpg"
                    alt="Классическая обувь"
               />
               <TitleText>O B U V C L A S S I C</TitleText>
               <MobileBottomImage
                    src="/images/shoes2.jpg"
                    alt="Дополнительная картинка"
               />
          </Container>
     );
};
