import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import  { persistor, store } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <ToastContainer />
    <Provider store={store}>
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>

    <App />
    </PersistGate> 
    </Provider>
  </React.StrictMode>

);


