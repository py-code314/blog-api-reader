import { useState } from 'react'

/* Use hook to submit a form */
export const useSubmitForm = (url) => {
  // State variables
  const [errorMsg, setErrorMsg] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [data, setData] = useState(null)

  const handleSubmit = async (formData) => {
    setIsSubmitting(true)
    setErrorMsg('')
    setData(null)

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
      // console.log("🚀 ~ handleSubmit ~ response:", response)

      const data = await response.json()
      // console.log('🚀 ~ handleSubmit ~ data:', data)

      // Handle non-200 HTTP responses
      if (!response.ok) {
        setData(data)
        setIsSubmitting(false)

        if (response.status === 400) {
          setErrorMsg(
            data?.errorMessage ||
              'Bad request. Please check inputs and try again.',
          )
        } else if (response.status === 401) {
          setErrorMsg(
            data?.errorMessage ||
              'Authentication error. Please login to post a comment.',
          )
        } else if (response.status >= 500) {
          // console.log('status 500')
          setErrorMsg(data?.errorMessage || 'Server error. Please try again.')
        } else {
          setErrorMsg(data?.errorMessage || 'Could not submit the comment. Please try again.')
        }

        return
      }

      // Request is successful with 200 response status code
      setData(data)
      setIsSubmitting(false)
      setErrorMsg('')

      return data
    } catch (err) {
      console.error('Submission error:', err)
      // Handle network errors and other system errors
      setData(null)
      setIsSubmitting(false)
      // Catch request failure error and send a generic error message
      setErrorMsg('A network or unexpected error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return { handleSubmit, isSubmitting, data, errorMsg }
}