import dva from 'dva';
import createLoading from 'dva-loading';
import RouterConfig from './router';

import applyModel from './modles/applyModel';
import assetModel from './modles/asssetModel';


const app = dva();//创建应用

app.use(createLoading()); //使用dva-loading插件来监听全局的loading 是否加载完成

app.model(assetModel);

app.router(RouterConfig);  //导入路由

app.start('#root'); //关联实例
