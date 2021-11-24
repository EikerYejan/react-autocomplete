import React from 'react'
import './Skeleton.css'

const Skeleton = (props) => {
  return (
    <div {...props} className="Skeleton">
      <span className="Skeleton-shine" />
    </div>
  )
}

export default Skeleton
