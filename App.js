import React from 'react';
import IndexPage from './Index'
import * as ScreenOrientation from 'expo-screen-orientation';

export default function App () {
  // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  return (
    <IndexPage />
  );
}
