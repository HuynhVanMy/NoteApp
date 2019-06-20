import { combineReducers } from 'redux';
import notes from './notes';
import pagin from './pagin';

const myReducer = combineReducers({
    notes,
    pagin
});

export default myReducer;