/* Function to display server errors for invalid sign-up form data */
export function displayServerValidationErrors(
  errors,
  setValidFormData,
  setErrorMsgs,
) {
  console.log("🚀 ~ displayServerValidationErrors ~ errors:", errors)
  errors.forEach((error) => {
    if (error.path === 'content') {
      setValidFormData((prevValid) => ({
        ...prevValid,
        content: false,
      }))
      setErrorMsgs((prevErrors) => ({
        ...prevErrors,
        content: error.msg,
      }))
    }
  })
}
