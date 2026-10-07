/* -------------------- Styles -------------------- */
import styles from './Comments.module.css'
/* -------------------- Icons -------------------- */
import profileIcon from '../../../assets/icons/icon-profile-2.svg'
import expandIcon from '../../../assets/icons/icon-expand.svg'
/* -------------------- Hooks -------------------- */
import { useState } from 'react'
/* -------------------- Components -------------------- */
import Button from '../../core/button/Button'
import EditCommentForm from '../../forms/comment/edit-comment-form/EditCommentForm'

/* Show list of comments */
const Comments = ({ comments, author }) => {
  // console.log('🚀 ~ Comments ~ comments:', comments)

  // State variables
  const [isActive, setIsActive] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [commentId, setCommentId] = useState(null)

  // Function to toggle Edit and Delete buttons
  const handleBtnClick = (id) => {
    setIsActive(!isActive)
    setCommentId(id)
  }
  const handleEditComment = () => {
    setIsEdit(true)
    setIsActive(false)
  }
  const handleDeleteComment = () => {}

  return (
    <>
      <div className={styles.comments}>
        {comments?.length === 0 ? (
          <p>Be the first one to add a comment.</p>
        ) : (
          <ul className={styles.list}>
            {comments?.map((comment) => (
              // Comment
              <li className={styles.card} key={comment.id}>
                <div className={styles.imgContainer}>
                  <img
                    className={styles.profileIcon}
                    src={profileIcon}
                    alt=""
                    width={30}
                    height={30}
                  />
                </div>
                <div className={styles.commentContainer}>
                  <div className={styles.nameContainer}>
                    <p>
                      <strong>{author.name}</strong>
                    </p>
                    {/* // TODO: Show this div only if author id matches user id  */}
                    <div className={styles.commentOptions}>
                      {/* Button to toggle Edit and Delete buttons  */}
                      <Button
                        onClick={() => handleBtnClick(comment.id)}
                        className="btnToggle"
                        title="Buttons"
                        ariaLabel="Comment options">
                        <img src={expandIcon} alt="" width={20} height={20} />
                      </Button>

                      {/* Dropdown buttons */}
                      {/* Show buttons only for the matching comment  */}
                      <ul
                        className={
                          isActive && comment.id === commentId
                            ? styles.open
                            : styles.dropdownList
                        }>
                        <li className={styles.dropdownItem}>
                          {/* Edit button  */}
                          <Button
                            className="btnEdit"
                            title="Edit comment"
                            onClick={() => handleEditComment(comment.id)}>
                            Edit
                          </Button>
                        </li>
                        <li className={styles.dropdownItem}>
                          {/* Delete button  */}
                          <Button
                            className="btnDelete"
                            title="Delete comment"
                            onClick={() => handleDeleteComment(comment.id)}>
                            Delete
                          </Button>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {isEdit && comment.id === commentId ? (
                    <EditCommentForm />
                  ) : (
                    <p className={styles.content}>{comment.content}</p>
                  )}
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

// /* -------------------- Styles -------------------- */
// import styles from './Comments.module.css'
// /* -------------------- Icons -------------------- */
// import profileIcon from '../../../assets/icons/icon-profile-2.svg'
// import expandIcon from '../../../assets/icons/icon-expand.svg'
// /* -------------------- Hooks -------------------- */
// import { useState } from 'react'
// /* -------------------- Components -------------------- */
// import Button from '../../core/button/Button'

// /* Show list of comments */
// const Comments = ({ comments, author }) => {
//   // console.log('🚀 ~ Comments ~ comments:', comments)

//   // State variables
//   const [isActive, setIsActive] = useState(false)
//   const [commentId, setCommentId] = useState(null)

//   // Function to toggle Edit and Delete buttons
//   const handleBtnClick = (id) => {
//     setIsActive(!isActive)
//     setCommentId(id)
//   }
//   const handleEditComment = () => {}
//   const handleDeleteComment = () => {}

//   return (
//     <>
//       <div className={styles.comments}>
//         {comments?.length === 0 ? (
//           <p>Be the first one to add a comment.</p>
//         ) : (
//           <ul className={styles.list}>
//             {comments?.map((comment) => (
//               // Comment
//               <li className={styles.card} key={comment.id}>
//                 <div className={styles.imgContainer}>
//                   <img
//                     className={styles.profileIcon}
//                     src={profileIcon}
//                     alt=""
//                     width={30}
//                     height={30}
//                   />
//                 </div>
//                 <div className={styles.commentContainer}>
//                   <div className={styles.nameContainer}>
//                     <p>
//                       <strong>{author.name}</strong>
//                     </p>
//                     <div className={styles.commentOptions}>
//                       {/* Button to toggle Edit and Delete buttons  */}
//                       <Button
//                         onClick={() => handleBtnClick(comment.id)}
//                         className="btnToggle"
//                         title="Buttons"
//                         ariaLabel="Comment options">
//                         <img src={expandIcon} alt="" width={20} height={20} />
//                       </Button>

//                       {/* Dropdown buttons */}
//                       {/* Show buttons only for the matching comment  */}
//                       <ul
//                         className={
//                           isActive && comment.id === commentId
//                             ? styles.open
//                             : styles.dropdownList
//                         }>
//                         <li className={styles.dropdownItem}>
//                           {/* Edit button  */}
//                           <Button
//                             className="btnEdit"
//                             title="Edit comment"
//                             onClick={() => handleEditComment(comment.id)}>
//                             Edit
//                           </Button>
//                         </li>
//                         <li className={styles.dropdownItem}>
//                           {/* Delete button  */}
//                           <Button
//                             className="btnDelete"
//                             title="Delete comment"
//                             onClick={() => handleDeleteComment(comment.id)}>
//                             Delete
//                           </Button>
//                         </li>
//                       </ul>
//                     </div>
//                   </div>
//                   <p className={styles.content}>{comment.content}</p>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </>
//   )
// }

// export default Comments
