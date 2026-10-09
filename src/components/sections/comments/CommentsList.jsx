/* -------------------- Styles -------------------- */
import styles from './CommentsList.module.css'
/* -------------------- Hooks -------------------- */
import { useState } from 'react'
/* -------------------- Components -------------------- */
import CommentCard from '../../core/comment/CommentCard'
import CommentForm from '../../forms/comment/comment-form/CommentForm'

/* Show list of comments */
const CommentsList = (props) => {
  // console.log('🚀 ~ CommentsList ~ comments:', comments)
  const { comments, isDelete, setIsDelete, postId } = props

  // State variables
  const [isActive, setIsActive] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [commentId, setCommentId] = useState(null)
  const [deleteErrorMsg, setDeleteErrorMsg] = useState('')

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

  const handleDeleteComment = async (id) => {
    // Author should be logged in to delete a comment
    const authToken = localStorage.getItem('jwtToken')
    setCommentId(null)
    setIsDelete(false)

    try {
      // To hide comment action buttons
      setIsActive(false)

      // API endpoint
      const baseUrl = import.meta.env.VITE_REACT_APP_API_URL
      const apiEndpoint = `${baseUrl}/posts/${postId}/comments/${commentId}/delete`

      const response = await fetch(apiEndpoint, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      // console.log('🚀 ~ handleDeleteComment ~ response:', response)

      const data = await response.json()
      // console.log('🚀 ~ handleDeleteComment ~ data:', data)

      if (!response.ok) {
        setCommentId(id)
        /* Set it to 'false' to prevent resetting 'deleteErrorMsg' to
          empty string by Post re-render */
        setIsDelete(false)

        if (response.status === 400) {
          setDeleteErrorMsg(
            data?.errorMessage || 'Bad request. Please try again.',
          )
        } else if (response.status === 401) {
          setDeleteErrorMsg(
            data?.errorMessage ||
              'Authentication error. Please login to delete comment.',
          )
        } else if (response.status >= 500) {
          setDeleteErrorMsg(
            data?.errorMessage || 'Server error. Please try again.',
          )
        } else {
          setDeleteErrorMsg(
            data?.errorMessage || 'Failed to delete. Please try again.',
          )
        }

        return
      }

      // Re-render Post only upon successful deletion of comment
      setIsDelete(true)

      setDeleteErrorMsg('')
      setCommentId(null)
    } catch (err) {
      console.error('Deletion error:', err)
      // Handle network errors and other system errors
      setDeleteErrorMsg(
        'A network or unexpected error occurred. Please try again.',
      )
      setCommentId(id)
      setIsDelete(false)
      setIsActive(false)
    }
  }

  return (
    <>
      <div className={styles.comments}>
        {comments?.length === 0 ? (
          <p>Be the first one to add a comment.</p>
        ) : (
          <ul className={styles.list}>
            {comments?.map((comment) => (
              <div key={comment.id}>
                {isEdit && comment.id === commentId ? (
                  <CommentForm
                    comment={comment}
                    isEdit={isEdit}
                    setIsEdit={setIsEdit}
                  />
                ) : (
                  <CommentCard
                    comment={comment}
                    commentId={commentId}
                    handleEditComment={handleEditComment}
                    handleDeleteComment={handleDeleteComment}
                    handleToggle={handleToggle}
                    isActive={isActive}
                    isDelete={isDelete}
                    deleteErrorMsg={deleteErrorMsg}
                  />
                )}
              </div>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

export default CommentsList
