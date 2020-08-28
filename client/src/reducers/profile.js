const profileReducerDefaultState = {
    _id:'',
    firstName:'',
    lastName:'',
    profilePicture:'',
    setProfileError:'',
    
}
const profileReducer = (state=profileReducerDefaultState,action)=>{
    
    switch(action.type){
        case 'SET_PROFILE':
            return {...action.profile,setProfileError:''}
        case 'SET_PROFILE_ERROR':
            return {...state,setProfileError:'Erreur lors du chargement du profil'}
        
        default: 
            return state
    }
}
export default profileReducer