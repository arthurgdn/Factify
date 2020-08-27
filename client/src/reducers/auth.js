const authReducerDefaultState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading : true,
    loginError : '',
    logoutError:'',
    registerError:''
}

export default (state = authReducerDefaultState,action)=>{
    switch(action.type){
        case 'USER_LOADED':
            return {
                ...state,
                isAuthenticated : true,
                loading : false,
                loginError : ''
            }
        case 'REGISTER':
            return {
                isAuthenticated : true,
                token : action.token,
                loading : false,
                registerError : '',
                loginError:''
            }
        case 'LOGIN':
            return {
                isAuthenticated : true,
                token : action.token,
                loading : false,
                loginError : ''
            }
        case 'LOGOUT':
            return {
                isAuthenticated : null,
                token : null,
                loading : false,
                logoutError : ''
            }
        case 'AUTH_ERROR':
            return {...state,loginError:'Identifiants incorrects'}
        case 'REGISTER_ERROR':
            return {...state,registerError:"Impossible de s'inscrire"}
        case 'LOGOUT_ERROR':
            return {...state,logoutError:'Erreur lors de la déconnexion'}
        default: return state
    }
}