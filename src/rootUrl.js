let Id = null,purchaseType='';
// let url = "https://tmall.gzy360.com:8123/wechat-page/tender/material-tender/bid/index.html/#/bid/1?tenderId=140"
// let url = "https://tmall.gzy360.com:8123/wechat-page/index.html#/detail_material?tenderId=241&tenderType=1"    //材料
// let url = "https://tmall.gzy360.com:8123/wechat-page/index.html#/detail_labour?tenderId=243&tenderType=0" //劳务
// let url = "https://wemall.gzy360.com/wechat-page/index.html#/detail_material?tenderId=243&tenderType=2"
let url = window.location.href;
let lastIndexQ=url.lastIndexOf("?");
if (lastIndexQ > 0) {
    let str = url.substr(lastIndexQ+1);
    let strs = str.split("&");
    for(let i = 0; i < strs.length; i ++) {
        if(strs[i].split("=")[0]=="tenderId"){
            Id = unescape(strs[i].split("=")[1]);
        }
        // console.log(strs[i].split("=")[0])
        if(strs[i].split("=")[0]=="tenderType"){
            // console.log(strs[i])
            purchaseType = unescape(strs[i].split("=")[1]);
        }
    }
    // console.log(purchaseType)
}
export default {
    pathUrl:'https://tmall.gzy360.com:8543',                      //测试环境
    img:'https://gzy-mall.oss-cn-shenzhen.aliyuncs.com/',         //测试环境
    // pathUrl:'http://wemall.gzy360.com',                              //正式环境
    // img:'http://gzy-mall.oss-cn-shenzhen.aliyuncs.com/formal',       //正式环境
    id:Id,
    type:purchaseType,
    Href:window.location.href,
};

