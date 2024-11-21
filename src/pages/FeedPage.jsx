import React from 'react'
import Feed from '../components/Post/Feed'

const FeedPage = ({profile}) => {
  return (
    <div>
      <Feed profile={profile}/>
    </div>
  )
}

export default FeedPage
