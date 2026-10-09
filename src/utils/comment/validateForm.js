/* Function to check for empty form inputs */
export function validateForm(commentFormData, setValidFormData, setErrorMsgs) {
  let isValid = true

  // Update state if input field is empty
  if (!commentFormData.content.trim()) {
    setValidFormData((prevValid) => ({ ...prevValid, content: false }))
    setErrorMsgs((prevErrors) => ({
      ...prevErrors,
      content: 'Please add a comment before submitting',
    }))
    isValid = false
  } else {
    setValidFormData((prevValid) => ({ ...prevValid, content: true }))
    setErrorMsgs((prevErrors) => ({
      ...prevErrors,
      content: '',
    }))
  }

  return isValid
}
