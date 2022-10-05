import React from 'react';
import ReactDOM from 'react-dom/client';

import {Provider} from 'react-redux'
import './index.css';
import App from './App';
import store from './Redux/Store/store';

import ChatProvider from "./context/ChatContext";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<Provider store={store}>
    <ChatProvider>
    <App />
    </ChatProvider>
</Provider>
    );
