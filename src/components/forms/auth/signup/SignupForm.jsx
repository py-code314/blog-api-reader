/* -------------------- Styles -------------------- */
import styles from './SignupForm.module.css'
/* -------------------- Icons -------------------- */
import checkIcon from '../../../../assets/icons/icon-check.svg'
import errorIcon from '../../../../assets/icons/icon-error-2.svg'
/* -------------------- Hooks -------------------- */
import { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
/* -------------------- Components -------------------- */
import Button from '../../../core/button/Button'
/* -------------------- Functions -------------------- */
import {
  validateNameInput,
  validateEmailInput,
  validatePasswordInput,
  validateConfirmPasswordInput,
  displayEmptyInputErrors,
  registerUser,
  displayServerValidationErrors,
} from '../../../../utils/auth/signup/index.js'

const SignupForm = () => {
  const nameInputRef = useRef(null)
  const navigate = useNavigate()

  // State variables
  const defaultSignupFormData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  }
  const [signupFormData, setSignupFormData] = useState(defaultSignupFormData)

  const defaultValidFormData = {
    name: null,
    email: null,
    password: null,
    confirmPassword: null,
  }
  const [validFormData, setValidFormData] = useState(defaultValidFormData)

  const defaultErrorMessages = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  }
  const [errorMessages, setErrorMessages] = useState(defaultErrorMessages)

  const [signupErrorMsg, setSignupErrorMsg] = useState('')
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)

  useEffect(() => {
    // Focus in name field after page load
    if (nameInputRef.current) {
      nameInputRef.current.focus()
    }
  }, [])

  // Handle form fields
  const handleNameChange = (e) => {
    const name = e.target.value
    setSignupFormData((prevFormData) => ({
      ...prevFormData,
      name,
    }))

    validateNameInput(name, setValidFormData, setErrorMessages)
  }

  const handleEmailChange = (e) => {
    const email = e.target.value

    setSignupFormData((prevFormData) => ({
      ...prevFormData,
      email,
    }))

    validateEmailInput(email, setValidFormData, setErrorMessages)
  }

  const handlePasswordChange = (e) => {
    const password = e.target.value

    setSignupFormData((prevFormData) => ({
      ...prevFormData,
      password,
    }))

    validatePasswordInput(password, setValidFormData, setErrorMessages)
  }

  const handleConfirmPasswordChange = (e) => {
    const confirmPassword = e.target.value
    const password = signupFormData.password
    setSignupFormData((prevFormData) => ({
      ...prevFormData,
      confirmPassword,
    }))

    validateConfirmPasswordInput(
      confirmPassword,
      setValidFormData,
      setErrorMessages,
      password,
    )
  }

  // TODO: Refactor this function based on the similar function in LoginForm component
  const validateForm = () => {
    displayEmptyInputErrors(signupFormData, setValidFormData, setErrorMessages)

    if (
      validFormData.email === true &&
      validFormData.password === true &&
      validFormData.confirmPassword === true &&
      validFormData.name === true
    ) {
      return true
    } else {
      return false
    }
  }

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setIsFormSubmitted(true)
    setSignupErrorMsg('')

    // const isValid = true
    const isValid = validateForm()
    // console.log('🚀 ~ handleFormSubmit ~ isValid:', isValid)

    if (!isValid) {
      setIsFormSubmitted(false)
      return
    }

    try {
      // Send sign-up data to server
      const response = await registerUser(signupFormData)
      // console.log('🚀 ~ handleFormSubmit ~ response:', response)

      // This will be error object or data from backend
      const data = await response.json()
      // console.log('🚀 ~ handleFormSubmit ~ data:', data)

      if (!response.ok) {
        setIsFormSubmitted(false)

        if (response.status === 400 && data?.errors?.length > 0) {
          displayServerValidationErrors(
            data.errors,
            setValidFormData,
            setErrorMessages,
          )
          setSignupErrorMsg(
            data.errorMessage || 'Check form fields and try again.',
          )
        } else if (response.status === 400) {
          setSignupErrorMsg(
            data?.errorMessage ||
              'Bad request. Please check input and try again.',
          )
        } else if (response.status >= 500) {
          setSignupErrorMsg(
            data?.errorMessage || 'Server error. Please try again.',
          )
        } else {
          setSignupErrorMsg(
            data?.errorMessage || 'Signup failed. Please try again.',
          )
        }

        return
      }

      // Successful submission
      if (data && data.success) {
        // Reset state
        setIsFormSubmitted(false)
        setSignupFormData(defaultSignupFormData)
        setValidFormData(defaultValidFormData)
        setErrorMessages(defaultErrorMessages)

        // Navigate to login page and show success message
        navigate('/login', {
          replace: true,
          state: {
            message: '✅ Signup successful! Please log in to continue.',
          },
        })
      } else {
        setIsFormSubmitted(false)
        setSignupErrorMsg(
          data?.errorMessage || 'Signup failed. Please try again.',
        )
      }
    } catch (error) {
      // Network errors, DNS errors or other system errors are caught here
      console.error('Error:', error)
      setIsFormSubmitted(false)

      setSignupErrorMsg(
        'A network or unexpected error occurred. Please try again.',
      )
    } finally {
      setIsFormSubmitted(false)
    }
  }

  return (
    <div className={styles.formWrapper}>
      {/* Display server and network errors  */}
      {signupErrorMsg && (
        <p className={styles.signupError} aria-live="polite" id="signup-error">
          {signupErrorMsg}
        </p>
      )}
      {/* Sign-up form */}
      <form className={styles.form} noValidate onSubmit={handleFormSubmit}>
        {/* Name input */}
        <div className={styles.formControl}>
          <label htmlFor="name" className={styles.formLabel}>
            Full Name (required)
          </label>
          <p className={styles.formHint} id="name-hint">
            Name must contain at least 2 letters and only spaces or hyphens
          </p>

          <div className={styles.formValid}>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Cosmo Kramer"
              className={styles.formInput}
              autoComplete="name"
              value={signupFormData.name}
              onChange={handleNameChange}
              ref={nameInputRef}
            />
            {validFormData.name && (
              <img
                className={styles.formCheckmark}
                aria-hidden="true"
                src={checkIcon}
                alt=""
                width={25}
                height={25}
              />
            )}
          </div>
          {validFormData.name === false && (
            <div className={styles.formError}>
              <img
                className={styles.formErrorIcon}
                aria-hidden="true"
                src={errorIcon}
                alt=""
                width={18}
                height={18}
              />
              <p
                className={styles.formErrorMsg}
                aria-live="polite"
                id="invalid-name">
                {errorMessages.name}
              </p>
            </div>
          )}
        </div>

        {/* Email input */}
        <div className={styles.formControl}>
          <label htmlFor="email" className={styles.formLabel}>
            Email (required)
          </label>
          <p className={styles.formHint} id="email-hint">
            Eg. user_123@example.com
          </p>

          <div className={styles.formValid}>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="cosmo.kramer@protonmail.com"
              className={styles.formInput}
              autoComplete="email"
              inputMode="email"
              required
              value={signupFormData.email}
              onChange={handleEmailChange}
            />
            {validFormData.email && (
              <img
                className={styles.formCheckmark}
                aria-hidden="true"
                src={checkIcon}
                alt=""
                width={25}
                height={25}
              />
            )}
          </div>
          {validFormData.email === false && (
            <div className={styles.formError}>
              <img
                className={styles.formErrorIcon}
                aria-hidden="true"
                src={errorIcon}
                alt=""
                width={18}
                height={18}
              />
              <p
                className={styles.formErrorMsg}
                aria-live="polite"
                id="invalid-email">
                {errorMessages.email}
              </p>
            </div>
          )}
        </div>

        {/* Password */}
        <div className={styles.formControl}>
          <label className={styles.formLabel} htmlFor="password">
            Password (required)
          </label>
          <p className={styles.formHint}>
            Requires at least 8 characters, one lowercase letter (a - z), one
            uppercase letter (A - Z), one number (0 - 9), and one special
            character (!@#$%^&amp;*)
          </p>
          <div className={styles.formValid}>
            <input
              className={styles.formInput}
              id="password"
              name="password"
              type="password"
              min={8}
              placeholder="Seinfeld#89"
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$"
              required
              value={signupFormData.password}
              onChange={handlePasswordChange}
            />
            {validFormData.password && (
              <img
                className={styles.formCheckmark}
                aria-hidden="true"
                src={checkIcon}
                alt=""
                width={25}
                height={25}
              />
            )}
          </div>
          {validFormData.password === false && (
            <div className={styles.formError}>
              <img
                className={styles.formErrorIcon}
                aria-hidden="true"
                src={errorIcon}
                alt=""
                width={18}
                height={18}
              />
              <p
                className={styles.formErrorMsg}
                aria-live="polite"
                id="invalid-password">
                {errorMessages.password}
              </p>
            </div>
          )}
        </div>

        {/* Confirm password */}
        <div className={styles.formControl}>
          <label className={styles.formLabel} htmlFor="confirmPassword">
            Confirm Password (required)
          </label>
          <div className={styles.formValid}>
            <input
              className={styles.formInput}
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              min={8}
              placeholder="Seinfeld#89"
              required
              value={signupFormData.confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            {validFormData.confirmPassword && (
              <img
                className={styles.formCheckmark}
                aria-hidden="true"
                src={checkIcon}
                alt=""
                width={25}
                height={25}
              />
            )}
          </div>
          {validFormData.confirmPassword === false && (
            <div className={styles.formError}>
              <img
                className={styles.formErrorIcon}
                aria-hidden="true"
                src={errorIcon}
                alt=""
                width={18}
                height={18}
              />
              <p
                className={styles.formErrorMsg}
                aria-live="polite"
                id="invalid-confirmPassword">
                {errorMessages.confirmPassword}
              </p>
            </div>
          )}
        </div>

        {/* Sign up button */}
        <Button
          className="btnSignup"
          title="Signup"
          type="submit"
          disabled={isFormSubmitted}>
          {isFormSubmitted ? 'Submitting...' : 'Sign up'}
        </Button>
      </form>
    </div>
  )
}

export default SignupForm
