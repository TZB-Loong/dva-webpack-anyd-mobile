/**
 * dva model 的分为五个属性
 * 
 * namespace :'string'   //命名空间（可有一个页面对应一个命名空间）
 * state :[]  //初始的状态
 * subscriptions: {}  // 监听路由的变化  可以在监听之后发出action
 * effects: {}  //处理异步操作和业务逻辑 不直接修改state,由action触发，可以发action  格式为 *(action, effects) => void 或 [*(action, effects) => void, { type }]
 * 
 * type 的类型  takeEvery
                takeLatest
                throttle
                watcher
 * 
 * reducers:{}  // 处理同步操作和业务逻辑，唯一可以修改state的地方，由action触发 格式为 (state, action) => newState 或 [(state, action) => newState, enhancer]、
 * put 分发action (本地数据替换) 
 * call 调用异步函数(异步请求AJAX)
 * 
 */

import backend from "../services/backend";
import { isfalse } from "../utils/util"; //判断是否有内容


export default {
  namespace: "asset",
  state: {
    isLoading: true,  //是否还在请求当中;
    showError: false, //是否请求错误
    showEmpty: false, //数据为空时显示
    bodyH:window.screen.height , //屏幕的高度
    bodyW:document.body.clientWidth   //屏幕的宽度
  },

  subscriptions: {  //监听history 的变化来触发 action (这个是可以用来监听路由触发action)
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {  //当前的路由的变换俩触发一个action
        if (pathname === "/Asset") {
          dispatch({
            type: "load",
            payload: {
              type: "1",
              pageNum: "1",
              pageSize: "5"
            }
          });
        }

        if(pathname === "/loseVoucher"){
          dispatch({
            type:"load",
            payload:{
              pageNum:'1',
              type:"2",
              pageSize:"5"
            }
          })
        }
      });
    }
  },

  effects: {
    *load({ payload }, { call, put }) {   //这个put 是只有在异步执行完之后才会再次执行的;
           
      const rp = yield call(backend.sassetDate, payload); //执行异步请求部分，也就是http数据请求部分

      if (rp.success) {  //在请求成功之后发出这个action

        yield put({
          type: "success",
          payload: {  //分发action
            ...rp.data,
            flush: isfalse(payload.flush) ? "replace" : payload.flush //数据请求之后的保存方式
          }
        });

        // yield put({    在不同的model里面是可以调用其他model里面定义的action (action的定义是全局的)
        //   type:"apply/applyIndex"
        // })

      } else { // 请求失败发出这个action
        
        yield put({
          type: "fail",
          payload: {
            ...rp.error,
            flush: isfalse(payload.flush) ? "replace" : payload.flush
          }
        });
      }
    }
  },

  reducers: { //这里才是唯一修改state地方
    
    success(state, action) {
      var ostate = { ...state };
      // console.log('action-action',action.payload)
      ostate.showEmpty = isfalse(action.payload.page);
      ostate.isLoading = false;

      switch (action.flush) { //根据传入的参数flush的值来判断请求所得到的值与原来的值怎么存储
        case "replace":  //更新数据 覆盖现有请求的数据
          Object.assign(ostate, action.payload);
          break;
        case "update": //更新数据，从最后一个开始追加
          action.payload.page = isfalse(ostate.page)
            ? action.payload.page
            : ostate.page.concat(action.payload.page);
          Object.assign(ostate, action.payload);
          break;
        case "preppend": //更新数据，从0开始追加
          action.payload.page = isfalse(ostate.page)
            ? action.payload.page
            : action.payload.page.concat(ostate.page);
          Object.assign(ostate, action.payload);
          break;
        default:
          Object.assign(ostate, action.payload);
      }
      return ostate;
    },
    fail(state, action) {
      var ostate = { ...state }; //原来的state里面的东西
      Object.assign(ostate,action.payload);
      ostate.showError = true;
      ostate.isLoading = false;
      ostate.showEmpty = false;

      return ostate;
    }
  }
};
