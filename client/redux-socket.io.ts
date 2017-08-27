/* tslint:disable */
/*
* Allows you to register actions that when dispatched, send the action to the
* server via a socket.io socket.
* `criteria` may be a function (type, action) that returns true if you wish to send the
*  action to the server, array of action types, or a string prefix.
*/
export default function createSocketIoMiddleware(socket, criteria:(Function|Array<Function>|string)) {
  const emitBound = socket.emit.bind(socket);
  return ({ dispatch }) => {
    // Wire socket.io to dispatch actions sent by the server.
    socket.on('action', dispatch);
    return next => (action) => {
      if (evaluate(action, criteria)) {
        return defaultExecute(action, emitBound, next, dispatch);
      }
      return next(action);
    };
  };

  function evaluate(action, option) {
    if (!action || !action.type) {
      return false;
    }

    const { type } = action;
    let matched = false;
    if (typeof option === 'function') {
      // Test function
      matched = option(type, action);
    } else if (typeof option === 'string') {
      // String prefix
      matched = type.indexOf(option) === 0;
    } else if (Array.isArray(option)) {
      // Array of types
      matched = option.some(item => type.indexOf(item) === 0);
    }
    return matched;
  }

  function defaultExecute(action, emit, next, dispatch) { // eslint-disable-line no-unused-vars
    emit('action', action);
    return next(action);
  }
}
