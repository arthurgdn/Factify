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
        setStateFeed(feed[0])
    },[feed,startSetFeed])

    useEffect(()=>{
        setError(setFeedError)
    },[setFeedError])
    return (
        <div className="content-container"> 
            <h3 className="form__title">Fil général</h3>
            {stateFeed ? (
                <div className="form__container">
                    <FunFactComponent {...stateFeed} startDownvote={startDownvote} startUpvote={startUpvote} />
                    
                </div>
                ):(<p>Pas de nouveau fun fact à afficher pour le moment. Vous pouvez consulter les tendances du moment ou alors publier vous même !</p>)}

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