
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
