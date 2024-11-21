import React from 'react'
import Feed from '../components/Post/Feed'

const FeedPage = ({Profile}) => {
  return (
    <div>
      <Feed Profile={Profile}/>
    </div>
  )
}

export default FeedPage
