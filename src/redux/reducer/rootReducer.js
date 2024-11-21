import { combineReducers } from 'redux';
import memberReducer from './memberReducer';

const rootReducer = combineReducers({
    member: memberReducer,
});

export default rootReducer;