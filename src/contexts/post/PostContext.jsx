import { createContext } from 'react'

export const PostContext = createContext({
  postId: null,
  isSubmitted: false,
  setIsSubmitted: () => {},
})
