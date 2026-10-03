/* Function to validate comment */
export function validateCommentInput(comment, setValidComment, setErrorMsg) {
  const trimmedComment = comment.trim()

  if (!trimmedComment) {
    setValidComment(false)
    setErrorMsg('Please add a comment before submitting')
  } else {
    setValidComment(true)
    setErrorMsg('')
  }
}
