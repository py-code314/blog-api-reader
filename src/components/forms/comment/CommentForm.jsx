/* -------------------- Styles -------------------- */
import styles from './CommentForm.module.css'
/* -------------------- Icons -------------------- */
// import profileIcon from '../../../assets/icons/icon-profile-1.svg'
// import profileIcon from '../../../assets/icons/icon-profile-2.svg'
import smileyIcon from '../../../assets/icons/icon-smiley.svg'
/* -------------------- Hooks -------------------- */
import { useState } from 'react'
/* -------------------- Components -------------------- */
import Button from '../../core/button/Button'
/* -------------------- Functions -------------------- */
import {
  validateForm,
  validateCommentInput,
} from '../../../utils/comment/index.js'

const CommentForm = () => {
  const [comment, setComment] = useState('')
  const [validComment, setValidComment] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  // Handler functions
  const handleComment = (e) => {
    const comment = e.target.value
    setComment(comment)

    validateCommentInput(comment, setValidComment, setErrorMsg)
  }
  const handleFormSubmit = (e) => {
    e.preventDefault()
    setErrorMsg('')

    // Check for empty input field
    const isValid = validateForm(
      comment,
      validComment,
      setValidComment,
      setErrorMsg,
    )
    console.log('🚀 ~ handleFormSubmit ~ isValid:', isValid)

    if (!isValid) return

    // try {
    // } catch (err) {
    //   console.error(err)
    // }
  }
  return (
    <>
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
              name="comment"
              id="comment"
              rows="5"
              // cols="30"
              placeholder="Add a comment..."
              required
              value={comment}
              onChange={handleComment}></textarea>
            <div className={styles.btnContainer}>
              {validComment === false && (
                <div className={styles.formError}>
                  <p
                    className={styles.formErrorMsg}
                    aria-live="polite"
                    id="invalid-comment">
                    {errorMsg}
                  </p>
                </div>
              )}
              {/* Add comment button */}
              <Button className="btnComment" title="Post comment" type="submit">
                Post
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default CommentForm
