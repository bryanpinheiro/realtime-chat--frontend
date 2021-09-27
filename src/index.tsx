import React from 'react';
import ReactDOM from 'react-dom';

import { Provider} from  'react-redux';
import store from './infrastructure/state-management/store';

import Routing from './pages/Routing';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Routing />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);