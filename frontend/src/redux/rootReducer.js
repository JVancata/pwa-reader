import { combineReducers } from 'redux';
import reader from './modules/reader';

const rootReducer = combineReducers({
    reader: reader
});

export default rootReducer;