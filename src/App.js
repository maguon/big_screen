import { useState,useEffect } from 'react'
import * as echarts from 'echarts';
import chinaJson from './assets/data/china.json'
import { BorderBox1 ,BorderBox8 ,BorderBox7,BorderBox4 ,
  BorderBox11,BorderBox13,Decoration1 ,FlylineChart,ScrollBoard,ScrollRankingBoard, 
  BorderBox3,
  BorderBox6,
  BorderBox10,
  BorderBox12} from '@jiaminghi/data-view-react';
import logo from './assets/logo135.png';
import './App.css';
import { apiHost, fileHost } from './config';
import { getDate, getDateTime, hidePhone } from './utils/CommonUtil';
import NumberCard from './components/NumberCard';
import { getLocalItem, setLocalItem } from './utils/LocalUtils';
const httpUtil = require('./utils/HttpUtils');

const App = () => {
  const [totalUser, setTotalUser] = useState();
  const [totalBiz, setTotalBiz] = useState();
  const [totalPosView, setTotalPosView] = useState();
  const [totalTelView, setTotalTelView] = useState();
  const [jobTypeStat, setJobTypeStat] = useState({
    data: [],
    rowNum: 7,
    carousel: 'single'
  })
  const [flyConfig,setFlyConfig] = useState({
    points:[
      {
        name:"大连",
        coordinate:(121.64376,38.921553)
      },
      {
        name:"海口",
        coordinate:(109.760778,18.407516)
      }
    ],
    lines: [
      {
        source: '海口',
        target: '大连'
      }
    ]
  })

  const [userList, setUserList]=useState({   
    header:['姓名','电话','注册时间'],
    data: [],
    rowNum:8,
    index: false,
    align: ['center']
  })
  const [posList, setPosList]=useState({   
    header:['企业名称','职位名称','发布时间'], 
    data: [],
    rowNum:8,
    index: false,
    align: ['center']
  })

  

  const getUserRegStat = async() => {
    try{
      const params = {}
      let url = apiHost + '/admin/userRegDayStat?';
      params.total = 10;
      let conditions = httpUtil.objToUrl(params);
      url = conditions.length > 0 ? url + "&" + conditions : url;
      const res = await httpUtil.httpGet(url);
      console.log(url)
      console.log(res)
      if (res.success === true) { 
          const resList = res.data.list;
          let xData = [];
          let yData = [];
          for(let i =  resList.length ;i>0;i--) {
              xData.push(resList[i-1].id);
              yData.push(resList[i-1].user_count);
          }
          const userDayStatBarChart = echarts.init(document.getElementById('user_day_stat_div'));
          userDayStatBarChart.setOption({  
              color: ['#1370fb'],              
              tooltip: {},
              xAxis: {
                  data: xData
              },
              yAxis: {splitLine: { show: false } },
              series: [
                  {
                  name: '注册',
                  type: 'bar',
                  data: yData
                  }
              ]
          });
      } else if (res.success === false) {
          return []
      }
    } catch (err) {
        console.log(err)
        return [] ;
    }
  }

  const getLastestUserReg = async() => {
    try{
      const params = {}
      let url = apiHost + '/admin/profile?';
      params.pageNumber = 1;
      params.pageSize = 20;
      let conditions = httpUtil.objToUrl(params);
      url = conditions.length > 0 ? url + "&" + conditions : url;
      const res = await httpUtil.httpGet(url);
      if (res.success === true) { 
          const resList = res.data.list;
          const data = [];
          resList.map(item => {
            data.push([item.name,hidePhone(item.phone),getDate(item.CreatedAt)])
          })
          setUserList({   
            header:['姓名','电话','注册时间'],
            data: data,
            rowNum:8,
            index: false,
            align: ['center']
          })
          
      } else if (res.success === false) {
          return []
      }
    } catch (err) {
        console.log(err)
        return [] ;
    }
  }

  const getLastestUserActive = async() => {
    try{
      const params = {}
      let url = apiHost + '/admin/userActiveDayStat?';
      params.total = 10;
      let conditions = httpUtil.objToUrl(params);
      url = conditions.length > 0 ? url + "&" + conditions : url;
      const res = await httpUtil.httpGet(url);
      if (res.success === true) { 
          const resList = res.data.list;
          let xData = [];
          let yData = [];
          const userCountArr =[];
          const bizCountArr =[];
          const userMpCountArr =[];
          for(let i =  resList.length ;i>0;i--) {
              //console.log(resList[i-1].id.toString().slice(4,8))
              xData.push(resList[i-1].id.toString().slice(4,8));
              yData.push(resList[i-1].userCount);
              userCountArr.push(resList[i-1].userCount);
              userMpCountArr.push(resList[i-1].userMpCount);
              bizCountArr.push(resList[i-1].bizCount);
          }
          const userDayStatBarChart = echarts.init(document.getElementById('user_day_stat_div'), 'dark');
          userDayStatBarChart.setOption({  
            backgroundColor:'transparent',
            legend: {
              textStyle: {
                color: '#FFF',
              },
              data: ['求职', '企业']
            },
            tooltip: {},
            xAxis: {
                data: xData
            },
            yAxis: {
              splitLine: { show: true },
              textStyle: {
                color: '#FFF',
              },
            },
            series: [
                {
                  name: '求职',
                  type: 'bar',
                  data: userCountArr
                },
                {
                  name: '企业',
                  type: 'bar',
                  data: bizCountArr
                }
            ]
          });
      } else if (res.success === false) {
          return []
      }
    } catch (err) {
        console.log(err)
        return [] ;
    }
  }

  const getLastestBizPos = async() => {
    try{
      const params = {}
      let url = apiHost + '/public/bizPos?';
      params.pageNumber = 1;
      params.pageSize = 20;
      let conditions = httpUtil.objToUrl(params);
      url = conditions.length > 0 ? url + "&" + conditions : url;
      const res = await httpUtil.httpGet(url);
      if (res.success === true) { 
          const resList = res.data.list;
          const data = [];
          resList.map(item => {
            data.push([item.bizShortName,item.posTitle,getDate(item.refreshAt)]);
          })
         setPosList({   
          header:['企业名称','职位名称','发布时间'], 
          data: data,
          rowNum:8,
          index: false,
          align: ['center']
        })
          
      } else if (res.success === false) {
          return []
      }
    } catch (err) {
        console.log(err)
        return [] ;
    }
  }

  const getUserTotalStat = async() => {
    try{
      let url = apiHost + '/admin/userTotalStat?';
      const res = await httpUtil.httpGet(url);
      if (res.success === true) { 
          const resList = res.data.list;
          setTotalUser(resList[0].user_count)
          
      } else if (res.success === false) {
          return 0
      }
    } catch (err) {
        console.log(err)
        return 0 ;
    }
  }

  const getBizTotalStat = async() => {
    try{
      let url = apiHost + '/admin/bizTotalStat?';
      const res = await httpUtil.httpGet(url);
      if (res.success === true) { 
          const resList = res.data.list;
          setTotalBiz(resList[0].biz_count)
          
      } else if (res.success === false) {
          return 0
      }
    } catch (err) {
        console.log(err)
        return 0 ;
    }
  }

  const getPosViewTotalStat = async() => {
    try{
      let url = fileHost + '/public/posView?';
      const res = await httpUtil.httpGet(url);
      if (res.success === true) { 
          const resList = res.data;
          setTotalPosView(resList.total_count)
          
      } else if (res.success === false) {
          return 0
      }
    } catch (err) {
        console.log(err)
        return 0 ;
    }
  }

  const getTelViewTotalStat = async() => {
    try{
      let url = fileHost + '/public/posTelView?';
      const res = await httpUtil.httpGet(url);
      if (res.success === true) { 
          const resList = res.data;
          setTotalTelView(resList.total_count)
          
      } else if (res.success === false) {
          return 0
      }
    } catch (err) {
        console.log(err)
        return 0 ;
    }
  }

  const getBizJobTypeStat = async() => {
    try{
      const params = {}
      let url = apiHost + '/admin/posJobTypeStat?';
      params.pageNumber = 1;
      params.pageSize = 20;
      let conditions = httpUtil.objToUrl(params);
      url = conditions.length > 0 ? url + "&" + conditions : url;
      const res = await httpUtil.httpGet(url);
      if (res.success === true) { 
          const resList = res.data.list;
          const data = [];
          resList.map(item => {
            data.push({
              name: item.jobTypeName,
              value: item.jobTypeCount
            });
          })
          
          setJobTypeStat({
            data: data.slice(0,10),
            rowNum: 7,
            carousel: 'single'
          })
          
      } else if (res.success === false) {
          return []
      }
    } catch (err) {
        console.log(err)
        return [] ;
    }
  }

  const getSysToken = async () => {
    const url = apiHost + '/public/adminT_Token';
    const res = await httpUtil.httpGet(url);
    if(res && res.success){
      setLocalItem('auth-token',res.data.list[0].token)
    }
  }

  const getUserOptStat = async () => {
    try{
      const params = {}
      let url = apiHost + '/admin/userProfileOptStat?';
      let conditions = httpUtil.objToUrl(params);
      url = conditions.length > 0 ? url + "&" + conditions : url;
      const res = await httpUtil.httpGet(url);
      if (res.success === true) { 
          const resList = res.data.list;
          const data = [];
          for(let i=0;i<8;i++){
            data.push({
              name: resList[i].name,
              value: resList[i].opt_count
            });
          }
          const userOptPieChart = echarts.init(document.getElementById('user_opt_stat_div'));
          userOptPieChart.setOption({  
            tooltip: {
              trigger: 'item'
            },
            series: [
              {
                name: '',
                type: 'pie',
                radius: '50%',
                showDataShadow: true,
                showLabel: true,
                data: data,
                emphasis: {
                  itemStyle: {
                    shadowBlur: 100,
                    shadowOffsetX: 10,
                    shadowColor: 'rgba(0, 0, 0, 0.8)'
                  }
                }
              }
            ]
          });
          
      } else if (res.success === false) {
          return []
      }
    } catch (err) {
        console.log(err)
        return [] ;
    }
  }
  const getBizScaleStat = ()=>{
    const userOptPieChart = echarts.init(document.getElementById('user_opt_stat_div'));
    userOptPieChart.setOption({  
      series: [
        {
            name: '求职意向',
            type: 'pie',
            radius: '60%',
            center: ['50%', '50%'],
            data: [
                {value: 135, name: '500-999人'},
                {value: 20, name: '10000人以上'},
                {value: 74, name: '1000-9999'},
                {value: 265, name: '100-499人'},
                {value: 372, name: '50-99人'},
                {value: 500, name: '50人以下'}
            ],
            tooltip: {
              trigger: 'item',
              formatter: '{b} : {c} ({d}%)'
            },
            itemStyle: {
                
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            },

        }
      ]
    });
  }
  useEffect(() => {
    getSysToken();
    getLastestUserActive();
    getLastestBizPos();
    getLastestUserReg();
    getBizJobTypeStat();
    getUserOptStat();
    getUserTotalStat();
    getBizTotalStat();
    getPosViewTotalStat();
    getTelViewTotalStat();
    setInterval(() => {
      getUserTotalStat();
      getBizTotalStat();
      getPosViewTotalStat();
      getTelViewTotalStat();
      //clearInterval(intervalId)
    }, 60000);

    setInterval(() => {
      getLastestBizPos();
      getLastestUserReg();
    }, 600000);
    
    setInterval(() => {
      getLastestUserActive();
      getBizJobTypeStat();
      getUserOptStat();
    }, 3600000);
    /* const mapChart = echarts.init(document.getElementById('mapChartDiv'))
    echarts.registerMap('chinaMap', chinaJson);
    mapChart.setOption({
      title: {
        text: '各省求职者分布图',
        subtext: '数据来源业聘平台',
        show:false
      },
      tooltip: {
        trigger: 'item',
      },
      toolbox: {
        show: false,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {}
        }
      },
      series: [
        {
          name: '销量',
          type: 'map',
          map: 'chinaMap',
          label: {
            normal: {
              show: true
            }
          },
          itemStyle:{
            normal:{
              borderColor:"#FFFFFF",
              areaColor:"#486AFF",
              borderWidth:3,
            }
          }
        }
      ]
    }); */
  }, []);
  return (
    <div className="data">
      <header className="header_main">
        <div className="left_bg"></div>
        <div className="right_bg"></div>
        <h3 style={{color:'#f97316',fontSize:32,}}>业聘App-招聘平台数据大屏</h3>
        <h4 style={{color: '#fdba74',textAlign: 'center', fontStyle: 'italic',fontFamily: 'cursive',fontSize: 24}}>让金普没有难找的工作!</h4>
      </header>
      <div className="wrapper">
        <div className="container-fluid">
          <div className="row fill-h" style={{ display: 'flex' }}>

            {/* 第一列 */}
            <div className="col-lg-3 fill-h" style={{ width: '25%' }}>
              <div className="xpanel-wrapper xpanel-wrapper-5">
                <BorderBox11 title="热门职业类型">
                  <div className="xpanel">
                    <div className="fill-h" id="mainMap1" style={{paddingTop:25}}>                      
                      <ScrollRankingBoard config={jobTypeStat}/>
                    </div>
                  </div>
                </BorderBox11>
              </div>
              <div className="xpanel-wrapper xpanel-wrapper-4">
                <BorderBox8>
                    <div className="xpanel">
                      <div className="fill-h" id="mainMap2">
                        <ScrollBoard config={posList}  />
                      </div>
                    </div>
                </BorderBox8>
              </div>
            </div>

            {/* 第二列 */}
            <div className="col-lg-6 fill-h" style={{ width: '50%' }}>
              <div className="xpanel-wrapper xpanel-wrapper-5" style={{ display: 'flex',paddingTop:30 }}>
                <BorderBox10>
                <div className="xpanel" style={{ position: 'relative',width:"100%"}}>
                  <div className="map_bg"></div>
                  <div className="circle_allow"></div>
                  <div className="circle_bg"></div>
                  <div style={{ width:"100%",height:"100%",display:'flex',flexDirection:'column',justifyContent:'center',color:'#fff',alignItems:'center'}}>
                    <div style={{width:"100%",height:"50%",display:'flex',padding: '0 16',justifyContent:'space-around'}}>
                      <div style={{padding:6,}}>
                        <p style={{textAlign:'center',fontSize:24,}}>注册用户</p>
                        {totalUser && totalUser>0 && 
                        <NumberCard num={totalUser}/>}
                      </div>
                      <div style={{padding:6,}}>
                        <p style={{textAlign:'center',fontSize:24,}}>认证企业</p>
                          {totalBiz && totalBiz>0 && 
                        <NumberCard num={totalBiz}/>}
                      </div>
                    </div>
                    <div style={{width:'100%', display:'flex',justifyContent:'space-around',padding: '0 16',}}>
                      <div style={{padding:6,}}>
                        <p style={{textAlign:'center',fontSize:24,}}>职位查看</p>
                        {totalPosView && totalPosView>0 && <NumberCard num={totalPosView}/>}
                      </div>
                      <div style={{padding:6,}}>
                        <p style={{textAlign:'center',fontSize:24,}}>电话沟通</p>
                        {totalTelView && totalTelView>0 && <NumberCard num={totalTelView}/>}
                      </div>
                    </div>
                    {/* <div className="fill-h" style={{width:1000,height:1000}} id="mapChartDiv"></div> */}
                  </div>
                </div>
                </BorderBox10>
              </div>
              <div className="xpanel-wrapper xpanel-wrapper-4" style={{ display: 'flex',padding:0 }}>
                <div style={{ width: '100%', position: 'relative'}}>
                  <div className="content_title" style={{marginTop: -12}}>求职者/企业用户日活跃趋势</div>
                  <BorderBox1>
                    <div className="xpanel">
                      <div className="fill-h" style={{marginTop:32}} id="user_day_stat_div"> </div>
                    </div>
                  </BorderBox1>
                </div>
              </div>
            </div>

            {/* 第三列 */}
            <div className="col-lg-3 fill-h" style={{ width: '25%' }}>
              <div className="xpanel-wrapper xpanel-wrapper-5" style={{ position: 'relative' }}>
                <BorderBox11 reverse title="求职意向统计"> 
                  <div className="xpanel">
                    <div className="fill-h scale-big" id="user_opt_stat_div"></div>
                  </div>
                </BorderBox11>
              </div>
              {/* <div className="xpanel-wrapper xpanel-wrapper-6" style={{ position: 'relative' }}>
                <div className="content_title">重点行业排名</div>
                <BorderBox4 reverse>
                  <div className="xpanel">
                    <div className="fill-h" id="cityMap"></div>
                  </div>
                </BorderBox4>
              </div> */}
              <div className="xpanel-wrapper xpanel-wrapper-4" style={{ position: 'relative' }}>
                <BorderBox8 reverse>
                  <div className="xpanel">
                    <div className="fill-h" id="mainMap3">
                    <ScrollBoard config={userList}  />
                    </div>
                  </div>
                </BorderBox8>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default App;
