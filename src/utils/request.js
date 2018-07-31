
// import dva from 'dva';
// const fetch = dva.fetch;

import {Toast } from 'antd-mobile';
import {isfalse} from './util';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {  //抛出状态异常
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;  //抛出异常
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
*/

export function srequest(url, options) {

  // Toast.loading('Loading...', 0); //全局的加载提示

  options["redirect"] = "manual";
  options["credentials"] = "include"; //请求包含cokie
  options["mode"] = "cors";

  var hd = new Headers();

  var opt = {
    method: "GET",
    headers: hd,
    mode: "cors",
    cache: "default",
    ...options
  };


  let requestData = null,
    success = false,
    error = "",
    rp;

  //在第一段函数里面去判是用的json还是text

  return fetch(url, opt)
    .then(function(res) {
    try{
        checkStatus(res); //这个是状态失败的判断
        var ct = res.headers.get("content-type");
        var len = res.headers.get("content-length");
        if (ct.indexOf("javascript") == -1 && len != "0") {
          return res.json();
        } else {
          return res.text();
        }
    }  catch(e){
        error = e;
    }  
    })
    .then(
      data => {
          success = true;
          // console.log(data,'data')
          if(isfalse(data.page)){
            // Toast.hide(); //加载完成后清除
            Toast.offline('暂无数据', 0);   //暂时先这样子的处理
          }else{
            // Toast.hide(); //加载完成后清除
            
          }
          return {
              success,
              data,
              error:''
          }
      },
      error => {
          success = false;

          Toast.offline('网络请求失败', 1);

          return {
              success,
              error,
              data:''
          }
        
      }
    );
}
