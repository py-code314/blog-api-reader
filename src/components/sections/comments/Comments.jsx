/* -------------------- Styles -------------------- */
import styles from './Comments.module.css'
/* -------------------- Icons -------------------- */
// import profileIcon from '../../../assets/icons/icon-profile-1.svg'
import profileIcon from '../../../assets/icons/icon-profile-2.svg'

/* Show list of comments */
const Comments = ({ comments, author }) => {
  // console.log('🚀 ~ Comments ~ comments:', comments)

  return (
    <>
      <div className={styles.comments}>
        {comments?.length === 0 ? (
          <p>Be the first one to add a comment.</p>
        ) : (
          <ul className={styles.list}>
            {comments?.map((comment) => (
              <li className={styles.card} key={comment.id}>
                <div className={styles.userContainer}>
                  <img
                    className={styles.profileIcon}
                    src={profileIcon}
                    alt=""
                    width={25}
                    height={25}
                  />
                  <p>{author.name}</p>
                </div>
                <div className={styles.comment}>
                  <p className={styles.content}>{comment.content}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

export default Comments
