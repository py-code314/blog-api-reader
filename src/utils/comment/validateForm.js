/* Function to check for empty form input */
export function validateForm(
  commentFormData,
  validFormData,
  setValidFormData,
  setErrorMsgs,
) {
  // Update state if input field is empty
  if (!commentFormData.content.trim()) {
    // setValidComment(false)
    // setErrorMsg('Please add a comment before submitting')
    setValidFormData((prevValid) => ({ ...prevValid, content: false }))
    setErrorMsgs((prevErrors) => ({
      ...prevErrors,
      content: 'Please add a comment before submitting',
    }))
  }

  return !!validFormData.content
}
