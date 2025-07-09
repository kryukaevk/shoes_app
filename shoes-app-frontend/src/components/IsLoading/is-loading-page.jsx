import styled from 'styled-components';

const IsLoadingPageContainer = ({ className }) => {
     return (
          <div className={className}>
               <div className="loading-container">
                    <div className="spinner"></div>
               </div>
          </div>
     );
};

export const IsLoadingPage = styled(IsLoadingPageContainer)`
     height: 100vh;
     display: flex;
     justify-content: center;
     align-items: center;

     .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          transform: translateY(-100px);
     }

     .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #3498db;
          border-radius: 50%;
          animation: spin 1s linear infinite;
     }

     @keyframes spin {
          0% {
               transform: rotate(0deg);
          }
          100% {
               transform: rotate(360deg);
          }
     }
`;
