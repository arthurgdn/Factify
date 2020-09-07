import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'

import {startSetPopularFeed, startUpvote, startDownvote} from '../actions/popularFeed'
import PostsList from './PostsList'

const PopularComponent = ({startSetPopularFeed,popularFeed,setPopularFeedError,startUpvote,startDownvote})=>{
    const [statePopularFeed,setStatePopularFeed]=useState('')
    const [error,setError]=useState('')
    useEffect(()=>{
        if(!statePopularFeed){
            startSetPopularFeed()
        }
        
    },[]) 
     
    useEffect(()=>{
        setStatePopularFeed(popularFeed)
    },[popularFeed,startSetPopularFeed])

    useEffect(()=>{
        setError(setPopularFeedError)
    },[setPopularFeedError])
    return (
        <div className="content-container">
            <h3 className="form__title">Tendances</h3>
            {statePopularFeed && (<PostsList postsList={statePopularFeed} startUpvote={startUpvote} startDownvote={startDownvote}/>)}
        </div>
                
    )

    
}

const mapStateToProps = (state)=>({
    popularFeed: state.popularFeed.feed,
    setPopularFeedError: state.popularFeed.setPopularFeedError
})

const mapDispatchToProps = (dispatch)=>({
    startSetPopularFeed : ()=>dispatch(startSetPopularFeed()),
    startUpvote : (id)=>dispatch(startUpvote(id)),
    startDownvote : (id)=>dispatch(startDownvote(id))
})

export default connect(mapStateToProps,mapDispatchToProps)(PopularComponent)