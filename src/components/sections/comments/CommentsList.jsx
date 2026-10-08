/* -------------------- Styles -------------------- */
import styles from './CommentsList.module.css'
/* -------------------- Hooks -------------------- */
import { useState } from 'react'
/* -------------------- Components -------------------- */
// import EditCommentForm from '../../forms/comment/edit-comment-form/EditCommentForm'
import CommentCard from '../../core/comment/CommentCard'

/* Show list of comments */
const CommentsList = ({ comments }) => {
  // console.log('🚀 ~ CommentsList ~ comments:', comments)

  // State variables
  const [isActive, setIsActive] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [commentId, setCommentId] = useState(null)

  // Function to toggle Edit and Delete buttons
  const handleToggle = (id) => {
    setIsActive(!isActive)
    setCommentId(id)
  }

  const handleEditComment = (id) => {
    setIsEdit(true)
    setIsActive(false)
    setCommentId(id)
  }
  const handleDeleteComment = () => {}

  return (
    <>
      <div className={styles.comments}>
        {comments?.length === 0 ? (
          <p>Be the first one to add a comment.</p>
        ) : (
          <ul className={styles.list}>
            {comments?.map((comment) => (
              // Comment
              <CommentCard
                key={comment.id}
                props={{
                  comment,
                  commentId,
                  setCommentId,
                  handleEditComment,
                  handleDeleteComment,
                  handleToggle,
                  isActive,
                }}
              />
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

export default CommentsList
