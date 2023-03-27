import { useState,useEffect } from 'react'
import * as echarts from 'echarts';
import chinaJson from './assets/data/china.json'
import { BorderBox1 ,BorderBox8 ,BorderBox7,BorderBox4 ,
  BorderBox11,BorderBox13,Decoration1 ,FlylineChart,ScrollBoard,ScrollRankingBoard } from '@jiaminghi/data-view-react';
import logo from './assets/logo135.png';
import './App.css';

const App = () => {
  const [topData,setTopData] = useState({
    data: [
      {
        name: '周口',
        value: 55
      },
      {
        name: '南阳',
        value: 120
      },
      {
        name: '西峡',
        value: 78
      },
      {
        name: '驻马店',
        value: 66
      },
      {
        name: '新乡',
        value: 80
      },
      {
        name: '信阳',
        value: 45
      },
      {
        name: '漯河',
        value: 29
      },
      {
        name: '新乡',
        value: 80
      },
      {
        name: '信阳',
        value: 45
      },
      {
        name: '漯河',
        value: 29
      },
      {
        name: '新乡',
        value: 80
      },
      {
        name: '信阳',
        value: 45
      },
      {
        name: '漯河',
        value: 29
      }
    ],
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
  const [tableData,useTableData]=useState({    
    data: [
      ['行1列1', '行1列2', '行1列3'],
      ['行2列1', '行2列2', '行2列3'],
      ['行3列1', '行3列2', '行3列3'],
      ['行4列1', '行4列2', '行4列3'],
      ['行5列1', '行5列2', '行5列3'],
      ['行6列1', '行6列2', '行6列3'],
      ['行7列1', '行7列2', '行7列3'],
      ['行8列1', '行8列2', '行8列3'],
      ['行9列1', '行9列2', '行9列3'],
      ['行10列1', '行10列2', '行10列3']
    ],
    rowNum:8,
    index: false,
    align: ['center']
  })

  useEffect(() => {
    const mapChart = echarts.init(document.getElementById('mapChartDiv'))
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
    });
  }, []);
  return (
    <div className="data">
      <header className="header_main">
        <div className="left_bg"></div>
        <div className="right_bg"></div>
        <h3>业聘App-招聘平台监管大屏</h3>
      </header>
      <div className="wrapper">
        <div className="container-fluid">
          <div className="row fill-h" style={{ display: 'flex' }}>

            {/* 第一列 */}
            <div className="col-lg-3 fill-h" style={{ width: '25%' }}>
              <div className="xpanel-wrapper xpanel-wrapper-5">
                <BorderBox11 title="城市排名">
                  <div className="xpanel">
                    <div className="fill-h" id="mainMap1" style={{paddingTop:25}}>                      
                      <ScrollRankingBoard config={topData}/>
                    </div>
                  </div>
                </BorderBox11>
              </div>
              <div className="xpanel-wrapper xpanel-wrapper-4">
                <BorderBox13 title="新增岗位">
                  <div className="xpanel">
                    <div className="fill-h" id="worldMap">
                      <ScrollBoard config={tableData}  />
                    </div>
                  </div>
                </BorderBox13>
              </div>
            </div>

            {/* 第二列 */}
            <div className="col-lg-6 fill-h" style={{ width: '50%' }}>
              <div className="xpanel-wrapper xpanel-wrapper-5" style={{ display: 'flex' }}>
                <div className="xpanel" style={{ position: 'relative',width:"100%"}}>
                 {/*  <div className="map_bg"></div>
                  <div className="circle_allow"></div>
                  <div className="circle_bg"></div> */}
                  <div style={{width:'100%', height:"100%",position:'absolute',display:'flex',top:100, justifyContent:'center',color:'#fff',alignItems:'center'}}>

                    <div className="fill-h" style={{width:1000,height:1000}} id="mapChartDiv"></div>
                  </div>
                </div>
              </div>
              <div className="xpanel-wrapper xpanel-wrapper-4" style={{ display: 'flex' }}>
                <div style={{ width: '50%', position: 'relative'}}>
                  <BorderBox8>
                    <div className="xpanel">
                      <div className="fill-h" id="mainMap2"></div>
                    </div>
                  </BorderBox8>
                </div>
                <div style={{ width: '50%', marginLeft: 8 }}>
                  <BorderBox8 reverse>
                    <div className="xpanel">
                      <div className="fill-h" id="mainMap3">
                      <ScrollBoard config={tableData}  />
                      </div>
                    </div>
                  </BorderBox8>
                </div>
              </div>
            </div>

            {/* 第三列 */}
            <div className="col-lg-3 fill-h" style={{ width: '25%' }}>
              <div className="xpanel-wrapper xpanel-wrapper-6" style={{ position: 'relative' }}>
                <div className="content_title">企业规模占比</div>
                <BorderBox4 reverse>
                  <div className="xpanel">
                    <div className="fill-h" id="provinceMap"></div>
                  </div>
                </BorderBox4>
              </div>
              <div className="xpanel-wrapper xpanel-wrapper-6" style={{ position: 'relative' }}>
                <div className="content_title">重点行业排名</div>
                <BorderBox4 reverse>
                  <div className="xpanel">
                    <div className="fill-h" id="cityMap"></div>
                  </div>
                </BorderBox4>
              </div>
              <div className="xpanel-wrapper xpanel-wrapper-4" style={{ position: 'relative' }}>
                <div className="content_title">日增用户趋势</div>
                <BorderBox1 reverse>
                  <div className="xpanel">
                    <div className="fill-h" id="countyMap"></div>
                  </div>
                </BorderBox1>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default App;
