import React from 'react';
import { connect } from 'dva';
import {Tabs, List, Toast,ListView} from 'antd-mobile';
import Store from '../../services/store';
import { isfalse, timestampToTime } from '../../utils/util';

import "./style.css"; //引入css
/**
 * routerRedux ：put 执行时跳转
 * Link : 在页面点击时执行跳转
 */

class Asse extends React.Component {
  constructor(props) {
    super(props);

    const dataSource = new ListView.DataSource({ //这是必须的
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource,
      // isLoading: true,
    };
  }

  componentDidMount() {

    // Toast.loading('Loading...', 0); //全局的加载提示

    Store.bind(this.props.dispatch); //将dispatch绑定到Store里面去
    
    setTimeout(() => { //等数据传进来后才开始进行赋值
      
      this.setState({
        dataSource:  isfalse(this.props.asset.page)?this.state.dataSource:this.state.dataSource.cloneWithRows(this.props.asset.page),
      });
    }, 600);
  }
    static defaultProps = {
    defaulttitle: [
      { title: '优惠券', sub: '1' },
      { title: '优惠券', sub: '1' },
    ]
  }

  onEndReached = (event) => { //加载更多时调用(函数)
    const assetDate = this.props.asset;
    if(assetDate.totalPageNum == assetDate.pageNum){
        return;
    }
    Store.getAsset(1,++assetDate.pageNum,assetDate.pageSize,'update'); //请求新的数据
  }

  row= (rowData,sectionID,rowID)=>{
    return <div className='asset-box' >
        <span className='asset-left'></span>
        <div className='asset-textbox'>
          <span className='asset-symbolbox'>
            <span className='asset-symbol'>￥</span>
            <span className='asset-num'>{rowData.originalAmount}</span>
          </span>
          <div className='asset-text'>余额:{rowData.currentAmount}元</div>
        </div>
        <div className='asset-body'>
          <div>
            <div className='asset-bodyhd'>
              <span>佣金抵扣券 </span>
              <span style={{ marginRight: '10px' }}>
                <a href="" style={{ color: '#6DA4FD' }}>立即使用</a> </span>
            </div>
          </div>
          <div style={{ marginTop: '10px' }}>
            <div className='asset-title'>
              <span>
                有效期至&nbsp;{timestampToTime(rowData.effectiveEndTime,"HMS")}
              </span>
            </div>
          </div>
          <div className='asset-ft'>
            <span className='asset-details'>可分多次使用</span>
            <span className='asset-details'>
              <span style={{ color: 'gray', marginRight: '10px' }}>
                使用规则
                <i className="iconfont icon-xiangyou" style={{ fontSize: '12px' }}></i>
              </span>
            </span>
          </div>
        </div>
      </div>
  }

  render() {
    let _this = this;
    return (
      <div>
       <Tabs tabs={_this.props.defaulttitle}
        initialPage={0}
          onChange={(tab, index) => {  
            console.log(tab,index,'tab,index')
         }}
         onTabClick={(tab, index) => { 
           console.log(tab,index,'tab,index')
          }}
         swipeable='false'
        > 
        <div style={{ height:_this.props.asset.bodyH-45+'px',paddingTop:'5px',display:isfalse(_this.props.asset.page)?'none':null }}>
       
        <ListView
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        // renderFooter={() =>  //显示的是尾部
        //   {this.state.isLoading ? Toast.loading("loading", 0): Toast.hide()}
        // }
        renderRow={_this.row}  //每一行的显示
        pageSize={4}  //每次事件循环渲染的行数
        useBodyScroll  //使用 html 的 body 作为滚动容器
        onScroll={() => { console.log('scroll'); }}  //
        scrollRenderAheadDistance={500}  //当一个行接近屏幕范围多少像素之内的时候，就开始渲染这一行
        onEndReached={this.onEndReached} //当所有的数据都已经渲染过，并且列表被滚动到距离最底部不足onEndReachedThreshold个像素的距离时调用
        onEndReachedThreshold={10}  //调用onEndReached之前的临界值，单位是像素
      /> 
      {/* <div>请求的是啥</div> */}
        </div>
        </Tabs>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    asset: state.asset
  }
}
const Asset = connect(mapStateToProps)(Asse) //连接到dva
export default Asset;
