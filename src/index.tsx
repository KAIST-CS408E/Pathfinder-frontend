import * as React from 'react';
import * as ReactDOM from 'react-dom';

import jss from 'jss';
import preset from 'jss-preset-default';

import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

jss.setup(preset());

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
registerServiceWorker();
