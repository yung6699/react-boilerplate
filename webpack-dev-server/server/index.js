import express from 'express';
import bodyParser from 'body-parser'; // Post 요청을 사용하기 위해 설정
import compression from 'compression'; // 페이지 압축해서 보내는 모듈
import path from 'path';
// import webpackDevServer from 'webpack-dev-server';
// import webpack from 'webpack';

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(compression()) // 페이지 전송 시 압축해서 보낸다.
app.use(bodyParser.json()); // request body의 수신된 JSON 데이터 페이로드를 파싱한다.
app.use(bodyParser.urlencoded({
    extended: false
})); // request body에 대한 url encoding을 확장 가능하게 한다.
app.use('/', express.static(path.join(__dirname, '../public')));


/* 
    에러 처리 미들웨어
*/
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

const server = app.listen(app.get('port'), () => {
    console.log('Express listening on port', app.get('port'), );
});