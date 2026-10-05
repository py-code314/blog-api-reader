import { useState } from 'react'

/* Use hook to submit a form */
export const useSubmitForm = (url) => {
  // State variables
  const [error, setError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [data, setData] = useState(null)

  const handleSubmit = async (formData) => {
    setIsSubmitting(true)
    setError(false)

    const authToken = localStorage.getItem('jwtToken')

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      // console.log('🚀 ~ handleSubmit ~ data:', data)

      // Don't throw error if data has errors array
      // Add this check to make sure data doesn't become null in catch block
      if (
        !response.ok &&
        !(response.status === 400 && data?.errors.length > 0)
      ) {
        const error = new Error(`HTTP error: Status ${response.status}`)
        // Add status code to the error
        error.status = response.status

        throw error
      }

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
