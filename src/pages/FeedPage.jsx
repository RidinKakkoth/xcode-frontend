import React from 'react'
import Feed from '../components/Post/Feed'

const FeedPage = ({profile}) => {
  
    console.log(profile,"1");
    

    return (
    <div>
        
      <Feed profile={profile}/>
    </div>
  )
}

export default FeedPage
