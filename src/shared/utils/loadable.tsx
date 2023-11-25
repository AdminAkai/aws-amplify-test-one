import React, { lazy, Suspense } from 'react'

const loadable = (
  importFunc: () => Promise<{ default: React.ComponentType<object> }>,
  { fallback = null } = { fallback: null }
): ((props: object) => React.ReactElement) => {
  const LazyComponent = lazy(importFunc)

  return (props: object) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  )
}

export default loadable
