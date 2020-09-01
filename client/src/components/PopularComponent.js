import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'
import {startSetPopularFeed, startUpvote, startDownvote} from '../actions/popularFeed'

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
        <div>
            {statePopularFeed && (
                <div>
                    {statePopularFeed.map(({_id,title,content,hasVoted,score})=>(
                        <div key={_id} id={_id}>
                            <h3>{title}</h3>
                            <p>{content}</p>
                            <p>Score : {score}</p>
                            {hasVoted ? (<p>Vous avez déjà voté</p>):(
                                <div>
                                    <button onClick={()=>startUpvote(_id)}>Upvote</button>
                                    <button onClick={()=>startDownvote(_id)}>Downvote</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                )}
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