import * as React from 'react';
import {render} from 'react-dom';
import {createMainStore} from './store';
import {Provider} from 'react-redux';
import {Root} from '../comp/Root';

const store = createMainStore();

render(
<Provider store={store}>
    <Root />
</Provider>
, document.getElementById('root'));