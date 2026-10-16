/* -------------------- Styles -------------------- */
import styles from './Tags.module.css'
/* -------------------- Hooks -------------------- */
import { useFetchData } from '../../../hooks/useFetchData.js'
/* -------------------- Components -------------------- */
import { Link } from 'react-router'
import ErrorMessage from '../../core/error/ErrorMessage.jsx'

/* Show tags */
const Tags = () => {
  // Get all tags data
  const { data, isLoading, error } = useFetchData(
    'http://localhost:8080/api/v1/tags/all',
  )

  // Show loading spinner while fetching the data
  if (isLoading)
    return (
      <div className={styles.tags}>
        <h2 className={styles.heading}>Tags</h2>
        <div className={styles.loader}></div>
      </div>
    )

  // Show error message upon failure to fetch the data
  if (error)
    return (
      <div className={styles.tags}>
        <h2 className={styles.heading}>Tags</h2>
        <ErrorMessage error={error} />
      </div>
    )

  const tags = data?.tags
  const tagNamesArray = tags?.map((tag) => tag.name)
  // Filter out duplicate names
  const filteredTagNames = [...new Set(tagNamesArray)]

  return (
    <div className={styles.tags}>
      <h2 className={styles.heading}>Tags</h2>
      {filteredTagNames?.length === 0 ? (
        <p>🔴 No tags to show yet.</p>
      ) : (
        <ul className={styles.list}>
          {filteredTagNames?.map((tagName) => (
            <Link
              className={styles.linkTag}
              key={tagName}
              to={`/home/tags/${tagName}`}>
              <li className={styles.tab}>{tagName}</li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Tags
