/**
 * @providesModule WebViewAndroid
 */
'use strict';

try {
  var React = require('react');
} catch(ex) {
  var React = require('react-native');
}

var RN = require("react-native");

var { requireNativeComponent, NativeModules } = require('react-native');
var RCTUIManager = NativeModules.UIManager;

var WEBVIEW_REF = 'androidWebView';

var WebViewAndroid = React.createClass({
  propTypes: {
    url: React.PropTypes.string,
    source: React.PropTypes.object,
    baseUrl: React.PropTypes.string,
    html: React.PropTypes.string,
    htmlCharset: React.PropTypes.string,
    userAgent: React.PropTypes.string,
    injectedJavaScript: React.PropTypes.string,
    disablePlugins: React.PropTypes.bool,
    disableCookies: React.PropTypes.bool,
    javaScriptEnabled: React.PropTypes.bool,
    geolocationEnabled: React.PropTypes.bool,
    allowUrlRedirect: React.PropTypes.bool,
    builtInZoomControls: React.PropTypes.bool,
    onNavigationStateChange: React.PropTypes.func,
    onRNLoadStart: React.PropTypes.func,
    onRNLoadEnd: React.PropTypes.func
  },
  _onNavigationStateChange: function(event) {
    if (this.props.onNavigationStateChange) {
      this.props.onNavigationStateChange(event.nativeEvent);
    }
  },
  _onLoadStart: function(event) {
    if (this.props.onRNLoadStart) {
      this.props.onRNLoadStart(event.nativeEvent);
    }
  },
  _onLoadEnd: function(event) {
    if (this.props.onRNLoadEnd) {
      this.props.onRNLoadEnd(event.nativeEvent);
    }
  },
  goBack: function() {
    RCTUIManager.dispatchViewManagerCommand(
      this._getWebViewHandle(),
      RCTUIManager.RNWebViewAndroid.Commands.goBack,
      null
    );
  },
  goForward: function() {
    RCTUIManager.dispatchViewManagerCommand(
      this._getWebViewHandle(),
      RCTUIManager.RNWebViewAndroid.Commands.goForward,
      null
    );
  },
  reload: function() {
    RCTUIManager.dispatchViewManagerCommand(
      this._getWebViewHandle(),
      RCTUIManager.RNWebViewAndroid.Commands.reload,
      null
    );
  },
  stopLoading: function() {
    RCTUIManager.dispatchViewManagerCommand(
      this._getWebViewHandle(),
      RCTUIManager.RNWebViewAndroid.Commands.stopLoading,
      null
    );
  },
  render: function() {
    return <RNWebViewAndroid
             ref={WEBVIEW_REF}
             {...this.props}
             onNavigationStateChange={this._onNavigationStateChange}
             onRNLoadStart={this._onLoadStart}
             onRNLoadEnd={this._onLoadEnd} />;
  },
  _getWebViewHandle: function() {
    return RN.findNodeHandle(this.refs[WEBVIEW_REF]);
  },
});

var RNWebViewAndroid = requireNativeComponent('RNWebViewAndroid', null);

module.exports = WebViewAndroid;
