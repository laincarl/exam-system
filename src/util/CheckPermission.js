/*
 * @Author: LainCarl 
 * @Date: 2018-05-19 11:15:38 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-05-19 11:26:41
 * @Feature: 检查权限，返回true和false 
 */
import AppState from 'AppState';

const CheckPermission = (role = ['student']) => {
  // console.log(role);
  const { userAuth, userInfo } = AppState;
  return userAuth && role.includes(userInfo.role);
};

export default CheckPermission;
