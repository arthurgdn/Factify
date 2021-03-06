import {createStore,combineReducers,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'
import authReducer from '../reducers/auth'
import userReducer from '../reducers/user'
import profileReducer from '../reducers/profile'
import feedReducer from '../reducers/feed'
import popularFeedReducer from '../reducers/popularFeed.js'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export default ()=>{
    const store = createStore(combineReducers({
        
        auth: authReducer,
        user: userReducer,
        profile: profileReducer,
        feed : feedReducer,
        popularFeed : popularFeedReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
     )
    return store
}
