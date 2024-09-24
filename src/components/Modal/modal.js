import React, { useState } from 'react';
import styles from './modal.module.css';

function Modal({ isOpen, onClose, coverImg, title }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  if (!isOpen) return null;

  const handleAddComment = () => {
    if (newComment) {
      setComments([...comments, newComment]);
      setNewComment('');
    }
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
                    <li key={index}>{comment}</li>
                  ))
                ) : (
                  <li>No comments yet</li>
                )}
              </ul>
            </div>

            <div className={styles.commentInputSection}>
              <input
                type="text"
                placeholder="Add a comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button onClick={handleAddComment}>Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
