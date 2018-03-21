/*
 * @Author: LainCarl 
 * @Date: 2018-03-05 20:33:22 
 * @Last Modified by:   LainCarl 
 * @Last Modified time: 2018-03-05 20:33:22 
 */

import { Component } from 'react';
import { withRouter } from 'react-router';
import { inject } from 'mobx-react';

@inject('AppState')
class RouterContainer extends Component {
  render() { 
    const { AppState } = this.props;
    AppState.setHistory(this.props.history);
    AppState.setCurrentLocation(this.props.location);
    return this.props.children;
  }
}
export default withRouter(RouterContainer);
