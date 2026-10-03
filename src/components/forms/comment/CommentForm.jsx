/* -------------------- Styles -------------------- */
import styles from './CommentForm.module.css'
/* -------------------- Icons -------------------- */
// import profileIcon from '../../../assets/icons/icon-profile-1.svg'
import profileIcon from '../../../assets/icons/icon-profile-2.svg'
/* -------------------- Hooks -------------------- */
import { useState } from 'react'
/* -------------------- Components -------------------- */
import Button from '../../core/button/Button'
/* -------------------- Functions -------------------- */
import { validateForm } from '../../../utils/comment/validateForm'

const CommentForm = () => {
  const [comment, setComment] = useState('')
  const [validComment, setValidComment] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  // Handler functions
  const handleComment = (e) => {
    const comment = e.target.value
    setComment(comment)

    // validateComment(comment, setValidComment, setErrorMsg)
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
  }
  return (
    <>
      <div>
        <div>
          {' '}
          <img src={profileIcon} alt="" width={30} height={30} />
          <p></p>
        </div>
        <form className={styles.form} noValidate onSubmit={handleFormSubmit}>
          <label className={styles.formLabel} htmlFor="comment">
            Comment (required)
          </label>
          {/* Comment box  */}
          <textarea
            className={styles.formInput}
            name="comment"
            id="comment"
            rows="5"
            cols="30"
            placeholder="Add your comment..."
            required
            value={comment}
            onChange={handleComment}></textarea>
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
        </form>
      </div>
    </>
  )
}

export default CommentForm
