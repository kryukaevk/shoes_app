import styled from 'styled-components';
import { FaUserCircle, FaClock, FaTrash } from 'react-icons/fa';
import { IconButton } from '../../../../../../components/icon';
import { useDispatch } from 'react-redux';
import {
     removeCommentAsync,
     openModal,
     CLOSE_MODAL,
} from '../../../../../../actions';
import { ROLE } from '../../../../../../constants';
import { checkAccess } from '../../../../../../utils/check-access';

const CommentContainer = ({
     className,
     id,
     author,
     content,
     productId,
     createdAt,
     roleId,
}) => {
     const dispatch = useDispatch();
     const isEmployee = checkAccess([ROLE.ADMIN, ROLE.MODERATOR], roleId);

     const onCommentRemove = (id) => {
          dispatch(
               openModal({
                    text: 'Удалить комментарий?',
                    onConfirm: () => {
                         dispatch(removeCommentAsync(id, productId));
                         dispatch(CLOSE_MODAL);
                    },
                    onCancel: () => dispatch(CLOSE_MODAL),
               })
          );
     };

     return (
          <div className={className}>
               {isEmployee && (
                    <IconButton
                         icon={<FaTrash />}
                         size="16px"
                         onClick={() => {
                              onCommentRemove(id, productId);
                         }}
                         className="trash-icon"
                    />
               )}
               <div className="comment">
                    <div className="comment-icons">
                         <div className="comment-author">
                              <FaUserCircle size="17px" />
                              <span
                                   className={`author-text ${author === 'Пользователь' ? 'deleted-user' : ''}`}
                              >
                                   {author}
                              </span>
                         </div>
                         <div className="comment-date">
                              <FaClock size="17px" />
                              <span className="date-text">{createdAt}</span>
                         </div>
                    </div>
                    <div className="comment-content">{content}</div>
               </div>
          </div>
     );
};

export const Comment = styled(CommentContainer)`
     margin: 8px 0;
     padding: 8px;
     border: 1px solid #ccc;
     border-radius: 5px;
     width: 100%;
     max-width: 473px;
     box-sizing: border-box;
     position: relative;

     .comment {
          width: 100%;
     }

     .comment-icons {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
     }

     .comment-author {
          font-weight: bold;
          display: flex;
          align-items: center;
     }

     .comment-content {
          margin: 8px 0 2px;
          font-size: 14px;
          line-height: 1.5;
     }

     .comment-date {
          font-size: 12px;
          color: #666;
          display: flex;
          align-items: center;
     }

     .author-text,
     .date-text {
          position: relative;
          top: -1px;
          margin-left: 5px;
     }

     .author-text.deleted-user {
          color: #999; /* Серый цвет для "Пользователь" */
     }

     .trash-icon {
          position: absolute;
          top: 8px;
          right: -25px;
     }

     @media (max-width: 768px) {
          padding: 6px;
          max-width: 100%;
          margin: 6px 0;

          .comment-content {
               font-size: 13px;
          }

          .comment-date {
               font-size: 11px;
          }

          .author-text,
          .date-text {
               margin-left: 4px;
          }

          .comment-author svg,
          .comment-date svg {
               width: 15px;
               height: 15px;
          }

          .trash-icon {
               top: 6px;
               right: 6px;
          }

          .trash-icon svg {
               width: 14px;
               height: 14px;
          }
     }

     @media (max-width: 480px) {
          padding: 5px;
          margin: 5px 0;

          .comment-content {
               font-size: 12px;
          }

          .comment-date {
               font-size: 10px;
          }

          .author-text,
          .date-text {
               margin-left: 3px;
          }

          .comment-author svg,
          .comment-date svg {
               width: 13px;
               height: 13px;
          }

          .trash-icon svg {
               width: 12px;
               height: 12px;
          }
     }
`;
