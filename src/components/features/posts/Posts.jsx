/* -------------------- Styles -------------------- */
import styles from './Posts.module.css'
/* -------------------- Icons/Images -------------------- */
import readMoreIcon from '../../../assets/icons/icon-chevron-right.svg'
import typewriterImg from '../../../assets/images/typewriter.jpg'
/* -------------------- Hooks -------------------- */
import { useFetchData } from '../../../hooks/useFetchData.js'
/* -------------------- Components -------------------- */
import { Link, useParams } from 'react-router'
import ErrorMessage from '../../core/error/ErrorMessage.jsx'
/* -------------------- Functions -------------------- */
import parse from 'html-react-parser'

/* Show previews of posts */
const Posts = () => {
  const { categoryId } = useParams()

  // Update api endpoint based on category id
  const apiEndpoint = categoryId
    ? `http://localhost:8080/api/v1/posts/categories/${categoryId}`
    : 'http://localhost:8080/api/v1/posts/'

    // Get  posts
  const { data, isLoading, error } = useFetchData(apiEndpoint)
  // console.log("🚀 ~ Posts ~ data:", data)


  // Show loading spinner while fetching the data
  if (isLoading)
    return (
      <div className={styles.posts}>
        <h2 className={styles.heading}>Posts</h2>
        <div className={styles.loader}></div>
      </div>
    )

  // Show error message upon failure to fetch the data
  if (error)
    return (
      <div className={styles.posts}>
        <h2 className={styles.heading}>Posts</h2>
        <ErrorMessage error={error} />
      </div>
    )
  return (
    <div className={styles.posts}>
      <h2 className={styles.heading}>Posts</h2>
      {data?.posts.length === 0 ? (
        <p>🔴 No posts to show yet.</p>
      ) : (
        <ul className={styles.list}>
          {data?.posts.map((post) => (
            <li className={styles.card} key={post.id}>
              <div className={styles.imgContainer}>
                <img
                  className={styles.typewriterImg}
                  src={typewriterImg}
                  alt=""
                  height={200}
                />
              </div>
              <div className={styles.post}>
                <h3>{post.title}</h3>
                {/* Use <div> here because first element in 'post.content' is <p> and a <p> element can not be a descendant of another <p> */}
                <div className={styles.content}>{parse(post.content)}</div>
                {/* Link to view full post  */}
                <Link
                  className={styles.readMoreLink}
                  to={`/home/posts/${post.id}`}>
                  Read more
                  <img src={readMoreIcon} alt="" width={18} height={18} />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Posts
