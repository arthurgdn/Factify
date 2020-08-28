import React from 'react'
import { Link } from 'react-router-dom'

export default ({author,title,content,score,_id,startDownvote,startUpvote})=>{
    return (
        <div>
            <Link to={"/profil/"+author._id}><h3>{author.firstName} {author.lastName}</h3></Link>
            <h1>{title}</h1>
            <p>{content}</p>
            <p>Score : {score}</p>
            
        </div>
    )
}


