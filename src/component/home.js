import React, { Component } from 'react';   //引入React
import { connect } from 'dva';
import { TabBar, Carousel, WingBlank } from 'antd-mobile';


class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'blueTab',
      hidden: false,
      fullScreen: false,
      data: ['1', '2', '3'],
      imgHeight: 176,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
      });
    }, 100);
  }

  asynExecution(){ //Promise 对象的执行 (Promise 是一个对象,也是一个构造函数)

    /**
     * Promise 接受一个回调函数作为参数
     */
    function f1(resolve,reject){
      console.log('异步代码')
    }
    function f2(resolve,reject){
      console.log('第二部分的异步代码')
    }
    var p1 = new Promise(f1);  //p1就是Promise的一个实例
    p1.then(f2)  //在f1执行完之后在执行f2
    /**
     * Promise的思路就是(所有的异步任务都返回一个Promise实例,Promise实例有一个then方法,用来指定下一步的回调函数)
     * Promise 对象通过自身的状态,来控制异步操作,Promise实例有三种状态
     *  {
     *    pending:异步操作未完成
     *    fulfilled:异步操作成功
     *    rejected:异步操作失败
     * }
     * 
     * fulfilled和rejected合在一起称为resolved
     * //合为2种状态
     * {
     *  从未完成到成功
     *  从未完成到失败
     * }
     * Promise实例的状态变化只可能发生一次
     * 503错误(apache请求线程占满)
     */

  }



  renderContent(pageText) { //要显示的主体内容
    return (
      <div style={{ height: '100%'}}>你好大哥</div>
    );
  }

  render() {
    return (
      <div>
        <WingBlank>
          <Carousel
            autoplay={true}
            infinite
            beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
            afterChange={index => console.log('slide to', index)}
          >
            {this.state.data.map(val => (
              <a
                key={val}
                href="http://www.alipay.com"
                style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
              >
                <img
                  src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                  alt=""
                  style={{ width: '100%', verticalAlign: 'top' }}
                  onLoad={() => {
                    window.dispatchEvent(new Event('resize'));
                    this.setState({ imgHeight: 'auto' });
                  }}
                />
              </a>
            ))}
          </Carousel>
        </WingBlank>
        <div style={{ position: 'fixed', height: "72vh", width: '100%', bottom: 0 }}>
          <TabBar
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="white"
            hidden={this.state.hidden}
          >
            <TabBar.Item
              title="找材料"
              key="Life"
              icon={<div style={{
                width: '22px',
                height: '22px',
                background: "url(" + require("./image/jk_bar1-1.png") + ") center center /  26px 20px no-repeat"
              }}
              />
              }
              selectedIcon={<div style={{
                width: '22px',
                height: '22px',
                background: "url(" + require("./image/jk_bar1.png") + ") center center /  26px 20px no-repeat"
              }}
              />
              }
              selected={this.state.selectedTab === 'blueTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'blueTab',
                });
              }}
              data-seed="logId"
            >
              <div>
                {this.renderContent('Life')}
              </div>

            </TabBar.Item>
            <TabBar.Item
              icon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: "url(" + require("./image/jk_bar2-1.png") + ") center center /  26px 20px no-repeat"
                }}
                />
              }
              selectedIcon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: "url(" + require("./image/jk_bar2.png") + ") center center /  26px 20px no-repeat"
                }}
                />
              }
              title="找劳务"
              key="Koubei"
              selected={this.state.selectedTab === 'redTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'redTab',
                });
              }}
              data-seed="logId1"
            >
              {this.renderContent('Koubei')}
            </TabBar.Item>
            <TabBar.Item
              icon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: "url(" + require("./image/jk_bar3-1.png") + ") center center /  26px 20px no-repeat"
                }}
                />
              }
              selectedIcon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: "url(" + require("./image/jk_bar3.png") + ") center center /  26px 20px no-repeat"
                }}
                />
              }
              title="招投标"
              key="Friend"
              //   dot
              selected={this.state.selectedTab === 'greenTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'greenTab',
                });
              }}
            >
              {this.renderContent('Friend')}
            </TabBar.Item>
            <TabBar.Item
              icon={{ uri: require("./image/jk_bar4-1.png") }}
              selectedIcon={{ uri: require("./image/jk_bar4.png") }}
              title="询价宝"
              key="xunjia"
              selected={this.state.selectedTab === 'xunjia'}
              onPress={() => {
                this.setState({
                  selectedTab: 'xunjia',
                });
              }}
            >
              {this.renderContent('My')}
            </TabBar.Item>
            <TabBar.Item
              icon={{ uri: require("./image/jk_bar5-1.png") }}
              selectedIcon={{ uri: require("./image/jk_bar5.png") }}
              title="我的"
              key="my"
              selected={this.state.selectedTab === 'yellowTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'yellowTab',
                });
              }}
            >
              {this.renderContent('My')}
            </TabBar.Item>
          </TabBar>
        </div>
      </div>

    );
  }
}

const mapStateToProps = state => ({   //过滤数据(数据刷新,组件刷新)
  state
})

module.exports = connect(mapStateToProps)(Home); //将state放到组件的this.pros里面去