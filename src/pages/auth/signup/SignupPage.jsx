/* -------------------- Styles -------------------- */
import styles from './SignupPage.module.css'
/* -------------------- Images -------------------- */
import booksImage from '../../../assets/images/books.jpg'
/* -------------------- Hooks -------------------- */
// import { useState } from 'react'
/* -------------------- Components -------------------- */
// import SignupForm from '../../forms/auth/signup-form/SignupForm'

import { Link } from 'react-router'

/* Signup page */
const SignupPage = () => {
  return (
    <main className={styles.main}>
      <div className={styles.signup}>
        <div className={styles.signupWrapper}>
          <div className={styles.headingContainer}>
            <h2>Create account</h2>
            <p className={styles.textSmall}>Join our 100% free blog network</p>
          </div>
          {/* <SignupForm/> */}
          <div className={styles.formContainer}>
            <div>SignupForm</div>
            <p className={styles.textSmall}>
              Already have an account? {' '}
              <Link className={styles.linkLogin} to={'/login'}>
                Login
              </Link>
            </p>
          </div>
          <p className={`${styles.textSmall} ${styles.textTerms}`}>
            By creating an account, you agree to our{' '}
            <span className={styles.terms}>terms of use</span>
          </p>
        </div>
        <div className={styles.imgContainer}>
          <img
            className={styles.booksImage}
            src={booksImage}
            alt=""
          />
        </div>
      </div>
    </main>
  )
}

export default SignupPage
