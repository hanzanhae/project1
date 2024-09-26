import React, { useState } from 'react';
import styles from './modal.module.css';

function Modal({ isOpen, onClose, coverImg, title }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingComment, setEditingComment] = useState('');

  if (!isOpen) return null;

  const handleAddComment = () => {
    if (newComment) {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  const handleDeleteComment = (indexToDelete) => {
    setComments(comments.filter((_, index) => index !== indexToDelete));
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (editingIndex !== null) {
        handleSaveComment(editingIndex);
      } else {
        handleAddComment();
      }
    }
  };
  const handleEditComment = (index) => {
    setEditingIndex(index);
    setEditingComment(comments[index]);
  };

  const handleSaveComment = (index) => {
    const updatedComments = comments.map((comment, i) =>
      i === index ? editingComment : comment
    );
    setComments(updatedComments);
    setEditingIndex(null);
    setEditingComment('');
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          Close
        </button>

        <div className={styles.modalBody}>
          <div className={styles.modalPoster}>
            <img src={coverImg} alt={title} />
          </div>

          <div className={styles.modalDetails}>
            <h2>{title}</h2>

            <div className={styles.commentsSection}>
              <h3>Comments</h3>
              <ul className={styles.commentsList}>
                {comments.length > 0 ? (
                  comments.map((comment, index) => (
                    <li key={index} className={styles.commentItem}>
                      {editingIndex === index ? (
                        <>
                          <input
                            type="text"
                            value={editingComment}
                            onChange={(e) => setEditingComment(e.target.value)}
                            onKeyDown={handleKeyDown}
                          />
                          <button onClick={() => handleSaveComment(index)}>
                            저장
                          </button>
                        </>
                      ) : (
                        <>
                          {comment}{' '}
                          <button
                            className={styles.editButton}
                            onClick={() => handleEditComment(index)}
                          >
                            수정
                          </button>
                          <button
                            className={styles.deleteButton}
                            onClick={() => handleDeleteComment(index)}
                          >
                            삭제
                          </button>
                        </>
                      )}
                    </li>
                  ))
                ) : (
                  <li>No comments yet</li>
                )}
              </ul>
            </div>

            <div className={styles.commentInputSection}>
              <input
                type="text"
                placeholder="후기 남기기"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              {/* <button onClick={handleAddComment}></button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
