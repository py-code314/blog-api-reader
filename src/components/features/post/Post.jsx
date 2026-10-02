/* -------------------- Styles -------------------- */
import styles from './Post.module.css'
/* -------------------- Icons -------------------- */
import backIcon from '../../../assets/icons/icon-back.svg'
import tagsIcon from '../../../assets/icons/icon-tags-2.svg'
/* -------------------- Hooks -------------------- */
import { useNavigate } from 'react-router'
import { useFetchData } from '../../../hooks/useFetchData.js'
/* -------------------- Components -------------------- */
import { useParams, Link } from 'react-router'
import ErrorMessage from '../../core/error/ErrorMessage.jsx'
import Button from '../../core/button/Button.jsx'
/* -------------------- Functions -------------------- */
import parse from 'html-react-parser'

/* Show post details */
const Post = () => {
  const { postId } = useParams()
  const navigate = useNavigate()

  // Get a single post data
  const { data, isLoading, error } = useFetchData(
    `http://localhost:8080/api/v1/posts/${postId}`,
  )

  // Show loading spinner while fetching the data
  if (isLoading)
    return (
      <div className={styles.post}>
        <h2 className={styles.heading}>Post</h2>
        <div className={styles.loader}></div>
      </div>
    )

  // Show error message upon failure to fetch the data
  if (error)
    return (
      <div className={styles.post}>
        <h2 className={styles.heading}>Post</h2>
        <ErrorMessage error={error} />
      </div>
    )

  // Go back one page when Back btn is clicked
  const handleBackClick = () => {
    navigate(-1)
  }

  // Destructure data
  // Add default values to prevent null errors
  const { post = {} } = data || {}
  const {
    author = {},
    categories = [],
    title = '',
    content = '',
    createdAt = '',
    updatedAt = '',
    tags = [],
  } = post

  // Computed variables
  // Format date created
  const dateCreated = new Date(createdAt).toLocaleString()
  const dateCreatedArr = dateCreated.split(',')
  const formattedDateCreated = dateCreatedArr[0]

  // Format date updated
  const dateUpdated = new Date(updatedAt).toLocaleString()
  const dateUpdatedArr = dateUpdated.split(',')
  const formattedDateUpdated = dateUpdatedArr[0]

  // Categories & tags
  const postCategories = categories.map((category) => category.name)
  let postTags = tags.map((tag) => tag.name)
  postTags = postTags.join(', ')

  return (
    <>
      <div className={styles.post}>
        <title>Textura | Post</title>
        <div className={styles.categoriesContainer}>
          {/* Back button  */}
          <Button className="btnBack" title="Go back" onClick={handleBackClick}>
            <img
              className={styles.backIcon}
              src={backIcon}
              alt=""
              width={22}
              height={22}
            />
            Back
          </Button>
          {/* Categories  */}
          <div className={styles.categoriesWrapper}>
            {postCategories.length > 0 &&
              postCategories.map((category) => (
                <span className={styles.category}>{category} </span>
              ))}
          </div>
        </div>

        <div className={styles.postWrapper}>
          <h2 className={styles.heading}>{title}</h2>
          {/* Post details  */}
          <div className={styles.details}>
            <p>
              by <strong>{author.name}</strong>
            </p>
            <div className={styles.dates}>
              <p>
                Published on: <strong>{formattedDateCreated}</strong>
              </p>
              <p>
                Updated on: <strong>{formattedDateUpdated}</strong>
              </p>
            </div>
            <div className={styles.tagsContainer}>
              <img src={tagsIcon} alt="" width={18} height={18} />
              {postTags}
            </div>
          </div>
          <div className={styles.content}>{parse(content)}</div>
        </div>
        <div className={styles.loginWrapper}>
          <p>
            Please{' '}
            {/* Login link  */}
            <Link className={styles.linkLogin} to={'/login'}>
              login
            </Link>{' '}
            to comment.
          </p>
        </div>
      </div>
    </>
  )
}

export default Post
