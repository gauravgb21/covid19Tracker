import React , { Component } from 'react';

import TotalCases from './components/TotalCases';
import LineChart from './components/LineChart';
import SwitchToggle from './components/SwitchToggle';
import AgGridTable from './components/AgGridTable';

import './styles/app.css';
import './styles/cardcontent.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      totalCasesWorld : '',
      totalActiveWorld : '',
      totalDeathWorld : '',
      totalRecoveredWorld : '',
      todayCasesWorld : '',
      todayDeathsWorld : '',
      yesActiveWorld : '',
      yesRecoveredWorld : '',
      totalCasesIndia : '',
      totalActiveIndia : '',
      totalDeathIndia : '',
      totalRecoveredIndia : '',
      todayCasesIndia : '',
      todayDeathsIndia : '',
      yesActiveIndia : '',
      yesRecoveredIndia : '',
      historyDataForWorld : {},
      historyDataForIndia : {},
      checkedForWorld : false,
      checkedForIndia : false,
      rowData : [],
      showFade : false,
      expandWorld : false,
      expandInd : false,
      districtLevelData : {},
      rowDataForDist : [],
      showDist : false,
      distCode : '',
      xDataForConfirmed : [],
      seriesForConfirmed : [],
      xDataForRecovered : [],
      seriesForRecovered : [],
      xDataForDeaths : [],
      seriesForDeaths : [],
      xDataForConfirmedInIndia : [],
      seriesForConfirmedInIndia : [],
      xDataForRecoveredInIndia : [],
      seriesForRecoveredInIndia : [],
      xDataForDeathsInIndia : [],
      seriesForDeathsInIndia : [],
      distRowData : []
    }
  }

  componentDidMount(){
    fetch('https://corona.lmao.ninja/v2/all',{
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res) => res.json())
    .then((result) => {
      this.setState({
        totalCasesWorld : result.cases,
        totalActiveWorld : result.active,
        totalDeathWorld : result.deaths,
        totalRecoveredWorld : result.recovered,
        todayCasesWorld : result.todayCases,
        todayDeathsWorld : result.todayDeaths,
        showFade : true
      });
    });
    fetch('https://corona.lmao.ninja/v2/all?yesterday=true',{
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res) => res.json())
    .then((result) => {
      this.setState({
        yesActiveWorld : result.active,
        yesRecoveredWorld : result.recovered
      });
    });

    // get indias data

    fetch('https://corona.lmao.ninja/v2/countries/India',{
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res) => res.json())
    .then((result) => {
      this.setState({
        totalCasesIndia : result.cases,
        totalActiveIndia : result.active,
        totalDeathIndia : result.deaths,
        totalRecoveredIndia : result.recovered,
        todayCasesIndia : result.todayCases,
        todayDeathsIndia : result.todayDeaths
      });
    });
    fetch('https://corona.lmao.ninja/v2/countries/India?yesterday=true',{
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res) => res.json())
    .then((result) => {
      this.setState({
        yesActiveIndia : result.active,
        yesRecoveredIndia : result.recovered
      });
    });

    //load history data

    fetch('https://corona.lmao.ninja/v2/historical/all?lastdays=all',{
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res) => res.json())
    .then((result) => {  
      let xDataForConfirmed = [];
      let seriesForConfirmed = [];

      let xDataForRecovered = [];
      let seriesForRecovered = [];

      let xDataForDeaths = [];
      let seriesForDeaths = [];
      if(Object.keys(result).length !== 0){
        Object.keys(result.cases).forEach((data) => {
          xDataForConfirmed.push(data);
          seriesForConfirmed.push(result.cases[data]);
        });
        Object.keys(result.recovered).forEach((data) => {
          xDataForRecovered.push(data);
          seriesForRecovered.push(result.recovered[data]);
        });
  
        Object.keys(result.deaths).forEach((data) => {
          xDataForDeaths.push(data);
          seriesForDeaths.push(result.deaths[data]);
        }); 
      }  
      this.setState({
        xDataForConfirmed : xDataForConfirmed,
        seriesForConfirmed : seriesForConfirmed,
        xDataForRecovered : xDataForRecovered,
        seriesForRecovered : seriesForRecovered,
        xDataForDeaths : xDataForDeaths,
        seriesForDeaths : seriesForDeaths
      });
    })
    .catch((err) => {
      console.log("error loading services")
    });

    fetch('https://corona.lmao.ninja/v2/historical/India?lastdays=all',{
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res) => res.json())
    .then((result) => {
      let xDataForConfirmedInIndia = [];
      let seriesForConfirmedInIndia = [];

      let xDataForRecoveredInIndia = [];
      let seriesForRecoveredInIndia = [];

      let xDataForDeathsInIndia = [];
      let seriesForDeathsInIndia = [];
      if(Object.keys(result).length !== 0){
        Object.keys(result.timeline.cases).forEach((data) => {
          xDataForConfirmedInIndia.push(data);
          seriesForConfirmedInIndia.push(result.timeline.cases[data]);
        });
        Object.keys(result.timeline.recovered).forEach((data) => {
          xDataForRecoveredInIndia.push(data);
          seriesForRecoveredInIndia.push(result.timeline.recovered[data]);
        });
  
        Object.keys(result.timeline.deaths).forEach((data) => {
          xDataForDeathsInIndia.push(data);
          seriesForDeathsInIndia.push(result.timeline.deaths[data]);
        }); 
      }  
      this.setState({
        xDataForConfirmedInIndia : xDataForConfirmedInIndia,
        seriesForConfirmedInIndia : seriesForConfirmedInIndia,
        xDataForRecoveredInIndia : xDataForRecoveredInIndia,
        seriesForRecoveredInIndia : seriesForRecoveredInIndia,
        xDataForDeathsInIndia : xDataForDeathsInIndia,
        seriesForDeathsInIndia : seriesForDeathsInIndia
      });
    });

    //statwise count

    fetch('https://api.covid19india.org/data.json')
    .then((res) => res.json())
    .then((result) => {
      console.log("for statewise it's ",result);
      let rowDataForStates = [];
      result.statewise.forEach((data,ind) => {
          let obj = {};
          Object.keys(data).forEach((dataVal,indVal) => {
            if(dataVal !== "lastupdatedtime" && dataVal !== "state" && dataVal !== "statecode"){
              obj[dataVal] = parseInt(data[dataVal]);
            }
            else{
              obj[dataVal] = data[dataVal];
            }
          });
          rowDataForStates.push(obj);
      });

      this.setState({
        rowData : rowDataForStates
      });
    });

    fetch('https://api.covid19india.org/state_district_wise.json')
    .then((res) => res.json())
    .then((result) => {
      console.log("district wise it's ",result);
      let arrForDist = [];
      Object.keys(result).forEach((data,ind) => {
            Object.keys(result[data]["districtData"]).forEach((distName) => {
              let rowObjForDistrict = {};
              rowObjForDistrict["state"] = distName;
              rowObjForDistrict["statecode"] = result[data]["statecode"];
              rowObjForDistrict["confirmed"] = result[data]["districtData"][distName].confirmed;
              rowObjForDistrict["active"] = result[data]["districtData"][distName].active;
              rowObjForDistrict["deaths"] = result[data]["districtData"][distName].deceased;
              rowObjForDistrict["recovered"] = result[data]["districtData"][distName].recovered;
              arrForDist.push(rowObjForDistrict);
            });
      });
      this.setState({
        rowDataForDist : arrForDist
      });
    });
    
  }

  handleSwitchToggle = (checked) => {
    this.setState({
      checkedForWorld : checked
    });
  }

  handleSwitchToggleForIndia = (checked) => {
    this.setState({
      checkedForIndia : checked
    });
  }

  toggleCard = () => {
    const flag = this.state.expandWorld;
    this.setState({
      expandWorld : !flag
    });
  }

  toggleCardInd = () => {
    const flag = this.state.expandInd;
    this.setState({
      expandInd : !flag
    });
  }

  handleStateNameClick = (stateName) => {
    if(stateName !== 'Total'){
      let stateCode = ' ';
      this.state.rowData.forEach((data) => {
        if(data.state === stateName){
          stateCode = data.statecode;
        }
      });
      let newData = this.state.rowDataForDist.filter((data) => data.statecode === stateCode);
      this.setState({
        distRowData : newData,
        showDist : true
      });
    }
  }

  handleBackNav = () => {
    this.setState({
      showDist : false
    });
  }

  render(){
    let totalRow = [];
    let  totalCases,totalActive,totalDeath,totalRecovered,deltaCases,deltaDeaths,deltaRecovered;
    if(this.state.rowData.length > 0){
      totalCases=this.state.rowData[0].confirmed;
      totalActive=this.state.rowData[0].active;
      totalDeath=this.state.rowData[0].deaths;
      totalRecovered=this.state.rowData[0].recovered;
      deltaCases=this.state.rowData[0].deltaconfirmed;
      deltaDeaths=this.state.rowData[0].deltadeaths;
      deltaRecovered=this.state.rowData[0].deltarecovered;
      totalRow.push(this.state.rowData[0]);
    }

    let stateAffected = 0 , distAffected = this.state.rowDataForDist.length;
    this.state.rowData.forEach((data) => data.confirmed !== 0 ? (data.statecode !== 'TT' ? stateAffected++ : '') : '');

    return(
      <div className='container-fluid p-0'>
        <nav className="navbar navbar-expand-lg navbar-dark mb-2" style={{'backgroundColor':'#202336'}}>
          <a className="navbar-brand" href="#">Covid19 Tracker</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#">Dashboard <span class="sr-only">(current)</span></a>
              </li>
            </ul>
          </div>
        </nav>
        <div className='row  no-gutters'>
          <div className='col-sm-12 col-md-6'>
            <div className='card mb-3'>
              <div className='card-body text-center'>
                <h6 style={{'color':'#6C757D'}}>World</h6>
                <TotalCases 
                    totalCases={this.state.totalCasesWorld}
                    totalActive={this.state.totalActiveWorld}
                    totalDeath={this.state.totalDeathWorld}
                    totalRecovered={this.state.totalRecoveredWorld}
                    deltaCases={this.state.todayCasesWorld}
                    deltaDeaths={this.state.todayDeathsWorld}
                    deltaRecovered={this.state.totalRecoveredWorld - this.state.yesRecoveredWorld}
                    className={this.state.showFade ? 'fade':''}
                    onAnimationEnd={() => this.setState({ showFade: false })}
                />
                <div className='expand-button'>
                {
                    (this.state.expandWorld) && (
                      <i onClick={() => this.toggleCard()} className="fa fa-angle-double-up" style={{"font-size":"24px"}}></i>    
                    )
                  }
                  {
                    (!this.state.expandWorld) && (
                      <i onClick={() => this.toggleCard()} className="fa fa-angle-double-down" style={{"font-size":"24px"}}></i>    
                    )
                  }
                </div>
                <div className={this.state.expandWorld ? 'expand-card' : 'collapse-card'}>
                  {
                    (this.state.expandWorld) && ( 
                      <React.Fragment>         
                      <SwitchToggle 
                      checked={this.state.checkedForWorld}
                      onSwitchToggle={(checked) => this.handleSwitchToggle(checked)}
                      />      
                      <LineChart 
                      title={'Confirmed'}
                      xData={this.state.xDataForConfirmed}
                      seriesData={this.state.seriesForConfirmed}
                      lineColor={['#6C757D']}
                      gridColor={['rgba(108,117,125,.0627451)','rgba(108,117,125,.0627451)']}
                      showLogarithmic={this.state.checkedForWorld}
                      />
                      <LineChart title={'Recovered'}
                      title={'Recovered'}
                      xData={this.state.xDataForRecovered}
                      seriesData={this.state.seriesForRecovered}
                      lineColor={['#28a745']}
                      gridColor={['rgba(40,167,69,.12549)','rgba(40,167,69,.12549)']}
                      showLogarithmic={this.state.checkedForWorld}
                      />
                      <LineChart title={'Deaths'}
                      title={'Deaths'}
                      xData={this.state.xDataForDeaths}
                      seriesData={this.state.seriesForDeaths}
                      lineColor={['#ff073a']}
                      gridColor={['rgba(255,7,58,.12549)','rgba(255,7,58,.12549)']}
                      showLogarithmic={this.state.checkedForWorld}
                      />
                      </React.Fragment>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
          <div className='col-sm-12 col-md-6'>
            <div className='card mb-2'>
            <div className='card-body text-center'>
                <h6 style={{'color':'#6C757D'}}>India</h6>
                <TotalCases 
                   totalCases={totalCases}
                   totalActive={totalActive}
                   totalDeath={totalDeath}
                   totalRecovered={totalRecovered}
                   deltaCases={deltaCases}
                   deltaDeaths={deltaDeaths}
                   deltaRecovered={deltaRecovered}
                />
                <div className='expand-button'>
                  {
                    (this.state.expandInd) && (
                      <i className="fa fa-angle-double-up" style={{"font-size":"24px"}} onClick={() => this.toggleCardInd()}></i>    
                    )
                  }
                  {
                    (!this.state.expandInd) && (
                      <i className="fa fa-angle-double-down" style={{"font-size":"24px"}} onClick={() => this.toggleCardInd()}></i>    
                    )
                  }
                </div>
                <div className={this.state.expandInd ? 'expand-card' : 'collapse-card'}>
                  {
                    (this.state.expandInd) && (
                      <React.Fragment>
                        <SwitchToggle 
                        checked={this.state.checkedForIndia}
                        onSwitchToggle={(checked) => this.handleSwitchToggleForIndia(checked)}
                        />
                        <LineChart 
                          title={'Confirmed'}
                          xData={this.state.xDataForConfirmedInIndia}
                          seriesData={this.state.seriesForConfirmedInIndia}
                          lineColor={['#6C757D']}
                          gridColor={['rgba(108,117,125,.0627451)','rgba(108,117,125,.0627451)']}
                          showLogarithmic={this.state.checkedForIndia}
                        />
                        <LineChart title={'Recovered'}
                        title={'Recovered'}
                        xData={this.state.xDataForRecoveredInIndia}
                        seriesData={this.state.seriesForRecoveredInIndia}
                        lineColor={['#28a745']}
                        gridColor={['rgba(40,167,69,.12549)','rgba(40,167,69,.12549)']}
                        showLogarithmic={this.state.checkedForIndia}
                        />
                        <LineChart title={'Deaths'}
                        title={'Deaths'}
                        xData={this.state.xDataForDeathsInIndia}
                        seriesData={this.state.seriesForDeathsInIndia}
                        lineColor={['#ff073a']}
                        gridColor={['rgba(255,7,58,.12549)','rgba(255,7,58,.12549)']}
                        showLogarithmic={this.state.checkedForIndia}
                        />
                      </React.Fragment>
                    )
                  }  
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-12 col-sm-12'>
            <div className='card mb-2' >
              <div className='ag-card'>
                <AgGridTable
                rowData={this.state.rowData}
                totalRow={totalRow}
                distData={this.state.distRowData}
                showDist={this.state.showDist}
                onBackNav={() => this.handleBackNav()}
                onStateNameClick={(stateName) => this.handleStateNameClick(stateName)}
                />
              </div>
            </div>
          </div>
          <div className='col-md-6 col-sm-12'>
            <div className='card mb-2' >
              <div className='card-body text-center'>
                <div className='affected'>States/UTs Affected</div>
                <div className='affected-val'>{stateAffected}</div>
              </div>
            </div>
          </div>
          <div className='col-md-6 col-sm-12'>
            <div className='card mb-2' >
              <div className='card-body text-center'>
                <div className='affected'>Districts Affected</div>
                <div className='affected-val'>{distAffected}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;