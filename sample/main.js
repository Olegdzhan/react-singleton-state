import React         from 'react';
import ReactDOM      from 'react-dom';
import injectTapping from 'react-tap-event-plugin';

import App from './src/App';

injectTapping();

ReactDOM.render(
    <App />,
    document.getElementById('App')
);