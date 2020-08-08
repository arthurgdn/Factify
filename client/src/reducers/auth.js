export default (state={authenticated:false},action)=>{
    switch(action.type) {
        case 'LOGIN':
            return {authenticated:true}
        default : 
            return state
    }
}