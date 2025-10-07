import { useEffect, useState } from 'react'
import { ref, onValue, set, remove, onDisconnect } from 'firebase/database'
import { db } from '../firebase'

export const useViewerCount = (productId, userId) => {
  const [viewerCount, setViewerCount] = useState(0)

  useEffect(() => {
    // Don't run if no productId or userId
    if (!productId || !userId) {
      setViewerCount(0)
      return
    }

    const viewerRef = ref(db, `products/${productId}/viewers/${userId}`)
    const countRef = ref(db, `products/${productId}/viewers`)

    // Mark user as viewing
    set(viewerRef, {
      timestamp: Date.now()
    })

    // Remove user on disconnect
    onDisconnect(viewerRef).remove()

    // Listen to viewer count changes
    const unsubscribe = onValue(countRef, (snapshot) => {
      const viewers = snapshot.val()
      setViewerCount(viewers ? Object.keys(viewers).length : 0)
    })

    // Cleanup on unmount
    return () => {
      unsubscribe()
      remove(viewerRef)
    }
  }, [productId, userId])

  return viewerCount
}
