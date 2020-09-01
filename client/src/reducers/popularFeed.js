const popularFeedReducerDefaultState = {
    feed : [],
    setPopularFeedError:'',
    voteError:'',
    
}
const popularFeedReducer = (state=popularFeedReducerDefaultState,action)=>{
    
    switch(action.type){
        case 'SET_POPULAR_FEED':
            return {...state,feed:action.feed,setFeedError:''}
        case 'SET_POPULAR_FEED_ERROR':
            return {...state,setFeedError:'Impossible de charger les fun facts'}
        case 'POPULAR_VOTE_ERROR':
            return {...state,voteError:'Erreur serveur lors du vote'}
        case 'POPULAR_VOTE':
            return {...state,feed:action.feed,voteError:''}
        
        default: 
            return state
    }
}
export default popularFeedReducer