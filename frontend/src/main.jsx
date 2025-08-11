import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Don't forget your CSS file
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

// Create your Redux store
const store = configureStore({
  reducer: {
    // Add your reducers here
    // Example:
    // counter: counterReducer
  }
});

// Create root element
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement);

// Render the app
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);