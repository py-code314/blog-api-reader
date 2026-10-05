/* Function to validate comment */
export function validateCommentInput(comment, setValidFormData, setErrorMsgs) {
  const trimmedComment = comment.trim()

  if (!trimmedComment) {
    // setValidFormData(false)
    // setErrorMsgs('Please add a comment before submitting')
    setValidFormData((prevValid) => ({ ...prevValid, content: false }))
    setErrorMsgs((prevErrors) => ({
      ...prevErrors,
      content: 'Please add a comment before submitting',
    }))
  } else {
    // setValidFormData(true)
    // setErrorMsgs('')
    setValidFormData((prevValid) => ({ ...prevValid, content: true }))
    setErrorMsgs((prevErrors) => ({
      ...prevErrors,
      content: '',
    }))
  }
}
