import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import {RiNumbersFill} from 'react-icons/ri'
import {BiUpvote,BiDownvote} from 'react-icons/bi'

export default ({_id,createdAt,author,title,content,score,startDownvote,startUpvote})=>{
    return (
        <div className="fun-fact__display">
            <div className="fun-fact__header">
            <div className="fun-fact__header-bottom">
                <h3>{title}</h3>
                <div>
                    <RiNumbersFill/>
                    <h3> {score}</h3>
                
                </div>
            
            </div>
            <div className="fun-fact__header-bottom">
                <Link to={'/profil/'+author._id} className="fun-fact__subheader">
                    <img className="fun-fact__picture" src={process.env.DEV_URL+"/users/"+author._id+"/avatar"}/>
                    <p>{author.firstName} {author.lastName}</p>
                </Link>
                <span>{moment(createdAt).lang('fr').fromNow()}</span>
            </div>
            
            
        </div>
        
        <p className="fun-fact__content" dangerouslySetInnerHTML={{ __html:content }}></p>
        
        <div className="fun-fact__center-container">
            <div className="fun-fact__vote-section">
                <button className="fun-fact__vote-button fun-fact__vote-button-left" onClick={()=>startUpvote(_id)}><BiUpvote/> Voter +</button>
                <button className="fun-fact__vote-button fun-fact__vote-button-right" onClick={()=>startDownvote(_id)}><BiDownvote/> Voter -</button>
            </div>
        </div>
    
            
        </div>
    )
}


