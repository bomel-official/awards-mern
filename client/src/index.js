import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './static/styles/base.min.css'
import './static/styles/header-footer.min.css'
import './static/styles/index.min.css'
import './static/styles/login.min.css'
import './static/styles/my-account.min.css'
import './static/styles/single.min.css'
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
