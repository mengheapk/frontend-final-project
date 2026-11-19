import { useEffect } from 'react'

export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | Event Planning Portal` : 'Event Planning Portal'
  }, [title])
}