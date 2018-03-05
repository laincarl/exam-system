/*
 * @Author: LainCarl 
 * @Date: 2018-03-05 20:34:24 
 * @Last Modified by:   LainCarl 
 * @Last Modified time: 2018-03-05 20:34:24 
 */

import React from 'react';

export default function Loading(props) {
  if (props.isLoading) {
    if (props.timedOut) {
      return <div>Loader timed out!</div>;
    } else if (props.pastDelay) {
      return <div>Loading...</div>;
    } else {
      return null;
    }
  } else if (props.error) {
    return <div>Error! Component failed to load</div>;
  } else {
    return null;
  }
}
