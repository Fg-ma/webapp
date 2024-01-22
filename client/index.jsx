import React from 'react'
import  { createRoot }  from 'react-dom/client';
import App from './src/App'
import { Provider } from 'react-redux';
import store from './src/redux/store.js';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <App />
    </Provider>,
);