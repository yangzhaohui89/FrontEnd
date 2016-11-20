const {ipcRenderer} = require('electron');
//批量转换测点位置图片
function fileToDataURL(file,num,prefixName){
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(e) {
        var imgeData = e.target.result;//图片数据
        var imgName= prefixName+(num+1);
        console.log(prefixName+":"+imgName);
        window.localStorage.setItem(imgName,imgeData);
        // 创建对象
        var img = new Image();
        img.src = imgeData;
        img.onload = function(){
            var imgRatioName = prefixName+"Ratio"+(num+1);
            // 打印
            window.localStorage.setItem(imgRatioName,img.width/img.height);
        };
    };
}
//多位置图清空
function fileToClear(num,prefixName){
    var imgName= prefixName+(num+1);
    window.localStorage.removeItem(imgName);
}
//单选取值方法
function get_radio_value( radioName ) {
    var radios = document.getElementsByName( radioName );
    for( var i = 0; i < radios.length; i++ ) {
        if( radios[i].checked || radios.length === 1 ) {
            return radios[i].value;
        }
    }
}
$(document).ready(function() {
    //建筑外观
    $("#uploadJzwg").fileinput({
        language: 'zh',
        uploadUrl: '#123', // you must set a valid URL here else you will get an error
        showUpload : true,
        dropZoneEnabled:false,
        overwriteInitial: false,
        showAjaxErrorDetails:true,
        removeFromPreviewOnError:false,//出错以后缩略图删不删除
        showUploadedThumbs:false,
        previewFileType:'image',
        allowedPreviewTypes:['image'],
        allowedFileExtensions: ['jpg', 'gif', 'png'],//接收的文件后缀
        allowedFileTypes:['image'],//允许上传的类型
        showPreview : true,
        fileActionSettings:{
            indicatorNew: '',
            indicatorError: ''
        },
        layoutTemplates:{
            actionUpload: '',
            preview: '<div class="file-preview {class}">\n' +
            '    {close}\n' +
            '    <div class="close fileinput-remove">×</div>\n' +
            '    <div class="{dropClass}">\n' +
            '    <div class="file-preview-thumbnails">\n' +
            '    </div>\n' +
            '    <div class="clearfix"></div>' +
            '    <div class="file-preview-status text-center text-success"></div>\n' +
            '    </div>\n' +
            '</div>'
        }
    });
    //建筑外观图片上传
    $('#uploadJzwg').on('filebatchpreupload', function(event, data) {
        console.log('建筑外观图片上传');
        var clearNum = parseInt(window.localStorage.getItem("jzwgNum"));
        if(clearNum>0){
            for(i=0;i<clearNum;i++){
                fileToClear(i,'jzwg');
            }
        }
        var files = data.files;
        //将测点图的数量记录下来
        window.localStorage.setItem("jzwgNum",files.length);
        for(i=0;i<files.length;i++){
            var file = files[i];
            fileToDataURL(file,i,'jzwg');
        }
    });
     $("#uploadDxpm").fileinput({
         language: 'zh',
         uploadUrl: '#', // you must set a valid URL here else you will get an error
         showUpload : true,
         dropZoneEnabled:false,
         overwriteInitial: false,
         showAjaxErrorDetails:true,
         removeFromPreviewOnError:false,//出错以后缩略图删不删除
         showUploadedThumbs:false,
         previewFileType:'image',
         allowedPreviewTypes:['image'],
         allowedFileExtensions: ['jpg', 'gif', 'png'],//接收的文件后缀
         allowedFileTypes:['image'],//允许上传的类型
         showPreview : true,
         fileActionSettings:{
             indicatorNew: '',
             indicatorError: ''
         },
         layoutTemplates:{
             actionUpload: '',
             preview: '<div class="file-preview {class}">\n' +
             '    {close}\n' +
             '    <div class="close fileinput-remove">×</div>\n' +
             '    <div class="{dropClass}">\n' +
             '    <div class="file-preview-thumbnails">\n' +
             '    </div>\n' +
             '    <div class="clearfix"></div>' +
             '    <div class="file-preview-status text-center text-success"></div>\n' +
             '    </div>\n' +
             '</div>'
         }
    });
    //典型平面图片上传
    $('#uploadDxpm').on('filebatchpreupload', function(event, data, previewId, index) {
        console.log('典型平面图片上传');
        var clearNum = parseInt(window.localStorage.getItem("dxpmNum"));
        if(clearNum>0){
            for(i=0;i<clearNum;i++){
                fileToClear(i,'dxpm');
            }
        }
        var files = data.files;
        //将测点图的数量记录下来
        window.localStorage.setItem("dxpmNum",files.length);
        for(i=0;i<files.length;i++){
            var file = files[i];
            fileToDataURL(file,i,'dxpm');
        }
    });
    $("#uploadWsdcd").fileinput({
        language: 'zh',
        uploadUrl: '#', // you must set a valid URL here else you will get an error
        showUpload : true,
        dropZoneEnabled:false,
        overwriteInitial: false,
        showAjaxErrorDetails:true,
        removeFromPreviewOnError:false,//出错以后缩略图删不删除
        showUploadedThumbs:false,
        previewFileType:'image',
        allowedPreviewTypes:['image'],
        allowedFileExtensions: ['jpg', 'gif', 'png'],//接收的文件后缀
        allowedFileTypes:['image'],//允许上传的类型
        showPreview : true,
        fileActionSettings:{
            indicatorNew: '',
            indicatorError: ''
        },
        layoutTemplates:{
            actionUpload: '',
            preview: '<div class="file-preview {class}">\n' +
            '    {close}\n' +
            '    <div class="close fileinput-remove">×</div>\n' +
            '    <div class="{dropClass}">\n' +
            '    <div class="file-preview-thumbnails">\n' +
            '    </div>\n' +
            '    <div class="clearfix"></div>' +
            '    <div class="file-preview-status text-center text-success"></div>\n' +
            '    </div>\n' +
            '</div>'
        }
    });
    //位置信息图片上传
    $('#uploadWsdcd').on('filebatchpreupload', function(event, data) {
        console.log('位置信息图片上传');
        var clearNum = parseInt(window.localStorage.getItem("cdtNum"));
        if(clearNum>0){
            for(i=0;i<clearNum;i++){
                fileToClear(i,'cdt');
            }
        }
        var files = data.files;
        //将测点图的数量记录下来
        window.localStorage.setItem("cdtNum",files.length);
        for(i=0;i<files.length;i++){
            var file = files[i];
            fileToDataURL(file,i,'cdt');
        }
    });
    //温湿度Excel
    $("#wsd1").fileinput({
        language: 'zh',
        uploadUrl: '#', // you must set a valid URL here else you will get an error
        showUpload : true,
        dropZoneEnabled:false,
        //overwriteInitial: false,
        showAjaxErrorDetails:true,
        removeFromPreviewOnError:false,//出错以后缩略图删不删除
        showUploadedThumbs:false,
        allowedFileExtensions: ['xls', 'xlsx'],//接收的文件后缀
        showPreview : true,
        fileActionSettings:{
            indicatorNew: '',
            indicatorError: ''
        },
        layoutTemplates:{
            actionUpload: '',
            preview: '<div class="file-preview {class}">\n' +
            '    {close}\n' +
            '    <div class="close fileinput-remove">×</div>\n' +
            '    <div class="{dropClass}">\n' +
            '    <div class="file-preview-thumbnails">\n' +
            '    </div>\n' +
            '    <div class="clearfix"></div>' +
            '    <div class="file-preview-status text-center text-success"></div>\n' +
            '    </div>\n' +
            '</div>'
        }
    });

    //温湿度Excel
    $('#wsd1').on('filebatchpreupload', function(event, data) {
        //传输数据到main
        var wsdWinterDto={};
        //室内温度/采暖能耗(Q/L)h评价
        console.log("室内温度/采暖能耗(Q/L)h评价");
        var wdcnStart=$("#wdcnStart").val();
        window.localStorage.setItem("wdcnStart",wdcnStart);
        var wdcnEnd=$("#wdcnEnd").val();
        window.localStorage.setItem("wdcnEnd",wdcnEnd);
        var files = data.files;
        var tmpSum=[];
        for(var i=0;i<files.length;i++) {
            var f = files[i];
            var reader = new FileReader();
            reader.readAsBinaryString(f);
            reader.onload = function (e) {
                var data = e.target.result;
                //封装成对象传送
                wsdWinterDto.wdcnStart = wdcnStart;
                wsdWinterDto.wdcnEnd = wdcnEnd;
                wsdWinterDto.data = data;
                ipcRenderer.send('wsdWinter-message', wsdWinterDto);
            }
        }
        //采暖温度数据
        ipcRenderer.on('wsdWinter-reply', (event, arg) => {
            console.log('aveWinterTemperature:'+arg);
            tmpSum.push(parseFloat(arg));
            if(tmpSum.length==files.length){
                var aveWinterTemperature = tmpSum.reduce(function(pv, cv) { return pv + parseFloat(cv); }, 0)/tmpSum.length;
                window.localStorage.setItem("aveWinterTemperature",_.round(aveWinterTemperature,1));
            }
        });
    });

    $("#wsd2").fileinput({
        language: 'zh',
        uploadUrl: '#', // you must set a valid URL here else you will get an error
        showUpload : true,
        dropZoneEnabled:false,
        //overwriteInitial: false,
        showAjaxErrorDetails:true,
        removeFromPreviewOnError:false,//出错以后缩略图删不删除
        showUploadedThumbs:false,
        allowedFileExtensions: ['xls', 'xlsx'],//接收的文件后缀
        showPreview : true,
        fileActionSettings:{
            indicatorNew: '',
            indicatorError: ''
        },
        layoutTemplates:{
            actionUpload: '',
            preview: '<div class="file-preview {class}">\n' +
            '    {close}\n' +
            '    <div class="close fileinput-remove">×</div>\n' +
            '    <div class="{dropClass}">\n' +
            '    <div class="file-preview-thumbnails">\n' +
            '    </div>\n' +
            '    <div class="clearfix"></div>' +
            '    <div class="file-preview-status text-center text-success"></div>\n' +
            '    </div>\n' +
            '</div>'
        }
    });
    //温湿度Excel
    $('#wsd2').on('filebatchpreupload', function(event, data) {
        //传输数据到main
        var wsdSummerDto={};
        //室内温度/空调能耗(Q/L)h评价
        console.log("室内温度/空调能耗(Q/L)h评价");
        var wdktStart=$("#wdktStart").val();
        window.localStorage.setItem("wdktStart",wdktStart);
        var wdktEnd=$("#wdktEnd").val();
        window.localStorage.setItem("wdktEnd",wdktEnd);
        var files = data.files;
        var tmpSum=[];
        for(var i=0;i<files.length;i++) {
            var f = files[i];
            var reader = new FileReader();
            reader.readAsBinaryString(f);
            reader.onload = function (e) {
                var data = e.target.result;
                //封装成对象传送
                wsdSummerDto.wdktStart = wdktStart;
                wsdSummerDto.wdktEnd = wdktEnd;
                wsdSummerDto.data = data;
                ipcRenderer.send('wsdSummer-message', wsdSummerDto);
            }
        }
        //空调能耗数据
        ipcRenderer.on('wsdSummer-reply', (event, arg) => {
            console.log('aveSummerTemperature:'+arg);
            tmpSum.push(parseFloat(arg));
            if(tmpSum.length==files.length){
                var aveSummerTemperature = tmpSum.reduce(function(pv, cv) { return pv + parseFloat(cv); }, 0)/tmpSum.length;
                window.localStorage.setItem("aveSummerTemperature",_.round(aveSummerTemperature,1));

            }
        });
    });
    $("#zdsj").fileinput({
        language: 'zh',
        uploadUrl: '#', // you must set a valid URL here else you will get an error
        showUpload : true,
        dropZoneEnabled:false,
        //overwriteInitial: false,
        showAjaxErrorDetails:true,
        removeFromPreviewOnError:false,//出错以后缩略图删不删除
        showUploadedThumbs:false,
        allowedFileExtensions: ['xls', 'xlsx'],//接收的文件后缀
        showPreview : true,
        fileActionSettings:{
            indicatorNew: '',
            indicatorError: ''
        },
        layoutTemplates:{
            actionUpload: '',
            preview: '<div class="file-preview {class}">\n' +
            '    {close}\n' +
            '    <div class="close fileinput-remove">×</div>\n' +
            '    <div class="{dropClass}">\n' +
            '    <div class="file-preview-thumbnails">\n' +
            '    </div>\n' +
            '    <div class="clearfix"></div>' +
            '    <div class="file-preview-status text-center text-success"></div>\n' +
            '    </div>\n' +
            '</div>'
        }
    });
    //照度Excel
    $('#zdsj').on('filebatchpreupload', function(event, data) {
        //室内照度/照明能耗(Q/L)i评价
        var zdDto={};
        console.log("/室内照度/照明能耗(Q/L)i评价");

        var zdzmStart=$("#zdzmStart").val();
        window.localStorage.setItem("zdzmStart",zdzmStart);

        var zdzmEnd=$("#zdzmEnd").val();
        window.localStorage.setItem("zdzmEnd",zdzmEnd);

        //工作日或者全周
        var workdayOrWeek =get_radio_value("workdayOrWeek");
        window.localStorage.setItem("workdayOrWeek",workdayOrWeek);

        var timeStart=$("#timeStart").val();
        window.localStorage.setItem("timeStart",timeStart);

        var timeEnd=$("#timeEnd").val();
        window.localStorage.setItem("timeEnd",timeEnd);

        var files = data.files;
        var tmpSum=[];
        for(var i=0;i<files.length;i++) {
            var f = files[i];
            var reader = new FileReader();
            reader.readAsBinaryString(f);
            reader.onload = function (e) {
                var data = e.target.result;
                zdDto.zdzmStart = zdzmStart;
                zdDto.zdzmEnd = zdzmEnd;
                zdDto.workdayOrWeek = workdayOrWeek;
                zdDto.timeStart = timeStart;
                zdDto.timeEnd = timeEnd;
                zdDto.data = data;
                ipcRenderer.send('aveLight-message', zdDto);
            }
        }
        //光照数据
        ipcRenderer.on('aveLightData-reply', (event, arg) => {
            console.log('aveLightData:'+arg);
            tmpSum.push(parseFloat(arg));
            if(tmpSum.length==files.length){
                var aveLightData = tmpSum.reduce(function(pv, cv) { return pv + parseFloat(cv); }, 0)/tmpSum.length;
                window.localStorage.setItem("aveLightData",_.round(aveLightData,1));
            }
        });
    });
    $("#mydsj").fileinput({
        language: 'zh',
        uploadUrl: '#', // you must set a valid URL here else you will get an error
        showUpload : true,
        dropZoneEnabled:false,
        //overwriteInitial: false,
        showAjaxErrorDetails:true,
        removeFromPreviewOnError:false,//出错以后缩略图删不删除
        showUploadedThumbs:false,
        allowedFileExtensions: ['xls', 'xlsx'],//接收的文件后缀
        showPreview : true,
        fileActionSettings:{
            indicatorNew: '',
            indicatorError: ''
        },
        layoutTemplates:{
            actionUpload: '',
            preview: '<div class="file-preview {class}">\n' +
            '    {close}\n' +
            '    <div class="close fileinput-remove">×</div>\n' +
            '    <div class="{dropClass}">\n' +
            '    <div class="file-preview-thumbnails">\n' +
            '    </div>\n' +
            '    <div class="clearfix"></div>' +
            '    <div class="file-preview-status text-center text-success"></div>\n' +
            '    </div>\n' +
            '</div>'
        }
    });
    //满意度Excel
    $('#mydsj').on('filebatchpreupload', function(event, data) {
        var files = data.files;
        var tmpSum=[];
        for(var i=0;i<files.length;i++) {
            var f = files[i];
            var reader = new FileReader();
            reader.readAsBinaryString(f);
            reader.onload = function (e) {
                var data = e.target.result;
                ipcRenderer.send('aveMyd-message', data);
            }
        }
        //满意度
        ipcRenderer.on('aveMyd-reply', (event, arg) => {
            console.log('aveMyd:'+arg);
            tmpSum.push(parseFloat(arg));
            if(tmpSum.length==files.length){
                var aveMyd = tmpSum.reduce(function(pv, cv) { return pv + parseFloat(cv); }, 0)/tmpSum.length;
                window.localStorage.setItem("aveMyd",_.round(aveMyd,1));
            }
        });
    });

});