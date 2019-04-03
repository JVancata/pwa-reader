import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './redux/rootReducer';

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

const initialState = {};

const persistConfig = {
    key: 'root',
    storage
}
const middleware = [thunk];

var _store;
if (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) {
    _store = createStore(
        persistReducer(persistConfig, rootReducer),
        initialState,
        compose(
            applyMiddleware(...middleware),
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    );
}
else {
    _store = createStore(
        persistReducer(persistConfig, rootReducer),
        initialState,        
        applyMiddleware(...middleware)
    );
}
let store = _store;
let persistor = persistStore(store)
export { store, persistor };