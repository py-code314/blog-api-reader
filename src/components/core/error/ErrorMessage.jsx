/* -------------------- Styles -------------------- */
import styles from './ErrorMessage.module.css'
/* -------------------- Icons -------------------- */
import errorIcon from '../../../assets/icons/icon-error.svg'

/* Component to display error message when fetching data fails */
const ErrorMessage = ({ error }) => {
  return (
    <div className={styles.errorWrapper}>
      <div className={styles.errorImage}>
        <img
          className={styles.errorIcon}
          src={errorIcon}
          alt=""
          width={70}
          height={70}
        />
      </div>

      {/* Show error message based on response status code */}
      <div className={styles.errorContent}>
        {error.status === 404 ? (
          <>
            <span className={styles.statusCode}>{error.status}</span>
            <p>Resource not found.</p>
          </>
        ) : error.status === 403 ? (
          <>
            <span className={styles.statusCode}>{error.status}</span>
            <p>Access denied.</p>
          </>
        ) : error.status === 500 ? (
          <>
            <span className={styles.statusCode}>{error.status}</span>
            <p>Server error.</p>
          </>
        ) : (
          <p>An unexpected error occurred {error.message}.</p>
        )}
      </div>
    </div>
  )
}

export default ErrorMessage
