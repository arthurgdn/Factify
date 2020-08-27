
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.patch['Content-Type'] = 'application/json'
axios.defaults.baseURL = process.env.DEV_URL

export const login = (token)=>({
    type: 'LOGIN',
    token
})
export const loadUser = (user)=>({
    type: 'SET_USER',
    user
})
export const register = (token)=>({
  type : 'REGISTER',
  token
})
export const startRegister = (registration_form)=>{
  return async (dispatch)=>{
    try{
      
        const res = await axios.post('/users',JSON.stringify(registration_form))
        
        localStorage.setItem('factify_token',res.data.token)
        dispatch(register(res.data.token))
        dispatch(loadUser(res.data.user));
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token;
        
    }catch(e){
      
      dispatch({
        type: 'REGISTER_ERROR'
      })
    }
  }
}
export const startLogin = (email,password)=>{
    return async (dispatch)=>{
        
        console.log('logging in')
          const body = JSON.stringify({ email, password });
        
          try {
              //We try to login the user
            const res = await axios.post('/users/login', body);
            localStorage.setItem('factify_token',res.data.token)
            dispatch(login(res.data.token));
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token;
            //We then set the user's data
            
            const user = await axios.get('/users/me')
            dispatch(loadUser(user.data));
            
          } catch (e) {
            console.log(e.response.data)
            dispatch({
              type: 'AUTH_ERROR'
            });
          }
    }
}

export const startLoadUser =()=>{
    return async (dispatch)=>{
        try {
            
            const res = await axios.get('/users/me')
            
            dispatch({
              type: 'USER_LOADED'
            })
            dispatch(loadUser(res.data))
          } catch (e) {
            console.log(e)
            dispatch({
              type: 'SET_USER_ERROR'
            });
          }
    }
}
export const logout = ()=>({
    type:'LOGOUT'
})
export const startLogout = ()=>{
    return async (dispatch)=>{
        try{
            
            await axios.post('/users/logout')
            localStorage.removeItem('factify_token')
            dispatch(logout())
            dispatch({
                type : 'CLEAR_USER'
            })
            
        }catch(e){
            dispatch({
              type: 'LOGOUT_ERROR'
            });
          }
}
}
