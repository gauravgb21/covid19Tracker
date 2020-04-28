import React , { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import '../styles/ag.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';

class AgGridTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
        { headerName: "State / UT", field: "state",pinned:'left',cellStyle: {textDecoration: 'underline',color:'#3370E2',cursor:'pointer'}},
        { headerName: "Confirmed", field: "confirmed",cellStyle: {color: '#6C757D'}},
        { headerName: "Active", field: "active",cellStyle: {color: 'orange'}},
        { headerName: "Recovered", field: "recovered",cellStyle: {color: '#28a745'}},
        { headerName: "Deaths", field: "deaths",cellStyle: {color: 'red'}}
      ],
      colDefsForDist : [
        { headerName: "Districts", field: "state",pinned:'left'},
        { headerName: "Confirmed", field: "confirmed",cellStyle: {color: '#6C757D'}},
        { headerName: "Active", field: "active",cellStyle: {color: 'orange'}},
        { headerName: "Recovered", field: "recovered",cellStyle: {color: '#28a745'}},
        { headerName: "Deaths", field: "deaths",cellStyle: {color: 'red'}}
      ]
    }
  }

  render() {
    return (
      <React.Fragment>
      <div className='grid-title'>Statewise Statistics</div>
      {
        (!this.props.showDist) && (
          <div className='info-title'>*click on a particular state to get district level data</div>
        )
      }
      {
        (this.props.showDist) && (
          <div className='back-button' onClick={() => this.props.onBackNav()}><i class="lni lni-chevron-left" style={{"fontSize":'14px','marginRight':'3px','marginLeft':'2px'}}></i>back</div>
        )
      }
      <div className="ag-theme-balham-dark" style={ {height: '500px', width: '100%','margin':'auto','maxWidth':'500px'} }>
        {
          (!this.props.showDist) && (
            <AgGridReact
            defaultColDef={{
            sortable: true,
            width : 100,
            suppressMovable:true
            }}
            gridOptions={{
              onCellClicked : (data) => {
                if(data.colDef.field === 'state'){
                  this.props.onStateNameClick(data.value);
                }
              }
            }}
            columnDefs={this.state.columnDefs}
            rowData={this.props.rowData.slice(1,this.props.rowData.length)}
            pinnedBottomRowData={this.props.totalRow}
           />
          )
        }
        {
          (this.props.showDist) && (
            <AgGridReact
            defaultColDef={{
            sortable: true,
            width : 100,
            suppressMovable:true
            }}
            columnDefs={this.state.colDefsForDist}
            rowData={this.props.distData}
        />  
          )
        }
      </div>

     </React.Fragment>
    );
  }
}

export default AgGridTable;