/* -------------------- Styles -------------------- */
import styles from './RecentPosts.module.css'
/* -------------------- Icons -------------------- */
import readMoreIcon from '../../../assets/icons/icon-chevron-right.svg'
// import errorIcon from '../../../assets/icons/icon-error.svg'
/* -------------------- Hooks -------------------- */
import { useFetchData } from '../../../hooks/useFetchData.js'
/* -------------------- Components -------------------- */
import { Link } from 'react-router'
import ErrorMessage from '../../core/error/ErrorMessage.jsx'
/* -------------------- Functions -------------------- */
import parse from 'html-react-parser'

/* Show previews of recent posts */
const RecentPosts = () => {
  // Get recent posts data
  const { data, isLoading, error } = useFetchData(
    'http://localhost:8080/api/v1/posts/feed/latest',
  )

  // Show loading spinner while fetching the data
  if (isLoading)
    return (
      <section className={styles.recentPosts}>
        <h2 className={styles.heading}>Recent Posts</h2>
        <div className={styles.loader}></div>
      </section>
    )

  // Show error message upon failure to fetch the data
  if (error)
    return (
      <div className={styles.recentPosts}>
        <h2 className={styles.heading}>Recent Posts</h2>
        <ErrorMessage error={error} />
      </div>
    )

  return (
    <>
      <section className={styles.recentPosts}>
        <h2 className={styles.heading}>Recent Posts</h2>
        {data?.posts.length === 0 ? (
          <p>🔴 No posts to show yet.</p>
        ) : (
          <ul className={styles.list}>
            {data?.posts.map((post) => (
              <li className={styles.card} key={post.id}>
                <div className={styles.imgContainer}></div>
                <div className={styles.post}>
                  <h3>{post.title}</h3>
                  {/* Use <div> here because first element in 'post.content' is <p> and a <p> element can not be a descendant of another <p> */}
                  <div className={styles.content}>{parse(post.content)}</div>
                  {/* Link to view full post  */}
                  <Link
                    className={styles.readMoreLink}
                    to={`/posts/${post.id}`}>
                    Read more
                    <img src={readMoreIcon} alt="" width={18} height={18} />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  )
}

export default RecentPosts
