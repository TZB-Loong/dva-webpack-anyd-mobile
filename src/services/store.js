
const Store = function(){
    
};

Store.prototype._env = {};
Store.prototype._fields_get_state = {};

Store.bind = function(dispatch,base){
    Store._dispatch = dispatch;
    Store.prototype._env = base;
};


Store.dispatch = function(){     
   
    /*
       dipatch消息到store
       可以用两种参数方式，一种是dva方式，即用{type,payload}作为参数
     */

    if (typeof arguments[0] == 'object'){

        Store._dispatch(arguments[0]);   //这里调用的action 

    } else if (typeof arguments[0] == 'string'){
        var reducer = arguments[0];
        var payload = arguments[1];

        Store._dispatch({type:reducer,payload:payload});
    }

}

Store.getAsset = function(type,pageNum,pageSize,flush){ 

    /*  优惠券列表请求参数说明

    |---|---|---|----|----|
    |名称|类型|说明|默认值|是否必须|
    |type|srting|type='1'请求有效优惠券列表,type='2'请求失效优惠券列表|无|是
    |pageNum|string|本次请求第几页的数据|1|否
    |pageSize|string|请求数据的数量|10|否
    |flush|string|数据请求后保存的方式|replace(覆盖,默认)update(从最后开始追加)preppend（从0开始追加）|否 

     */

     
    const dparam ={type:type,pageNum:pageNum,pageSize:pageSize,flush:flush}

    Store.dispatch({type:"asset/load",payload:dparam})

}

Store.refreshApply = function(id){
    /**
     * 重新申请认证跳转
     * 
     */

    const dparam = {authenId:id}
    Store.dispatch({type:'apply/refreshApply',payload:dparam})

}


export default Store;