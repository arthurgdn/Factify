
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = process.env.DEV_URL

export const setPopularFeed = (feed)=>({
    type:'SET_POPULAR_FEED',
    feed
})

export const startSetPopularFeed = ()=>{
    return async (dispatch)=>{
        try{
            const res = await axios.get('/feed/popular')
            dispatch(setPopularFeed(res.data))
        }catch(e){
            dispatch({
                type:'SET_POPULAR_FEED_ERROR'
            })
        }
    }
}

export const startUpvote = (id)=>{
    return async (dispatch)=>{
        try{
            const res = await axios.post('/posts/'+id+'/upvote')
            dispatch({
                type:'POPULAR_VOTE',
                feed : res.data
            })
        }catch(e){
            console.log(e)
            dispatch({
                type:'POPULAR_VOTE_ERROR',
            })
        }
    }
}

export const startDownvote = (id)=>{
    return async (dispatch)=>{
        try{
            const res = await axios.post('/posts/'+id+'/downvote')
            dispatch({type:'POPULAR_VOTE',feed:res.data})
        }catch(e){
            console.log(e)
            dispatch({
                type:'POPULAR_VOTE_ERROR'
            })
        }
    }
}