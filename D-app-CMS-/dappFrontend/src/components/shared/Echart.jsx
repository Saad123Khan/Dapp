import React, { useEffect, useRef, useState } from 'react';
import ReactEcharts from 'echarts-for-react';

const Echart = (props) => {
    const [data, setData] = useState(Array.from({ length: 30 }, () => Math.floor(Math.random() * 1000) + 10));
    const [color, setColor] = useState('black');
    console.log(props.name);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newData = data.map(() => Math.floor(Math.random() * 1000) + 500);
      setData(newData);

      if (props.name === 'BTC Coin' )  {
        setColor('#000');
      }
       else if (props.name === 'ETH Coin' ) {
        setColor('#6284f5');
      }
       else if (props.name === 'BCH Coin' ) {
        setColor('#8dc351');
      }
       else if (props.name === 'XLM Coin' ) {
        setColor('#111112');
      }
       else if (props.name === 'ATOM Coin' ) {
        setColor('#2e3148');
      }
       else if (props.name === 'XRP Coin' ) {
        setColor('#23292e');
      }
       else if (props.name === 'LINK Coin' ) {
        setColor('#335dd2');
      }

      console.log(data[data.length - 1]);
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [data]);
    const option = {
        xAxis: {
          show: false,
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          show: false,
          type: 'value'
        },
        series: [{
          data: data,
          type: 'line',
          symbol: 'none', // hide the symbols
          lineStyle: {
            width: 2, // set the line width,
            color : color
          },
          itemStyle: {
            opacity: 0 // hide the line segments
          },
          label: {
            show: false // hide the labels
          }
        }],
        grid: {
          left: 0,
          right: 0,
          bottom: 0,
          top: 0 // remove the padding
        }
      };
    
      return <ReactEcharts option={option} style={{ height: '50px' , width : '140px' }} />;
};


export default Echart;
