import express from 'express';
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import bodyParser from 'body-parser';
import errorhandler from 'errorhandler';
import compression from 'compression';
// import validator from 'express-validator'; // 입력값에 대한 유효성 검사
import path from 'path';

/* 
  입력 값에 대한 유효성 검사는 앱의 보안을 위해 중요한 부분이다. 반드시 서버 측에서 데이터를 검증해야 한다.
*/

// import mysql from 'mysql';

// let dbconfig = require(__dirname+'/../server/config/db-config.json');
// let connection = mysql.createConnection(dbconfig);

const app = express();
const port = 3000;
const devPort = 3001;

app.use(compression());

// app.use(validator());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, '../public')));

if(process.env.NODE_ENV === 'development') {
  app.use(errorhandler())
  console.log('Server is running on development mode');

  const config = require('../webpack.config.dev');
  let compiler = webpack(config);
  let devServer = new WebpackDevServer(compiler, config.devServer);
  devServer.listen(devPort, () => {
      console.log('webpack-dev-server is listening on port', devPort);
  });
}

/* 
  validator 예시를 위해 추가했다.
  실제 작동하지는 않음
*/
// app.post('/message',(req,res,next)=> {
//   req.checkBody('messagee','Invalid message in body').notEmpty(); // 요청내용이 있는지 확인
//   req.checkBody('name','Invalid name in body').notEmpty(); // 요청내용이 있는지 확인
//   let errors = req.validationErrors();
//   if(errors) return next(errors)
//   req.statusMessage.insert(req.body, (err, result) => {
//     if(err) return next(err)
//     return res.json(result.ops[0])
//   })
// })


const server = app.listen(port, () => {
  console.log('Express listening on port', port);
});


