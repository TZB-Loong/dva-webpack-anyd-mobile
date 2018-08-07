

const xurlform = function(params) { //路由转码
    return Object.keys(params) .map(key=>encodeURIComponent(key)+'='+encodeURIComponent(params[key])) .join('&');
};

const stopEventPropagate = function(event){  //阻止默认时间
    event = event || window.event;  //用于IE
    if(event.preventDefault) event.preventDefault();  //标准技术
    if(event.returnValue) event.returnValue = false;  //IE
    return false;
}

const url2params = function(urlstr){ //从路由上来获取数据(数据转换为数组)
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
/**
 * @param {string} param 空字符串 返回 true
 * @param {number} param 为0时 返回 true
 * @param {function} param 为function 返回 true
 * @param {boolean} param 为falses时 返回 true
 * @param {staring} param 为underfined 返回 true  
 */
    let r = ['',undefined,null,false].indexOf(param)>=0;
    if (r === false ) {
        if(param.length === 0){
            if (typeof param=='function'){
                r = false;
            }
                r = true;
        } else if (param.construtor){
            r = Object.keys(param).length === 0  ;
        } else if (typeof param == 'object'){
            r = Object.keys(param).length === 0  ;
        }
    }
    return r;
};

const getSearch = (url,key)=>{
    let val = null;
    let lastIndexQ=url.lastIndexOf("?");
    if (lastIndexQ > 0) {
        let str = url.substr(lastIndexQ+1);
        let strs = str.split("&");
        for(let i = 0; i < strs.length; i ++) {
            if(strs[i].split("=")[0]==key){
                val = unescape(strs[i].split("=")[1]);
            }
        }
    }
    return val
};

