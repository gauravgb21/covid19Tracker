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
        { headerName: "State / UT", field: "state",pinned:'left'},
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
      <div className="ag-theme-balham-dark" style={ {height: '500px', width: '100%'} }>
        <AgGridReact
            defaultColDef={{
            sortable: true,
            width : 100
            }}
            columnDefs={this.state.columnDefs}
            rowData={this.props.rowData}
            pinnedBottomRowData={this.props.totalRow}
        />
      </div>
     </React.Fragment>
    );
  }
}

export default AgGridTable;