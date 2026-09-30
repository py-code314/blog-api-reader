/* -------------------- Styles -------------------- */
import styles from './Authors.module.css'
/* -------------------- Icons/Images -------------------- */
// import readMoreIcon from '../../../assets/icons/icon-chevron-right.svg'
// import typewriterImg from '../../../assets/images/typewriter.jpg'
/* -------------------- Hooks -------------------- */
import { useFetchData } from '../../../hooks/useFetchData.js'
/* -------------------- Components -------------------- */
import { Link } from 'react-router'
import ErrorMessage from '../../core/error/ErrorMessage.jsx'
/* -------------------- Functions -------------------- */
// import parse from 'html-react-parser'

/* Show authors names */
const Authors = () => {
  // Get all authors data
  const { data, isLoading, error } = useFetchData(
    'http://localhost:8080/api/v1/authors/all',
  )

  // Show loading spinner while fetching the data
  if (isLoading)
    return (
      <div className={styles.authors}>
        <h2 className={styles.heading}>Authors</h2>
        <div className={styles.loader}></div>
      </div>
    )

  // Show error message upon failure to fetch the data
  if (error)
    return (
      <div className={styles.authors}>
        <h2 className={styles.heading}>Authors</h2>
        <ErrorMessage error={error} />
      </div>
    )
  return (
    <div className={styles.authors}>
      <h2 className={styles.heading}>Authors</h2>
      {data?.authors.length === 0 ? (
        <p>🔴 No authors to show yet.</p>
      ) : (
        <ul className={styles.list}>
          {data?.authors.map((author) => (
            <li className={styles.tab} key={author.id}>
              <div className={styles.authorContainer}>
                <Link>{author.name}</Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Authors