const currentTime = (YHMS)=>{ //获取当前时间 以2018-04-02 的形式输出
    /**
     * @param {string} Y 返回年月
     * @param {string} YH 返回年月日
     * @param {string} YHS 返回年月日时分秒
     */

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
    var  D = date.getDate()<10?'0'+date.getDate():date.getDate();

    if(YHMS=='Y'){

        return Y+M+ D
    }if(YHMS=='YH'){
        var h =   date.getHours() <10 ? '0'+ date.getHours(): date.getHours();
        return Y + M + D +' '+ h +':00'
    }if(YHMS=='YHM'){
        var h =   date.getHours() <10 ? '0'+ date.getHours() + ':' : date.getHours()+':';
        var m =   date.getMinutes() <10 ? '0'+ date.getMinutes()  : date.getMinutes();

        return Y + M + D +' '+ h + m
    }if(YHMS=='YHMS'){
        var h =   date.getDate() <10 ? '0'+ date.getDate() + ':' : date.getHours()+':';
        var m =   date.getMinutes() <10 ? '0'+ date.getMinutes() + ':' : date.getMinutes() + ':';
        var s =   date.getSeconds() <10 ? '0'+ date.getSeconds()  : date.getSeconds();
        return Y + M + D +' '+ h + m + s
    }if(YHMS=='YHM2'){
        var h =  (date.getHours()+2) <10 ? '0'+ (date.getHours()+2) + ':':(date.getHours()+2)+':';
        var m =  date.getMinutes() <10 ? '0'+ date.getMinutes(): date.getMinutes();

        return Y + M + D+' ' + h + m
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

    /**
     * @param {string||number} timestamp 时间戳或者格式
     * @param {string} HMS 返回的格式
     */

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
    if(timestamp==null){
        return ''
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
    if(typeof data == 'string'){ //兼容ios

        data = data.replace(/\-/g, "/");
    }
    return  Date.parse(data);
};

const twoBits = (data)=>{ //保留两位小数
    
    /**
     * @param {string} data 传入的值
     */

    let inputValue = data.replace(/[^\d]+\./g,''); //除了数字和.（点）以外，其他的字符都替换为空的

        if(inputValue!=''){
            inputValue = inputValue.replace(/^0*(0\.|[1-9])/, '$1');//解决 粘贴不生效
            inputValue = inputValue.replace(/[^\d.]/g,''); //清除数字和点以外的字符
            
            inputValue = inputValue.replace(/\.{2,}/g, "."); //只保留第一个点清除多余的
            inputValue = inputValue.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
            inputValue = inputValue.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数
            if(inputValue.substr(0,1)=='.'){
                inputValue = ' ';
            }   

        }else{
            inputValue = " ";
        }

       return inputValue; 
}

const calcSize = (ratio)=>{ //计算图片高度
    let domWidth = document.querySelector('body').clientWidth;
    let calcHeight = domWidth*ratio;
    return calcHeight
};


const getCookie=(name)=>{
    let cookies = document.cookie.split(";");
    for(let i=0;i<cookies.length;i++) {
        let cookie = cookies[i];
        let cookieStr = cookie.split("=");
        if(cookieStr && cookieStr[0].trim()==name) {
            return  decodeURI(cookieStr[1]);
        }
    }
};

const getContextUser=()=>{
    let user=null;
    let token=getCookie("gzy-token");
    // let token=null;

    if(token){
        user={};
        user.userId= getCookie("userid");
        user.userName= getCookie("userName");
        user.purchaseCompanyName= getCookie("purchaseCompanyName");
        user.purchaseUserName= getCookie("purchaseUserName");
        user.purchaseCompanyType= getCookie("purchaseCompanyType");
        user.authCompanyType= getCookie("authCompanyType");
        user.authAuditStatus= getCookie("authAuditStatus");
        user.authCompanyName= getCookie("authCompanyName");
    }   
    
    user = {
        "JSESSIONID":"C01D28C0C32554B06211083B6FC5C957",
        "gzy-token":"eyJhcHAiOiIiLCJmbGFnIjowLCJ0aW1lIjoxNTMyNTczMDk5ODE2LCJ0eXBlIjoyLCJ1aWQiOiIzMDY2MCJ9",
        "gzy-uid":"gPLplmVNo7n0ndfYAOHSbsi_tCrHFdPaQEvuDSXAx7vlb_oJ4BOTIgAHkDFMCxqweqUCNYKOP94s8u-abR0Ejl1-rteW1vvk7pIRnF5ZK1NjM1FVCv0ncCtfiJzY4IWg",
        "loginUrl":"/wechatuser/toMyIndex",
        "purchaseCompanyName":"Hghgh",
        "purchaseCompanyType":"2",
        "purchaseUserName":"Hjhj",
        "userName":"15579124240",
        "userid":"1727",
    };
    
    return user;
};


/**
 * 仅仅微信登录
 * @param ROOTURL
 * @param current
 * @returns {string}
 */
const gotoWechatLogin=(ROOTURL,current)=>{
    //需要根据路径将url换成动态的地址
    let  href = ROOTURL+"/wechat/go.html?mobilemandatory=false&auth=false&ReturnURL="+encodeURIComponent(current);
    return href;
};

/**
 * 微信登录且绑定手机号
 * @param ROOTURL
 * @param current
 * @returns {string}
 */
const gotoLoginWithBindMobile=(ROOTURL,current)=>{
    //需要根据路径将url换成动态的地址
    let   href = ROOTURL+"/wechat/go.html?mobilemandatory=true&auth=false&ReturnURL="+encodeURIComponent(current);
    return href;
};

/**
 * 微信登录\绑定手机号并要求认证通过
 * @param ROOTURL
 * @param current
 * @returns {string}
 */
const gotoLoginWithAuthenticate=(ROOTURL,current)=>{
    //需要根据路径将url换成动态的地址
    let   href = ROOTURL+"/wechat/go.html?mobilemandatory=true&auth=true&ReturnURL="+encodeURIComponent(current);
    return href;
};
/**
 * 设置cookie
 * @param name cookie的名称
 * @param value cookie的值
 */
const setCookie=(cname, cvalue)=> {
    document.cookie = cname + "=" + cvalue;
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
    calcSize,
    url2params,
    filesType,
    getCookie,
    setCookie,
    getContextUser,
    isfalse,
    stopEventPropagate,
    currentTime,
    timestampToTime,
    requestApi,
    timeToTimestamp,
    gotoWechatLogin,
    gotoLoginWithBindMobile,
    gotoLoginWithAuthenticate,
    getSearch,
    twoBits
};
