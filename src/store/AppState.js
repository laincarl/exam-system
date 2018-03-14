/*
 * @Author: LainCarl 
 * @Date: 2018-03-05 20:34:01 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-03-14 17:07:35
 */
import { observable, action } from 'mobx';
import axios from 'Axios';

class AppState {
  @observable userAuth = false;
  @observable userName = null;
  @observable userInfo = {};
  @observable currentLocation = null;
  constructor() {
    axios.get('/api/user/info').then((userInfo) => {
      if (userInfo) {
        // console.log('origin', userInfo);
        this.setUserInfo(userInfo);
        this.setUserAuth(true);
      }
    });
  }
  @action
  setUserInfo(userInfo) {
    this.userInfo = { ...this.userInfo, ...userInfo };
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
