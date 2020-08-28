import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import { startSetFeed } from '../actions/feed'
import FunFactComponent from './FunFactComponent'
import { startUpvote, startDownvote } from '../actions/feed'

const FeedComponent =  ({user,feed,setFeedError,startSetFeed,startDownvote,startUpvote})=>{
    const [stateFeed,setStateFeed]=useState('')
    const [error,setError]=useState('')
    useEffect(()=>{
        if(!stateFeed){
            startSetFeed()
        }
        
    },[])
    useEffect(()=>{
        console.log('voting')
    },[startDownvote,startUpvote])
    useEffect(()=>{
        console.log('setting feed',feed)
        setStateFeed(feed[0])
    },[feed,startSetFeed])

    useEffect(()=>{
        setError(setFeedError)
    },[setFeedError])
    return (
        <div> 
            <p>Logged in!</p>
            <Link to="/publier">Publier</Link>
            <Link to={"/profil/"+user._id}>{user.firstName} {user.lastName}</Link>
            {stateFeed && (
                <div>
                    <FunFactComponent {...stateFeed} />
                    <button onClick={()=>{
                        startUpvote(stateFeed._id)
                        console.log(stateFeed)
                    }}>Upvote</button>
                    <button onClick={()=>{
                        startDownvote(stateFeed._id)
                        
                    }}>Downvote</button>
                </div>
                )}

        </div>
    
        )
}

const mapStateToProps = (state)=>({
    user:state.user,
    feed : state.feed.feed,
    setFeedError: state.feed.setFeedError
})

const mapDispatchToProps = (dispatch)=>({
    startSetFeed : ()=>dispatch(startSetFeed()),
    startUpvote : (id)=>dispatch(startUpvote(id)),
    startDownvote : (id)=>dispatch(startDownvote(id))
})

export default connect(mapStateToProps,mapDispatchToProps)(FeedComponent)