/**
 * Created by yzh on 2016/9/4.
 */
var fs = require('fs');
var DocxGen = require("docxtemplater");
var ImageModule=require('docxtemplater-image-module');

//模版文件
var content = fs.readFileSync("template/" + "report.docx", "binary");

var opts = {}
opts.centered = false;
var tagValue="../images/" + "image001.png";
opts.getImage=function(tagValue) {
    return fs.readFileSync(tagValue,'binary');
}
opts.getSize=function() {
    return [300,300];
}

var imageModule=new ImageModule(opts);

var data = {
    projectName:projectName,
    jianZhuLeiXing:jianZhuLeiXing,
    qiHouFenQu:qiHouFenQu,
    sheng:sheng,
    shi:shi,
    qu:qu,
    jianChengNianDai:jianChengNianDai,
    zongJianZhuMianJi:zongJianZhuMianJi,
    jianZhuMianJi:jianZhuMianJi,
    up:up,
    down:down,
    zongNengHao:zongNengHao,
    caiNuanNengHao:caiNuanNengHao,
    kongTiaoNengHao:kongTiaoNengHao,
    zhaoMingNengHao:zhaoMingNengHao,
    aveWinterTemperature:aveWinterTemperature,
    dwmjcnnh:dwmjcnnh,
    pj1:pj1,
    aveSummerTemperature:aveSummerTemperature,
    dwmjktnh:dwmjktnh,
    pj2:pj2,
    aveLightData:aveLightData,
    dwmjzmhn:dwmjzmhn,
    pj3:pj3,
    aveMyd:aveMyd,
    qtdwmjhn:qtdwmjhn,
    pj4:pj4,
    pj5:pj5,
    dwmjznh:dwmjznh,
    pj6:pj6
};
//外观
data.image0 = "./images/" + "image001.png";
data.image1 = "./images/" + "image002.png";
//多个位置信息处理
data.image2 = "./images/" + "image003.png";
data.image3 = "./images/" + "image004.png";
//5个图表
data.image12 = "./images/" + "image012.png";
data.image13 = "./images/" + "image013.png";
data.image14 = "./images/" + "image014.png";
data.image15 = "./images/" + "image015.png";
data.image16 = "./images/" + "image016.png";

var docx=new DocxGen().attachModule(imageModule).load(content).setData(data);

docx.render();

var buffer= docx.getZip().generate({type:"nodebuffer"});

fs.writeFile("template/test.docx",buffer);
