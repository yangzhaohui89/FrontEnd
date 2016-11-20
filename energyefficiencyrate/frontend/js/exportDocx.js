/**
 * Created by yzh on 2016/9/4.
 */
var fs = require('fs');
var Docxtemplater = require('docxtemplater');
//图片模块
//Load the docx file as a binary
var content = fs.readFileSync("template/" + "report.docx", "binary");

var doc = new Docxtemplater(content);
//var doc= new DocxGen(content);

//set the templateVariables

doc.setData({
    "jianZhuLeiXing":"Hipp",
    "qiHouFenQu":"Edgar",
    "sheng":"0652455478",
    "shi":"0652455478",
    "qu":"0652455478",
    "jianChengNianDai":"New Website"
});
doc.render();
var buf = doc.getZip().generate({type:"nodebuffer"});
fs.writeFileSync("template/"+"/output1.docx",buf);



/*var opts = {}
opts.centered = false;
opts.getImage=function(tagValue, tagName) {
    return fs.readFileSync(tagValue,'binary');
}
//给图片设置大小
opts.getSize=function(img,tagValue, tagName) {
    return [150,150];
}

var imageModule=new ImageModule(opts);

var docx=new DocxGen().attachModule(imageModule).load(content).setData({image:'examples/image.png'}).render()

var buffer= docx.getZip().generate({type:"nodebuffer"})

fs.writeFile("test.docx",buffer);*/


