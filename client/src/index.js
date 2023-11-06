import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore } from 'redux';
import { applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import './index.css';
import App from './App';
import reducers from './reducers';

// Create the Material-UI theme
const theme = createTheme({
  // Define your theme options here
});

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
