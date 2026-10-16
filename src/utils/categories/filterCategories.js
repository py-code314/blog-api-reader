/* Function to filter categories by category name */
export function getUniqueByValue(arr, prop) {
  // Create set
  const seen = new Set()

  return arr.filter(obj => {
    const value = obj[prop]

    // Skip object if the name value is already in it
    const isDuplicate = seen.has(value)
    if (isDuplicate) return false

    seen.add(value)
    return true
  })
  
}