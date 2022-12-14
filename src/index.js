import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from '@/store/index';
import {Provider} from 'react-redux';

import {createTheme} from '@mui/material/styles';
import {ThemeProvider, CssBaseline} from "@mui/material";

const theme = createTheme({
    typography: {
        button: {
            textTransform: 'none',  // disable auto upper case
        },
    },
    palette: {
        primary: {
            main: '#A084CA',
        },
        secondary: {
            main: '#645CAA',
        },
    },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <App/>
        </ThemeProvider>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
