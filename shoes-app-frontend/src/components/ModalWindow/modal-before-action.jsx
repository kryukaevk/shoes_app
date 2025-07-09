import styled from 'styled-components';
import { Button } from '../../components';
import { useSelector } from 'react-redux';
import {
     selectModalIsOpen,
     selectModalOnCancel,
     selectModalOnConfirm,
     selectModalText,
} from '../../selectors';

const ModalBeforeActionContainer = ({ className }) => {
     const isOpen = useSelector(selectModalIsOpen);
     const text = useSelector(selectModalText);
     const onConfirm = useSelector(selectModalOnConfirm);
     const onCancel = useSelector(selectModalOnCancel);

     if (!isOpen) {
          return null;
     }

     return (
          <div className={className}>
               <div className="overlay"></div>
               <div className="box">
                    <h3>{text}</h3>
                    <div className="buttons">
                         <Button width="120px" onClick={onConfirm}>
                              Да
                         </Button>
                         <Button width="120px" onClick={onCancel}>
                              Отмена
                         </Button>
                    </div>
               </div>
          </div>
     );
};

export const ModalBeforeAction = styled(ModalBeforeActionContainer)`
     position: fixed;
     z-index: 20;
     top: 0;
     bottom: 0;
     right: 0;
     left: 0;

     h3 {
          color: black;
     }

     .box {
          position: relative;
          margin: auto;
          text-align: center;
          padding: 0 30px 5px 31px;
          width: 215px;
          top: 50%;
          transform: translate(0, -50%);
          background-color: #fff;
          border: 1px solid #000;
          z-index: 30;
          border-radius: 4px;
     }

     .overlay {
          background-color: rgba(0, 0, 0, 0.8);
          width: 100%;
          height: 100%;
          position: absolute;
     }

     .buttons {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin: 15px 26px;
     }
`;
