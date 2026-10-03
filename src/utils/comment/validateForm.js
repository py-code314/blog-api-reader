/* Function to check for empty form input */
export function validateForm(comment, validComment, setValidComment, setErrorMsg) {
  // Update state if input field is empty
  if (!comment.trim()) {
    setValidComment(false)
    setErrorMsg('Please add a comment before submitting')
  }
  

  return !!validComment
}
