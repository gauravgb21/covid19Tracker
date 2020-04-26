import React , { Component } from 'react';
import ReactApexChart from 'react-apexcharts';

class LineChart extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        series: [{
            name: "Confirmed Cases",
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }]
      };
    }

    setScale = (num,digits) => {
      var si = [
        { value: 1, symbol: "" },
        { value: 1E3, symbol: "k" },
        { value: 1E6, symbol: "M" },
        { value: 1E9, symbol: "G" },
        { value: 1E12, symbol: "T" },
        { value: 1E15, symbol: "P" },
        { value: 1E18, symbol: "E" }
      ];
      var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
      var i;
      for (i = si.length - 1; i > 0; i--) {
        if (num >= si[i].value) {
          break;
        }
      }
      return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
    }

    render() {
      let chartElement;
      let indexToStart = -1;
      this.props.seriesData.forEach((data,ind) => {
        if(data !== 0 && indexToStart === -1){
          indexToStart = ind;
        }
      });
      let newSeriesData = this.props.seriesData.slice(indexToStart,this.props.seriesData.length);
      let newXdata      = this.props.xData.slice(indexToStart,this.props.xData.length);
      let seriesData = [{
        name : this.props.title,
        data : newSeriesData
      }];
      let maxVal = -1;
      this.props.seriesData.forEach((data) => {
        maxVal = Math.max(maxVal,data);
      });
      let yAxixObj = {}; 
      if(this.props.showLogarithmic){
        yAxixObj = {
          logarithmic: true,
          min: 1,
          max: maxVal + 1E6, 
          labels: {
            style : {
              colors : this.props.lineColor[0]
            },
            formatter: (value) => {
              return this.setScale(value);
            }
          }
        }
      }
      else{
        yAxixObj = { 
            labels: {
              style : {
                colors : this.props.lineColor[0]
              },
              formatter: (value) => {
                return this.setScale(value);
              }
            }
        }
      }
      chartElement = (
        <ReactApexChart options={{
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false
            },
            toolbar : {
                show:false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'straight',
            colors : this.props.lineColor[0],
            width : 3
          },
          title: {
            text: (this.props.title),
            align: 'center',
            style : {
              color : this.props.lineColor[0],
              fontWeight : '500'
            }
          },
          grid: {
            show:true,
            borderColor: this.props.gridColor[0],
            row: {
              colors: this.props.gridColor, // takes an array which will be repeated on columns
              opacity: 1
            },
          },
          tooltip : {
            enabled : true,
            fillSeriesColor: false,
            marker : {
              show : false
            }
          },
          markers : {
            colors : this.props.lineColor[0]
          },
          xaxis: {
            type : 'datetime',
            categories: newXdata,
            labels : {
              style : {
                colors : this.props.lineColor[0]
              }
            }
          },
          yaxis: yAxixObj
        }} 
        series={seriesData}
        type="line"
        height={200} />
      );
      return (
          <div id="chart">
            {chartElement}
          </div>
      );
    }
}

export default LineChart;