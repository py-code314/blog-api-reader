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
      <h2>Create account</h2>
      <p>Join our 100% free blog network</p>
      {/* <SignupForm/> */}
      <div>SignupForm</div>
      <div className={styles.imgContainer}>
        <img src={booksImage} alt="" width={100} height={200} />
      </div>
      <p>
        Already have an account?
        <Link className={styles.linkLogin} to={'/login'}>
          Login
        </Link>
      </p>
      <p>
        By creating an account, you agree to our <span>terms of use</span>
      </p>
    </main>
  )
}

export default SignupPage
