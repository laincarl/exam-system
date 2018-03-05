/*
 * @Author: LainCarl 
 * @Date: 2018-03-05 20:34:01 
 * @Last Modified by:   LainCarl 
 * @Last Modified time: 2018-03-05 20:34:01 
 */
import { observable, action } from 'mobx';

class AppState {
  @observable userAuth = true;
  @observable currentLocation = null;

  @action
  setUserAuth(flag) {
    this.userAuth = flag;
  }
  @action
  setCurrentLocation(currentLocation) {
    this.currentLocation = currentLocation;
  }
}
const appState = new AppState();
export default appState;
