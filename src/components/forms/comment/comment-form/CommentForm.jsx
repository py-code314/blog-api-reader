/* -------------------- Styles -------------------- */
import styles from './CommentForm.module.css'
/* -------------------- Icons -------------------- */
import smileyIcon from '../../../../assets/icons/icon-smiley.svg'
import profileIcon from '../../../../assets/icons/icon-profile-2.svg'
/* -------------------- Context -------------------- */
import { PostContext } from '../../../../contexts/post/PostContext'
/* -------------------- Hooks -------------------- */
import { useContext, useState } from 'react'
import { useSubmitForm } from '../../../../hooks/useSubmitForm.js'
/* -------------------- Components -------------------- */
import Button from '../../../core/button/Button.jsx'
/* -------------------- Functions -------------------- */
import {
  validateForm,
  validateCommentInput,
} from '../../../../utils/comment/index.js'

const CommentForm = (props) => {
  // Destructure
  const { comment = {}, isEdit = false, setIsEdit = () => {} } = props
  const commentId = comment.id
  const { postId, setIsSubmitted } = useContext(PostContext)

  // API endpoint
  const baseUrl = import.meta.env.VITE_REACT_APP_API_URL
  const apiEndpoint = isEdit
    ? `${baseUrl}/posts/${postId}/comments/${commentId}/update`
    : `${baseUrl}/posts/${postId}/comments/new`

  // Call use hook to submit form
  const { handleSubmit, isSubmitting, data, errorMsg } =
    useSubmitForm(apiEndpoint)
  // console.log('🚀 ~ CommentForm ~ isSubmitting:', isSubmitting)
  // console.log('🚀 ~ CommentForm ~ data:', data)
  // console.log('🚀 ~ CommentForm ~ errorMsg:', errorMsg)

  // State variables
  const defaultCommentFormData = {
    content: comment.content || '',
  }
  const [commentFormData, setCommentFormData] = useState(defaultCommentFormData)

  const defaultValidFormData = {
    content: null,
  }
  const [validFormData, setValidFormData] = useState(defaultValidFormData)

  const defaultErrorMsgs = {
    content: '',
  }
  const [errorMsgs, setErrorMsgs] = useState(defaultErrorMsgs)

  let fieldErrors = {}
  if (data?.errors?.length > 0) {
    const { errors } = data
    errors.forEach((error) => (fieldErrors[error.path] = error.msg))
  }

  // Handler functions
  const handleComment = (e) => {
    const content = e.target.value
    setCommentFormData((prevFormData) => ({
      ...prevFormData,
      content,
    }))

    validateCommentInput(content, setValidFormData, setErrorMsgs)
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitted(true)

    // Check for empty input field
    const isValid = validateForm(
      commentFormData,
      setValidFormData,
      setErrorMsgs,
    )

    // console.log('🚀 ~ handleFormSubmit ~ isValid:', isValid)

    if (!isValid) {
      setIsSubmitted(false)
      return
    }

    // Update variables in use hook
    const data = await handleSubmit(commentFormData)
    // console.log('🚀 ~ handleFormSubmit ~ data:', data)

    if (data?.success) {
      setCommentFormData(defaultCommentFormData)
      setValidFormData(defaultValidFormData)
      setErrorMsgs(defaultErrorMsgs)
      // Update state to re-render post component
      setIsSubmitted(false)
    }
  }

  // Reset state if user cancels editing comment
  const handleCancel = () => {
    setIsEdit(false)
    setCommentFormData(defaultCommentFormData)
    setValidFormData(defaultValidFormData)
    setErrorMsgs(defaultErrorMsgs)
  }

  return (
    <>
      <div className={styles.comment}>
        {errorMsg && <p className={styles.submitErrorMsg}>{errorMsg}</p>}
        <div className={styles.formContainer}>
          {/* Show icon based on 'isEdit' */}
          {isEdit ? (
            <div className={styles.imgContainer}>
              <img
                className={styles.profileIcon}
                src={profileIcon}
                alt=""
                width={30}
                height={30}
              />
            </div>
          ) : (
            <div className={styles.imageContainer}>
              {' '}
              <img src={smileyIcon} alt="" width={30} height={30} />
            </div>
          )}

          <form className={styles.form} noValidate onSubmit={handleFormSubmit}>
            {/* Show commenter's name when editing */}
            {isEdit && (
              <p className={styles.name}>
                <strong>{comment?.author?.name}</strong>
              </p>
            )}
            <label
              className={`${styles.formLabel} ${styles.srOnly}`}
              htmlFor="comment">
              {isEdit ? (
                <span>Edit comment</span>
              ) : (
                <span>Comment (required)</span>
              )}
            </label>
            {/* Comment box  */}
            <div className={styles.commentContainer}>
              <textarea
                className={styles.formInput}
                name="content"
                id="comment"
                rows="5"
                placeholder="Add a comment..."
                required
                value={commentFormData.content}
                onChange={handleComment}></textarea>
              <div className={styles.btnsContainer}>
                {fieldErrors?.content && (
                  <p className={styles.fieldErrorMsg}>{fieldErrors.content}</p>
                )}
                {validFormData.content === false && (
                  <div className={styles.formError}>
                    <p
                      className={styles.formErrorMsg}
                      aria-live="polite"
                      id="invalid-comment">
                      {errorMsgs.content}
                    </p>
                  </div>
                )}
                {/* Comment buttons */}
                <div className={styles.btns}>
                  {/* Show Cancel button for edit form  */}
                  {isEdit && (
                    <Button
                      className="btnCancel"
                      title="Cancel edit"
                      onClick={handleCancel}>
                      Cancel
                    </Button>
                  )}
                  <Button
                    className="btnPost"
                    title="Post comment"
                    disabled={isSubmitting}
                    type="submit">
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default CommentForm
