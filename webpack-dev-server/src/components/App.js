import React from 'react';
import classNames from 'classnames';
import styles from './App.css'
import img from 'static/img/test.jpg'

var cx = classNames.bind(styles);

const App = () => {
    const helloWorld = 'React HMR 적용하는거 어렵네';
    console.log(helloWorld);
    return ( 
        <div className={cx('test')}>
            <h1>{helloWorld}</h1>
            <h1>테스트</h1>
            <img src={img}/>
        </div>
     );
}
 
export default App;