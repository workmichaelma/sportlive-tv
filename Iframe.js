import React from 'react'
import { WebView } from 'react-native-webview';

const Iframe = ({ url, width, height }) => {
  return (
    <WebView
      style={{ width, height }}
      source={{ uri: url }}
      userAgent="macOS"
      scrollEnabled={false}
      overScrollMode="never"
      javaScriptEnabled={true}
      scalesPageToFit={true}
    />
  )
}

export default Iframe
