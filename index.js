import React from 'react'
import  { createRoot }  from 'react-dom/client';
import App from './src/App.js'
import { Provider } from 'react-redux';
import store from './src/store.js';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <App />
    </Provider>,
);