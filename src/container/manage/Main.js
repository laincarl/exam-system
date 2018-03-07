/*
 * @Author: LainCarl 
 * @Date: 2018-03-05 20:34:40 
 * @Last Modified by:   LainCarl 
 * @Last Modified time: 2018-03-05 20:34:40 
 */

import React, { Component } from 'react';
import { inject } from 'mobx-react';

@inject('AppState')
class Main extends Component {
  handleClick = () => {
    const { AppState } = this.props;
    AppState.setUserAuth(false);
  }
  render() {
    return (
      <div>
        <button onClick={this.handleClick}>更改</button>
        <div>manage</div>
      </div>
    );
  }
}

Main.propTypes = {

};

export default Main;
