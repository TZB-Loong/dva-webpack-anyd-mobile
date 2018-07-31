
import  {srequest} from '../utils/request';
import constants from '../rootUrl';

//路由的拼接,路由请求的拼接全部放在这里

let ROOTURL = constants.pathUrl;

const backend = {}

backend.sassetDate = async function(params){ 

    /**params (接口参数说明)
    
    |---|---|---|----|----|
    |名称|类型|说明|默认值|是否必须|
    |type|number|1:有效优惠券,2:失效优惠券|1|是
    |pageNum|number|1|请求数据的页码|否
    |pageSize|number|10|请求到的数量|否
     */
    
    return srequest(ROOTURL+'/api/coupon/list?type='+params.type+ '&pageNum=' + params.pageNum + '&pageSize=' +params.pageSize,{
        method: 'get',
    })
}

backend.isApply = async function(){ //不需要参数

    return srequest(ROOTURL + "/wechat/authbusiness/isApplyAndAuthen",{method:'get'})
}

backend.refreshApply = async function(params){

    /**
        params(接口参数说明)
        |---|---|---|----|----|
        |名称|类型|说明|默认值|是否必须|
        |authenId|number|用户登录ID|无|是
     */
    console.log(params,'---params')
    return srequest(ROOTURL+ "/wechat/authbusiness/reauthentication?authenId="+ params.authenId,{
        method:'get'
    })
}


export default backend;




