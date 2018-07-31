import backend from "../services/backend";
import { isfalse } from "../utils/util"; //判断是否有内容

export default {
    namespace:'apply',
    state:{
        isLoading: true,
        showError: false,
    },

    subscriptions: {          //监听history 的变化来触发 action (这个是可以用来监听路由触发action)
        setup({ dispatch, history }) {
          return history.listen(({ pathname }) => {
            //当前的路由的变换俩触发一个action
    
            if (pathname ==="/ApplyIndex") {
              dispatch({ //判断是否已经认证或者正在认证审核的状态
                type: "applyIndex"
              });
            }
          });
        }
      },

    effects:{
        *applyIndex({payload},{call,put}){  //判断是否否处于认证的状态，或者从未认证

            const rp = yield call(backend.isApply);  //执行异步请求，不必传参数
            console.log(rp,'rp-rp-rp-r');
            if(rp.success){
                
                yield put({  //也可执行redux
                    type:'judgeSuccess',
                    payload:{
                        ...rp.data,
                        isLoading:false
                    }
                })
            }else{
                yield put({
                    type:'fail',
                    payload:{     //同一个对象中有两个相同属性的值，后面的会把前面的覆盖
                        ...rp.error,
                        isLoading:false,
                        showError: true,
                    }
                })
            }
        },

        *refreshApply({payload},{call,put}){
            const rp = yield call(backend.refreshApply,payload);
            console.log(rp,'refreshApply')
            if(rp.success){
                yield put({
                    type:"applyIndex"
                })
            }else{
                yield put({
                    type:"fail",
                    payload:{    
                        ...rp.error,
                        isLoading:false,
                        showError: true,
                    }
                })
            }
        }
    },


    reducers:{
        judgeSuccess(state,action){    //数据请求成功后 执行判断
            console.log('action-apply',action)
            var ostate = {...state};
                Object.assign(ostate,action.payload);
            return ostate;
        },
        fail(state,action){
            var ostate = {...state}
            Object.assign(ostate,action.payload);
            return ostate;
        },
        refresh(state,action){
            var ostate = {...state};
            Object.assign(ostate,action.payload);
            return ostate;
        }
    }  


}