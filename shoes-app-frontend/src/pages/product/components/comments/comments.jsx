import styled from 'styled-components';
import { useState } from 'react';
import { IconButton } from '../../../../components/icon';
import { FaPaperPlane } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserRole } from '../../../../selectors';
import { addCommentAsync } from '../../../../actions';
import { Comment } from './components';
import { checkAccess } from '../../../../utils/check-access';
import { ROLE } from '../../../../constants';
import { formatDate } from '../../../../utils';

const CommentsContainer = ({ className, comments, productId }) => {
     const [newComment, setNewComment] = useState('');
     const dispatch = useDispatch();

     const roleId = useSelector(selectUserRole);
     const isAuthorized = checkAccess(
          [ROLE.ADMIN, ROLE.MODERATOR, ROLE.BUYER],
          roleId
     );

     const onNewCommentAdd = (productId, content) => {
          dispatch(addCommentAsync(productId, content));
          setNewComment('');
     };

     return (
          <div className={className}>
               {isAuthorized && (
                    <div className="new-comment">
                         <textarea
                              name="comment"
                              value={newComment}
                              placeholder="Отзыв..."
                              onChange={({ target }) => {
                                   setNewComment(target.value);
                              }}
                         ></textarea>
                         <IconButton
                              icon={<FaPaperPlane />}
                              size="17px"
                              top={3}
                              onClick={() => {
                                   onNewCommentAdd(productId, newComment);
                              }}
                         />
                    </div>
               )}
               <div>
                    {comments.map(({ id, author, content, publishedAt }) => (
                         <Comment
                              key={id}
                              id={id}
                              author={author}
                              content={content}
                              productId={productId}
                              createdAt={formatDate(publishedAt)}
                              roleId={roleId}
                         />
                    ))}
               </div>
          </div>
     );
};

export const Comments = styled(CommentsContainer)`
     display: flex;
     flex-direction: column;
     margin: 10px auto;
     width: 100%;
     max-width: 500px;
     padding: 0 10px;

     .new-comment {
          display: flex;
          gap: 10px;
          width: 100%;
          margin-bottom: 10px;
     }

     textarea {
          width: 100%;
          height: 100px;
          font-size: 16px;
          resize: none;
          border-radius: 5px;
          padding: 10px;
     }

     @media (max-width: 770px) {
          max-width: 100%;
          padding: 0 5px;

          textarea {
               height: 80px;
               font-size: 14px;
          }
     }

     @media (max-width: 480px) {
          textarea {
               height: 60px;
               font-size: 12px;
          }
     }
`;
