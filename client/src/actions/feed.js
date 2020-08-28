
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = process.env.DEV_URL

export const setFeed = (feed)=>({
    type:'SET_FEED',
    feed
})

export const startSetFeed = ()=>{
    return async (dispatch)=>{
        try{
            const res = await axios.get('/feed/main')
            dispatch(setFeed(res.data))
        }catch(e){
            dispatch({
                type:'SET_FEED_ERROR'
            })
        }
    }
}

export const startUpvote = (id)=>{
    return async (dispatch)=>{
        try{
            const res = await axios.post('/posts/'+id+'/upvote')
            dispatch({
                type:'VOTE'
            })
        }catch(e){
            dispatch({
                type:'VOTE_ERROR'
            })
        }
    }
}

export const startDownvote = (id)=>{
    return async (dispatch)=>{
        try{
            const res = await axios.post('/posts/'+id+'/downvote')
            dispatch({type:'VOTE'})
        }catch(e){
            dispatch({
                type:'VOTE_ERROR'
            })
        }
    }
}