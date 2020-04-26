import React , { Component } from 'react';
import Switch from "react-switch";

class SwitchToggle extends Component {
    constructor() {
      super();
      this.state = { checked: false };
    }
   
    handleChange = (checked)  => {
      this.props.onSwitchToggle(checked);
    }
   
    render() {
      return (
        <div className='switch-wrapper'>
        <div className='toggle-container'>
          <span>logarithmic</span>
          <Switch
           checked={this.props.checked}
           onChange={this.handleChange}
           onColor="#b3b300"
           onHandleColor="#f2f2f2"
           handleDiameter={11}
           uncheckedIcon={false}
           checkedIcon={false}
           boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
           activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
           height={10}
           width={25}
           className="react-switch"
           id="material-switch"
            />
        </div>
        </div>
      );
    }
  }

  export default SwitchToggle;