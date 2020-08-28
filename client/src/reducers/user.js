const userReducerDefaultState = {
    firstName:'',
    lastName:'',
    email:'',
    profilePicture:'',
    setUserError:'',
    
}
const userReducer = (state=userReducerDefaultState,action)=>{
    
    switch(action.type){
        case 'SET_USER':
            return {...action.user,setUserError:''}
        case 'SET_USER_ERROR':
            return {...state,setUserError:'Erreur lors du chargement de votre compte'}
        
        default: 
            return state
    }
}
export default userReducer