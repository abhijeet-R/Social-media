import './feed.css'
import Share from "../share/Share"
import Post from '../post/Post'
import axios from "axios"
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function Feed({username}) {

const [posts,setPosts] = useState([])
const {user} = useSelector((state)=>state.user)

useEffect(()=>{
  const fetchPost = async()=>{
    const res = username ? await axios.get(`/post/profile/${username}`) : await axios.get(`/post/timeline/${user._id}`) 
    setPosts(res.data.sort((p1, p2) => {
      return new Date(p2.createdAt) - new Date(p1.createdAt);
    }))
  }
  fetchPost()
},[user._id,username])

  return (
    <div className="feed">
      <div className="feedWrapper">
        {!username && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  )
}

export default Feed