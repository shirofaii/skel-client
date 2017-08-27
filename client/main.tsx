import * as React from 'react'
import {render} from 'react-dom'
import {createMainStore} from './store'
import {Provider} from 'react-redux'
import {Root} from '../comp/Root'
import * as antd from 'antd'

const store = createMainStore()

// tslint:disable-next-line:no-string-literal
const locale = antd['locales']['en_US']
render(
    <Provider store={store}>
        <antd.LocaleProvider locale={locale}>
            <Root />
        </antd.LocaleProvider>
    </Provider>
, document.getElementById('root'))
