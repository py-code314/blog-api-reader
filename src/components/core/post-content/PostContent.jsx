/* -------------------- Styles -------------------- */
import styles from './PostContent.module.css'
/* -------------------- Functions -------------------- */
import parse from 'html-react-parser'

// Component for previewing post content
const PostContent = ({ content }) => {
  const parsedContent = parse(content)

  let elements = []
  // Filter out new line characters from the array
  if (Array.isArray(parsedContent)) {
    elements = parsedContent.filter(
      (item) => typeof item !== 'string' || item.trim() !== '',
    )
  }

  // 'parsedContent' is an object if there's only one HTML element in it
  // This contains usually either 'h2' or 'para'
  const firstElement = Array.isArray(parsedContent)
    ? elements[0]
    : parsedContent
  const firstElementType = firstElement.type
  const firstElementText = firstElement.props.children

  // Get the text in the second element
  let secondElementText = Array.isArray(parsedContent)
    ? elements[1].props.children
    : ''

  return (
    <div>
      {/* Limit paras to 3 lines with some CSS help */}
      {firstElementType === 'h2' ? (
        <h4 className={styles.subHeading}>{firstElementText}</h4>
      ) : (
        <p className={styles.para}>{firstElementText}</p>
      )}

      {/* Show para only if first element is 'h2'  */}
      {firstElementType === 'h2' && (
        <p className={styles.para}>{secondElementText}</p>
      )}
    </div>
  )
}

export default PostContent
