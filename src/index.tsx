import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import AppWithRedux from "./app/AppWithRedux";
import {store} from "./app/store";
import {BrowserRouter} from "react-router-dom";

const rerenderEntireTree = () => {
   ReactDOM.render(
      <Provider store={store}>
         <BrowserRouter>
            <AppWithRedux/>
         </BrowserRouter>
      </Provider>, document.getElementById('root')
   );
}

rerenderEntireTree()
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

if(process.env.NODE_ENV === 'development' && module.hot) {
   module.hot.accept('./app/AppWithRedux', () => {
      rerenderEntireTree()
   })
}

