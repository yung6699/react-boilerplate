import { add, multiply } from 'utils/utility';
import test from 'static/img/test.jpg';
import 'static/test.css';

let x = 1;
let y = 1;

console.log(test);
let str = `<h2>${multiply(x, y)} , ${add(x,y)}</h2>`;
str += `<img src=${test}>zzzzzzzzz`;
// str += `<h1>d11111111dd</h1/>`;

document.getElementById("app").innerHTML = str;

if (module.hot) {
    module.hot.accept();
}
  