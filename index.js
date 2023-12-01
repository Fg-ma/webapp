import React from 'react'
import  { createRoot }  from 'react-dom/client';
import App from './src/App.js'

const container = document.getElementsByTagName('body');
const root = createRoot(container[0]);
root.render(<App/>);