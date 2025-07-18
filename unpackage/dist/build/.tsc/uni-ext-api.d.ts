
interface Uni {
  startWifi: typeof import("@/uni_modules/uni-wifi")["startWifi"]
  stopWifi: typeof import("@/uni_modules/uni-wifi")["stopWifi"]
  connectWifi: typeof import("@/uni_modules/uni-wifi")["connectWifi"]
  getConnectedWifi: typeof import("@/uni_modules/uni-wifi")["getConnectedWifi"]
  getWifiList: typeof import("@/uni_modules/uni-wifi")["getWifiList"]
  onGetWifiList: typeof import("@/uni_modules/uni-wifi")["onGetWifiList"]
  offGetWifiList: typeof import("@/uni_modules/uni-wifi")["offGetWifiList"]
  onWifiConnected: typeof import("@/uni_modules/uni-wifi")["onWifiConnected"]
  offWifiConnected: typeof import("@/uni_modules/uni-wifi")["offWifiConnected"]
  onWifiConnectedWithPartialInfo: typeof import("@/uni_modules/uni-wifi")["onWifiConnectedWithPartialInfo"]
  offWifiConnectedWithPartialInfo: typeof import("@/uni_modules/uni-wifi")["offWifiConnectedWithPartialInfo"]
}
