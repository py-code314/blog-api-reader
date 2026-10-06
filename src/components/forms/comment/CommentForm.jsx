/* -------------------- Styles -------------------- */
import styles from './CommentForm.module.css'
/* -------------------- Icons -------------------- */
import smileyIcon from '../../../assets/icons/icon-smiley.svg'
/* -------------------- Hooks -------------------- */
import { useState } from 'react'
import { useSubmitForm } from '../../../hooks/useSubmitForm.js'
/* -------------------- Components -------------------- */
import Button from '../../core/button/Button'
/* -------------------- Functions -------------------- */
import {
  validateForm,
  validateCommentInput,
} from '../../../utils/comment/index.js'

const CommentForm = ({ postId, setIsSubmitted }) => {
  // API endpoint
  const baseUrl = import.meta.env.VITE_REACT_APP_API_URL
  const apiEndpoint = `${baseUrl}/posts/${postId}/comments/new`

  // Call use hook to submit form
  const { handleSubmit, isSubmitting, data, errorMsg } =
    useSubmitForm(apiEndpoint)
  // console.log('🚀 ~ CommentForm ~ isSubmitting:', isSubmitting)
  // console.log('🚀 ~ CommentForm ~ data:', data)
  // console.log('🚀 ~ CommentForm ~ errorMsg:', errorMsg)

  // State variables
  const defaultCommentFormData = {
    content: '',
  }
  const [commentFormData, setCommentFormData] = useState(defaultCommentFormData)

  const defaultValidFormData = {
    content: null,
  }
  const [validFormData, setValidFormData] = useState(defaultValidFormData)

  const defaultErrorMessages = {
    content: '',
  }
  const [errorMsgs, setErrorMsgs] = useState(defaultErrorMessages)

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

    // Check for empty input field
    // const isValid = true
    const isValid = validateForm(
      commentFormData,
      validFormData,
      setValidFormData,
      setErrorMsgs,
    )
    // console.log('🚀 ~ handleFormSubmit ~ isValid:', isValid)

    if (!isValid) return

    // Update variables in use hook
    const data = await handleSubmit(commentFormData)
    // console.log('🚀 ~ handleFormSubmit ~ data:', data)

    if (data?.success) {
      setCommentFormData(defaultCommentFormData)
      setValidFormData(defaultValidFormData)
      setErrorMsgs(defaultErrorMessages)
      // Update state to re-render post component
      setIsSubmitted(true)
    }
  }

  return (
    <>
      <div className={styles.comment}>
        {errorMsg && <p className={styles.submitErrorMsg}>{errorMsg}</p>}
        <div className={styles.formContainer}>
          <div className={styles.imageContainer}>
            {' '}
            <img src={smileyIcon} alt="" width={30} height={30} />
          </div>
          <form className={styles.form} noValidate onSubmit={handleFormSubmit}>
            <label
              className={`${styles.formLabel} ${styles.srOnly}`}
              htmlFor="comment">
              Comment (required)
            </label>
            {/* Comment box  */}
            <div className={styles.commentContainer}>
              <textarea
                className={styles.formInput}
                name="content"
                id="comment"
                rows="5"
                // cols="30"
                placeholder="Add a comment..."
                required
                value={commentFormData.content}
                onChange={handleComment}></textarea>
              <div className={styles.btnContainer}>
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
                {/* Add comment button */}
                <Button
                  className="btnComment"
                  title="Post comment"
                  disabled={isSubmitting}
                  type="submit">
                  Post
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default CommentForm
