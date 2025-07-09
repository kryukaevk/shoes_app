import styled from 'styled-components';

const ButtonsPanelContainer = ({
     className,
     id,
     backButton,
     editButton,
     deleteButton,
}) => {
     return (
          <div className={className}>
               {id && backButton}
               {editButton}
               {id && deleteButton}
          </div>
     );
};

export const ButtonsPanel = styled(ButtonsPanelContainer)`
     position: absolute;
     top: 20px;
     right: 20px;
     display: flex;
     gap: 10px;
`;
