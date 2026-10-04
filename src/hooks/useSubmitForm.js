import { useState } from 'react'

/* Use hook to submit a form */
const useSubmitForm = () => {
  // State variables
  const [error, setError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [data, setData] = useState(null)

  const handleSubmit = async (e, formData) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(false)

    const authToken = localStorage.getItem('jwtToken')
    // Get base url
    const baseUrl = import.meta.env.VITE_REACT_APP_API_URL
    const apiEndpoint = `${baseUrl}/comment/new`

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const error = new Error(`HTTP error: Status ${response.status}`)
        // Add status code to the error
        error.status = response.status

        throw error
      }

      const data = await response.json()

      setData(data)
      setIsSubmitting(false)
      setError(false)
    } catch (err) {
      console.error('Submission error:', err)

      setData(null)
      setIsSubmitting(false)
      setError(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return { handleSubmit, isSubmitting, data, error }
}

export default useSubmitForm
