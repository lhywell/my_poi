var express = require('express')
var xlsx = require('node-xlsx');
var ejs = require('ejs')
var path = require('path')
var fs = require('fs')
var app = express()


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

var obj = xlsx.parse(__dirname + '/data.xlsx'); //配置excel文件的路径
var excelObj = obj[0].data; //excelObj是excel文件里第一个sheet文档的数据，obj[i].data表示excel文件第i+1个sheet文档的全部内容
// console.log(excelObj);

var array = [];
for (var i = 1; i < excelObj.length; i++) {
    array.push({
        'tdid': excelObj[i][0],
        'record_time': excelObj[i][1],
        'day': excelObj[i][2],
        'hour': excelObj[i][3],
        'minute': excelObj[i][4],
        'lat': excelObj[i][5],
        'lng': excelObj[i][6],
        'source': excelObj[i][7]
    })
}
// console.log(array)
app.get('/gps', function (req, res) {
    //对外数据接口
    res.json(array);
})
app.get('/', function (req, res) {
    res.render('index', {})
})
app.listen(3000)