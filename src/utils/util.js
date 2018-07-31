
const xurlform = function(params) {
    return Object.keys(params) .map(key=>encodeURIComponent(key)+'='+encodeURIComponent(params[key])) .join('&');
};

const stopEventPropagate = function(event){  //阻止默认时间
    event = event || window.event;  //用于IE  
    if(event.preventDefault) event.preventDefault();  //标准技术  
    if(event.returnValue) event.returnValue = false;  //IE  
    return false;
}

const url2params = function(urlstr){
    var u = decodeURIComponent(urlstr);
    var args = {};
    var item = null;
    urlstr.split("&").map(itm => {
        item = itm.split('=');
        args[item[0]?item[0]:''] = item[1] ? decodeURIComponent(item[1] ): "";
    });
    delete args[''];
    return args;
};

const isfalse = function(param) { //判断某个对象里面是否为空（数组，对象里面的值{应该将函数排除在外}）
    let r = ['',undefined,null,false].indexOf(param)>=0;
    if (r === false ) {
        if(param.length === 0){  
            // if (typeof param=='function'){ 
            //     r = false;
            // }
            // else if  ( param.length === 0 ){
            r = true;
        } else if (param.construtor){
            r = Object.keys(param).length === 0  ;
        } else if (typeof param == 'object'){
            r = Object.keys(param).length === 0  ;
        }
    }
    return r;
};


const currentTime = (YHMS)=>{ //获取当前时间 以2018-04-02 的形式输出
    
    /**
     * |参数|说明|是否必须
     * |YHMS|Y:输出时间为年月日
     *       YH:输出时间为年月日时
     *       YHS:输出时间为年月日时分秒  | 不是必须
     * 默认输出时间为年月日
     */ 
    var date = new Date();
    var  Y = date.getFullYear() + '-';
    var  M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var  D = date.getDate()<10?'0'+date.getDate():date.getDate() + ' ';

    if(YHMS=='Y'){
        
        return Y+M+ D 
    }if(YHMS=='YH'){
        var h =   date.getHours() <10 ? '0'+ date.getHours(): date.getHours();
        return Y + M + D +' '+ h +':00'
    }if(YHMS=='YHM'){
        var h =   date.getHours() <10 ? '0'+ date.getHours() + ':' : date.getHours()+':';
        var m =   date.getMinutes() <10 ? '0'+ date.getMinutes()  : date.getMinutes();
        
        return Y + M + D +'T'+ h + m 
    }if(YHMS=='YHMS'){
        var h =   date.getDate() <10 ? '0'+ date.getDate() + ':' : date.getHours()+':';
        var m =   date.getMinutes() <10 ? '0'+ date.getMinutes() + ':' : date.getMinutes() + ':';
        var s =   date.getSeconds() <10 ? '0'+ date.getSeconds()  : date.getSeconds();
        return Y + M + D +'T'+ h + m + s
    }if(YHMS=='YHM2'){
        var h =   (date.getHours()+2) <10 ? '0'+ (date.getHours()+2) + ':' : (date.getHours()+2)+':';
        var m =   date.getMinutes() <10 ? '0'+ date.getMinutes()  : date.getMinutes();
        
        return Y + M + D +'T'+ h + m 
    }

 return  Y+M+D;
}
const requestApi = (URL, success) => { //get请求方法
    fetch(URL, {
        method: 'GET',
        Accept: "*/*",
        mode: 'cors',
        credentials: 'include'
    })
        .then(res => res.json())
        .then(
            (data) => {
                success(data)
            },
            (error) => {
                console.log(error)
            }
        );
}
const  timestampToTime = (timestamp, HMS)=> {  //时间戳转换为时间格式  
    /** 参数格式说明
     * |参数名称|参数类型|参数说明|是否必须
     * |timestamp|string或者number|时间戳或者时间格式|是
     * |HMS|string|返回的时间格式{
     *                              underfind:返回 年-月-日
     *                              HMS:返回 年-月-日  时:分:秒
     *                              HM:返回 年-月-日  时:分
     *                              H: 返回 年-月-日  时
     *                          }   |否
     */
    if(typeof timestamp == 'string'){ //兼容ios

        timestamp = timestamp.replace(/\-/g, "/");         
    }
    
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var  Y = date.getFullYear() + '-';
    var  M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var  D = date.getDate()<10?'0'+date.getDate():date.getDate() + ' ';
    if(HMS=='HMS'){ //返回年月日,时分秒
        var h =   date.getHours() <10 ? '0'+ date.getHours()+":": date.getHours()+":";
        var m =   date.getMinutes() <10 ? '0'+ date.getMinutes() + ':' : date.getMinutes() + ':';
        var s =   date.getSeconds() <10 ? '0'+ date.getSeconds()  : date.getSeconds();
        return Y + M + D +' '+ h + m + s
    }
    if(HMS == 'HM'){ //返回年月日,时分
        var h =   date.getHours() <10 ? '0'+ date.getHours()+":": date.getHours()+":";
        var m =   date.getMinutes() <10 ? '0'+ date.getMinutes()  : date.getMinutes() ;
        return Y + M + D + ' ' + h + m;
    }
    if(HMS=='H'){ //返回年月日,时
        var h =   date.getHours() <10 ? '0'+ date.getHours(): date.getHours();
        return Y + M + D +' '+ h +':00'
    }
    
    return Y + M + D    //只返回年月日
}

const timeToTimestamp = (data)=>{ //时间转换为时间戳
    // let Data = new Date()
    return  Date.parse(data);
};
const filesType=(url)=>{
    let imgSrc = 'https://resources.gzy360.com/resource/wechat-resource/images/temp/word.png';
    if((url).indexOf("doc")>-1||(url).indexOf("docx")>-1){
        imgSrc = 'https://resources.gzy360.com/resource/wechat-resource/images/temp/word.png';
    }
    if((url).indexOf("pdf")>-1||(url).indexOf("PDF")>-1){
        imgSrc = 'https://resources.gzy360.com/resource/wechat-resource/images/temp/pdf.png';
    }
    if((url).indexOf("xls")>-1||(url).indexOf("xlsx")>-1){
        imgSrc = 'https://resources.gzy360.com/resource/wechat-resource/images/temp/XSL.png';
    }
    if((url).indexOf("png")>-1||(url).indexOf("jpg")>-1){
        imgSrc = url
    }
    return imgSrc;
   /* switch(url){
        case url.indexOf():
            imgUrl = ''
            break;
        case 1:
            imgUrl = ''
            break;
        case 2:
            imgUrl = ''
            break;
    }*/
};
module.exports = {
    xurlform,
    url2params,
    filesType,
    isfalse,
    stopEventPropagate,
    currentTime,
    timestampToTime,
    requestApi,
    timeToTimestamp
}
