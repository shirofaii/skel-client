import { createStore, applyMiddleware, compose } from 'redux';
import {rootReducer} from './reducers';
import createSocketIoMiddleware from 'redux-socket.io';
import * as io from 'socket.io-client';

export function createMainStore() {
    const devTool =
        typeof window === 'object' &&
        window['__REDUX_DEVTOOLS_EXTENSION__'] ?
            window['__REDUX_DEVTOOLS_EXTENSION__']() : f => f;
    
    const socket = io('http://localhost');
    const socketIoMiddleware = createSocketIoMiddleware(socket, 'server/');
    
    const enchancer = compose(
        applyMiddleware(socketIoMiddleware),
        devTool
    )
    
    const store = createStore(rootReducer, enchancer);
    
    return store
}
