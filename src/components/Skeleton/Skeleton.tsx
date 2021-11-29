import React from 'react'
import './Skeleton.css'

type Props = React.HTMLAttributes<HTMLDivElement>

const Skeleton = (props: Props) => {
  return (
    <div {...props} className="Skeleton">
      <span className="Skeleton-shine" />
    </div>
  )
}

export default Skeleton
