import React from 'react';
import ReactDOM from 'react-dom';
import Root from "./Root";

ReactDOM.render(<Root />, document.getElementById('root'));


if (process.env.NODE_ENV === 'development') {
    if (module.hot){
      module.hot.accept();
    } 
}