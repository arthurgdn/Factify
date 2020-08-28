const feedReducerDefaultState = {
    feed : [],
    setFeedError:'',
    voteError:'',
    
}
const feedReducer = (state=feedReducerDefaultState,action)=>{
    
    switch(action.type){
        case 'SET_FEED':
            return {...state,feed:action.feed,setFeedError:''}
        case 'SET_FEED_ERROR':
            return {...state,setFeedError:'Impossible de charger les fun facts'}
        case 'VOTE_ERROR':
            return {...state,voteError:'Erreur serveur lors du vote'}
        case 'VOTE':
            return {...state,feed:state.feed.splice(1),voteError:''}
        
        default: 
            return state
    }
}
export default feedReducer