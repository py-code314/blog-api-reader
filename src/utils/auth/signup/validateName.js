/* Function to validate name */
export function validateNameInput(name, setValidFormData, setErrorMessages) {
  const trimmedName = name.trim()

  // Name should only contain alphabets, spaces and hyphen with a minimum of 2 alphabets
  const nameRegex = /^(?=(?:.*[A-Za-z]){2})[A-Za-z\s-]{2,}$/

  if (!trimmedName) {
    setValidFormData((prevValid) => ({ ...prevValid, name: false }))
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      name: 'Please enter your name',
    }))
  } else if (!nameRegex.test(trimmedName)) {
    setValidFormData((prevValid) => ({ ...prevValid, name: false }))
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      name: 'Invalid name',
    }))
  } else {
    setValidFormData((prevValid) => ({ ...prevValid, name: true }))
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      name: '',
    }))
  }
}
