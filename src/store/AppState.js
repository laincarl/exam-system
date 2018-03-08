/*
 * @Author: LainCarl 
 * @Date: 2018-03-05 20:34:01 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-03-08 16:24:52
 */
import { observable, action } from 'mobx';
import axios from 'Axios';

class AppState {
  @observable userAuth = false;
  @observable userName = null;
  @observable currentLocation = null;
  constructor() {
    axios.get('/api/users/info').then((data) => {
      if (data) {
        this.setUserName(data.name);
        this.setUserAuth(true);
      }
    });
  }
  @action
  setUserName(name) {
    this.userName = name;
  }
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
