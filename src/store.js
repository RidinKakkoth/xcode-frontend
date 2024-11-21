// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';  // This uses localStorage by default
import authReducer from './features/authSlice';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,  // This stores the state in localStorage
};

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedReducer,  // Use the persisted reducer for auth
  },
});

// Create persistor to be used with PersistGate
const persistor = persistStore(store);

export { store, persistor };
