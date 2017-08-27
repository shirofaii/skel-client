import { createStore, applyMiddleware, compose, Store } from 'redux'
import {rootReducer} from './reducers'
import createSocketIoMiddleware from './redux-socket.io'
import * as io from 'socket.io-client'

export function createMainStore() {
    // tslint:disable-next-line:no-string-literal
    const devTool = window['__REDUX_DEVTOOLS_EXTENSION__'] ? window['__REDUX_DEVTOOLS_EXTENSION__']() : compose

    const socket = io('http://localhost:1213')
    const socketIoMiddleware = createSocketIoMiddleware(socket, 'server:')

    const enchancer = compose(
        applyMiddleware(socketIoMiddleware),
        devTool,
    )

    const store = createStore(rootReducer, enchancer)

    return store
}
