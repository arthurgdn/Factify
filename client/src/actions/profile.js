
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.patch['Content-Type'] = 'application/json'
axios.defaults.baseURL = process.env.DEV_URL

export const setProfile = (profile)=>({
    type:'SET_PROFILE',
    profile
})

export const startSetProfile = (id)=>{
    return async (dispatch)=>{ 
        try{
            console.log('calling',id)
            const res = await axios.get('/user/'+id)
            console.log('setting',res.data)
            dispatch(setProfile(res.data))
        }catch(e){
            console.log('error',e)
            dispatch({
                type:'SET_PROFILE_ERROR'
            })
        }
    }
}