/*
 * @Author: LainCarl 
 * @Date: 2018-03-05 20:34:58 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-03-06 16:05:18
 */

import Loadable from 'react-loadable';
import Loading from 'Loading';

export const Home = Loadable({
  loader: () => import('./Home'),
  loading: Loading,
});
export const NotFoundPage = Loadable({
  loader: () => import('./NotFoundPage'),
  loading: Loading,
});
export const Login = Loadable({
  loader: () => import('./Login'),
  loading: Loading,
});
export const ManageRoute = Loadable({
  loader: () => import('./manage/ManageRoute'),
  loading: Loading,
});
export const ExamRoute = Loadable({
  loader: () => import('./exam/ExamRoute'),
  loading: Loading,
});
export const Account = Loadable({
  loader: () => import('./account/Account'),
  loading: Loading,
});
