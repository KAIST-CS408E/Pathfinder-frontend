import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import jss from 'jss';
import preset from 'jss-preset-default';

import store, { history } from '@src/redux/store';

import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

jss.setup(preset());

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
        <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
