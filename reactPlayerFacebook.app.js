(global["webpackChunkelectron_app"] = global["webpackChunkelectron_app"] || []).push([["reactPlayerFacebook"],{

/***/ "./node_modules/react-player/lib/players/Facebook.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-player/lib/players/Facebook.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var Facebook_exports = {};
__export(Facebook_exports, {
  default: () => Facebook
});
module.exports = __toCommonJS(Facebook_exports);
var import_react = __toESM(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var import_utils = __webpack_require__(/*! ../utils */ "./node_modules/react-player/lib/utils.js");
var import_patterns = __webpack_require__(/*! ../patterns */ "./node_modules/react-player/lib/patterns.js");
const SDK_URL = "https://connect.facebook.net/en_US/sdk.js";
const SDK_GLOBAL = "FB";
const SDK_GLOBAL_READY = "fbAsyncInit";
const PLAYER_ID_PREFIX = "facebook-player-";
class Facebook extends import_react.Component {
  constructor() {
    super(...arguments);
    __publicField(this, "callPlayer", import_utils.callPlayer);
    __publicField(this, "playerID", this.props.config.playerId || `${PLAYER_ID_PREFIX}${(0, import_utils.randomString)()}`);
    __publicField(this, "mute", () => {
      this.callPlayer("mute");
    });
    __publicField(this, "unmute", () => {
      this.callPlayer("unmute");
    });
  }
  componentDidMount() {
    this.props.onMount && this.props.onMount(this);
  }
  load(url, isReady) {
    if (isReady) {
      (0, import_utils.getSDK)(SDK_URL, SDK_GLOBAL, SDK_GLOBAL_READY).then((FB) => FB.XFBML.parse());
      return;
    }
    (0, import_utils.getSDK)(SDK_URL, SDK_GLOBAL, SDK_GLOBAL_READY).then((FB) => {
      FB.init({
        appId: this.props.config.appId,
        xfbml: true,
        version: this.props.config.version
      });
      FB.Event.subscribe("xfbml.render", (msg) => {
        this.props.onLoaded();
      });
      FB.Event.subscribe("xfbml.ready", (msg) => {
        if (msg.type === "video" && msg.id === this.playerID) {
          this.player = msg.instance;
          this.player.subscribe("startedPlaying", this.props.onPlay);
          this.player.subscribe("paused", this.props.onPause);
          this.player.subscribe("finishedPlaying", this.props.onEnded);
          this.player.subscribe("startedBuffering", this.props.onBuffer);
          this.player.subscribe("finishedBuffering", this.props.onBufferEnd);
          this.player.subscribe("error", this.props.onError);
          if (this.props.muted) {
            this.callPlayer("mute");
          } else {
            this.callPlayer("unmute");
          }
          this.props.onReady();
          document.getElementById(this.playerID).querySelector("iframe").style.visibility = "visible";
        }
      });
    });
  }
  play() {
    this.callPlayer("play");
  }
  pause() {
    this.callPlayer("pause");
  }
  stop() {
  }
  seekTo(seconds, keepPlaying = true) {
    this.callPlayer("seek", seconds);
    if (!keepPlaying) {
      this.pause();
    }
  }
  setVolume(fraction) {
    this.callPlayer("setVolume", fraction);
  }
  getDuration() {
    return this.callPlayer("getDuration");
  }
  getCurrentTime() {
    return this.callPlayer("getCurrentPosition");
  }
  getSecondsLoaded() {
    return null;
  }
  render() {
    const { attributes } = this.props.config;
    const style = {
      width: "100%",
      height: "100%"
    };
    return /* @__PURE__ */ import_react.default.createElement(
      "div",
      {
        style,
        id: this.playerID,
        className: "fb-video",
        "data-href": this.props.url,
        "data-autoplay": this.props.playing ? "true" : "false",
        "data-allowfullscreen": "true",
        "data-controls": this.props.controls ? "true" : "false",
        ...attributes
      }
    );
  }
}
__publicField(Facebook, "displayName", "Facebook");
__publicField(Facebook, "canPlay", import_patterns.canPlay.facebook);
__publicField(Facebook, "loopOnEnded", true);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhY3RQbGF5ZXJGYWNlYm9vay5hcHAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4RUFBOEUsNkRBQTZEO0FBQzNJO0FBQ0E7QUFDQSw4QkFBOEIsa0NBQWtDO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsNEZBQTRGO0FBQ3pIO0FBQ0E7QUFDQTtBQUNBLG1HQUFtRztBQUNuRztBQUNBO0FBQ0E7QUFDQTtBQUNBLHlFQUF5RSw4QkFBOEI7QUFDdkc7QUFDQTtBQUNBLG9EQUFvRCxrQkFBa0IsYUFBYTtBQUNuRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLDJCQUEyQixtQkFBTyxDQUFDLDRDQUFPO0FBQzFDLG1CQUFtQixtQkFBTyxDQUFDLDBEQUFVO0FBQ3JDLHNCQUFzQixtQkFBTyxDQUFDLGdFQUFhO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxRUFBcUUsaUJBQWlCLEVBQUUsaUNBQWlDO0FBQ3pIO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksYUFBYTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2VsZWN0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9yZWFjdC1wbGF5ZXIvbGliL3BsYXllcnMvRmFjZWJvb2suanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fY3JlYXRlID0gT2JqZWN0LmNyZWF0ZTtcbnZhciBfX2RlZlByb3AgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG52YXIgX19nZXRPd25Qcm9wRGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG52YXIgX19nZXRPd25Qcm9wTmFtZXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcztcbnZhciBfX2dldFByb3RvT2YgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG52YXIgX19oYXNPd25Qcm9wID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBfX2RlZk5vcm1hbFByb3AgPSAob2JqLCBrZXksIHZhbHVlKSA9PiBrZXkgaW4gb2JqID8gX19kZWZQcm9wKG9iaiwga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUsIHZhbHVlIH0pIDogb2JqW2tleV0gPSB2YWx1ZTtcbnZhciBfX2V4cG9ydCA9ICh0YXJnZXQsIGFsbCkgPT4ge1xuICBmb3IgKHZhciBuYW1lIGluIGFsbClcbiAgICBfX2RlZlByb3AodGFyZ2V0LCBuYW1lLCB7IGdldDogYWxsW25hbWVdLCBlbnVtZXJhYmxlOiB0cnVlIH0pO1xufTtcbnZhciBfX2NvcHlQcm9wcyA9ICh0bywgZnJvbSwgZXhjZXB0LCBkZXNjKSA9PiB7XG4gIGlmIChmcm9tICYmIHR5cGVvZiBmcm9tID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBmcm9tID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBmb3IgKGxldCBrZXkgb2YgX19nZXRPd25Qcm9wTmFtZXMoZnJvbSkpXG4gICAgICBpZiAoIV9faGFzT3duUHJvcC5jYWxsKHRvLCBrZXkpICYmIGtleSAhPT0gZXhjZXB0KVxuICAgICAgICBfX2RlZlByb3AodG8sIGtleSwgeyBnZXQ6ICgpID0+IGZyb21ba2V5XSwgZW51bWVyYWJsZTogIShkZXNjID0gX19nZXRPd25Qcm9wRGVzYyhmcm9tLCBrZXkpKSB8fCBkZXNjLmVudW1lcmFibGUgfSk7XG4gIH1cbiAgcmV0dXJuIHRvO1xufTtcbnZhciBfX3RvRVNNID0gKG1vZCwgaXNOb2RlTW9kZSwgdGFyZ2V0KSA9PiAodGFyZ2V0ID0gbW9kICE9IG51bGwgPyBfX2NyZWF0ZShfX2dldFByb3RvT2YobW9kKSkgOiB7fSwgX19jb3B5UHJvcHMoXG4gIC8vIElmIHRoZSBpbXBvcnRlciBpcyBpbiBub2RlIGNvbXBhdGliaWxpdHkgbW9kZSBvciB0aGlzIGlzIG5vdCBhbiBFU01cbiAgLy8gZmlsZSB0aGF0IGhhcyBiZWVuIGNvbnZlcnRlZCB0byBhIENvbW1vbkpTIGZpbGUgdXNpbmcgYSBCYWJlbC1cbiAgLy8gY29tcGF0aWJsZSB0cmFuc2Zvcm0gKGkuZS4gXCJfX2VzTW9kdWxlXCIgaGFzIG5vdCBiZWVuIHNldCksIHRoZW4gc2V0XG4gIC8vIFwiZGVmYXVsdFwiIHRvIHRoZSBDb21tb25KUyBcIm1vZHVsZS5leHBvcnRzXCIgZm9yIG5vZGUgY29tcGF0aWJpbGl0eS5cbiAgaXNOb2RlTW9kZSB8fCAhbW9kIHx8ICFtb2QuX19lc01vZHVsZSA/IF9fZGVmUHJvcCh0YXJnZXQsIFwiZGVmYXVsdFwiLCB7IHZhbHVlOiBtb2QsIGVudW1lcmFibGU6IHRydWUgfSkgOiB0YXJnZXQsXG4gIG1vZFxuKSk7XG52YXIgX190b0NvbW1vbkpTID0gKG1vZCkgPT4gX19jb3B5UHJvcHMoX19kZWZQcm9wKHt9LCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KSwgbW9kKTtcbnZhciBfX3B1YmxpY0ZpZWxkID0gKG9iaiwga2V5LCB2YWx1ZSkgPT4ge1xuICBfX2RlZk5vcm1hbFByb3Aob2JqLCB0eXBlb2Yga2V5ICE9PSBcInN5bWJvbFwiID8ga2V5ICsgXCJcIiA6IGtleSwgdmFsdWUpO1xuICByZXR1cm4gdmFsdWU7XG59O1xudmFyIEZhY2Vib29rX2V4cG9ydHMgPSB7fTtcbl9fZXhwb3J0KEZhY2Vib29rX2V4cG9ydHMsIHtcbiAgZGVmYXVsdDogKCkgPT4gRmFjZWJvb2tcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBfX3RvQ29tbW9uSlMoRmFjZWJvb2tfZXhwb3J0cyk7XG52YXIgaW1wb3J0X3JlYWN0ID0gX190b0VTTShyZXF1aXJlKFwicmVhY3RcIikpO1xudmFyIGltcG9ydF91dGlscyA9IHJlcXVpcmUoXCIuLi91dGlsc1wiKTtcbnZhciBpbXBvcnRfcGF0dGVybnMgPSByZXF1aXJlKFwiLi4vcGF0dGVybnNcIik7XG5jb25zdCBTREtfVVJMID0gXCJodHRwczovL2Nvbm5lY3QuZmFjZWJvb2submV0L2VuX1VTL3Nkay5qc1wiO1xuY29uc3QgU0RLX0dMT0JBTCA9IFwiRkJcIjtcbmNvbnN0IFNES19HTE9CQUxfUkVBRFkgPSBcImZiQXN5bmNJbml0XCI7XG5jb25zdCBQTEFZRVJfSURfUFJFRklYID0gXCJmYWNlYm9vay1wbGF5ZXItXCI7XG5jbGFzcyBGYWNlYm9vayBleHRlbmRzIGltcG9ydF9yZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgIF9fcHVibGljRmllbGQodGhpcywgXCJjYWxsUGxheWVyXCIsIGltcG9ydF91dGlscy5jYWxsUGxheWVyKTtcbiAgICBfX3B1YmxpY0ZpZWxkKHRoaXMsIFwicGxheWVySURcIiwgdGhpcy5wcm9wcy5jb25maWcucGxheWVySWQgfHwgYCR7UExBWUVSX0lEX1BSRUZJWH0keygwLCBpbXBvcnRfdXRpbHMucmFuZG9tU3RyaW5nKSgpfWApO1xuICAgIF9fcHVibGljRmllbGQodGhpcywgXCJtdXRlXCIsICgpID0+IHtcbiAgICAgIHRoaXMuY2FsbFBsYXllcihcIm11dGVcIik7XG4gICAgfSk7XG4gICAgX19wdWJsaWNGaWVsZCh0aGlzLCBcInVubXV0ZVwiLCAoKSA9PiB7XG4gICAgICB0aGlzLmNhbGxQbGF5ZXIoXCJ1bm11dGVcIik7XG4gICAgfSk7XG4gIH1cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5wcm9wcy5vbk1vdW50ICYmIHRoaXMucHJvcHMub25Nb3VudCh0aGlzKTtcbiAgfVxuICBsb2FkKHVybCwgaXNSZWFkeSkge1xuICAgIGlmIChpc1JlYWR5KSB7XG4gICAgICAoMCwgaW1wb3J0X3V0aWxzLmdldFNESykoU0RLX1VSTCwgU0RLX0dMT0JBTCwgU0RLX0dMT0JBTF9SRUFEWSkudGhlbigoRkIpID0+IEZCLlhGQk1MLnBhcnNlKCkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAoMCwgaW1wb3J0X3V0aWxzLmdldFNESykoU0RLX1VSTCwgU0RLX0dMT0JBTCwgU0RLX0dMT0JBTF9SRUFEWSkudGhlbigoRkIpID0+IHtcbiAgICAgIEZCLmluaXQoe1xuICAgICAgICBhcHBJZDogdGhpcy5wcm9wcy5jb25maWcuYXBwSWQsXG4gICAgICAgIHhmYm1sOiB0cnVlLFxuICAgICAgICB2ZXJzaW9uOiB0aGlzLnByb3BzLmNvbmZpZy52ZXJzaW9uXG4gICAgICB9KTtcbiAgICAgIEZCLkV2ZW50LnN1YnNjcmliZShcInhmYm1sLnJlbmRlclwiLCAobXNnKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMub25Mb2FkZWQoKTtcbiAgICAgIH0pO1xuICAgICAgRkIuRXZlbnQuc3Vic2NyaWJlKFwieGZibWwucmVhZHlcIiwgKG1zZykgPT4ge1xuICAgICAgICBpZiAobXNnLnR5cGUgPT09IFwidmlkZW9cIiAmJiBtc2cuaWQgPT09IHRoaXMucGxheWVySUQpIHtcbiAgICAgICAgICB0aGlzLnBsYXllciA9IG1zZy5pbnN0YW5jZTtcbiAgICAgICAgICB0aGlzLnBsYXllci5zdWJzY3JpYmUoXCJzdGFydGVkUGxheWluZ1wiLCB0aGlzLnByb3BzLm9uUGxheSk7XG4gICAgICAgICAgdGhpcy5wbGF5ZXIuc3Vic2NyaWJlKFwicGF1c2VkXCIsIHRoaXMucHJvcHMub25QYXVzZSk7XG4gICAgICAgICAgdGhpcy5wbGF5ZXIuc3Vic2NyaWJlKFwiZmluaXNoZWRQbGF5aW5nXCIsIHRoaXMucHJvcHMub25FbmRlZCk7XG4gICAgICAgICAgdGhpcy5wbGF5ZXIuc3Vic2NyaWJlKFwic3RhcnRlZEJ1ZmZlcmluZ1wiLCB0aGlzLnByb3BzLm9uQnVmZmVyKTtcbiAgICAgICAgICB0aGlzLnBsYXllci5zdWJzY3JpYmUoXCJmaW5pc2hlZEJ1ZmZlcmluZ1wiLCB0aGlzLnByb3BzLm9uQnVmZmVyRW5kKTtcbiAgICAgICAgICB0aGlzLnBsYXllci5zdWJzY3JpYmUoXCJlcnJvclwiLCB0aGlzLnByb3BzLm9uRXJyb3IpO1xuICAgICAgICAgIGlmICh0aGlzLnByb3BzLm11dGVkKSB7XG4gICAgICAgICAgICB0aGlzLmNhbGxQbGF5ZXIoXCJtdXRlXCIpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNhbGxQbGF5ZXIoXCJ1bm11dGVcIik7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMucHJvcHMub25SZWFkeSgpO1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMucGxheWVySUQpLnF1ZXJ5U2VsZWN0b3IoXCJpZnJhbWVcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICBwbGF5KCkge1xuICAgIHRoaXMuY2FsbFBsYXllcihcInBsYXlcIik7XG4gIH1cbiAgcGF1c2UoKSB7XG4gICAgdGhpcy5jYWxsUGxheWVyKFwicGF1c2VcIik7XG4gIH1cbiAgc3RvcCgpIHtcbiAgfVxuICBzZWVrVG8oc2Vjb25kcywga2VlcFBsYXlpbmcgPSB0cnVlKSB7XG4gICAgdGhpcy5jYWxsUGxheWVyKFwic2Vla1wiLCBzZWNvbmRzKTtcbiAgICBpZiAoIWtlZXBQbGF5aW5nKSB7XG4gICAgICB0aGlzLnBhdXNlKCk7XG4gICAgfVxuICB9XG4gIHNldFZvbHVtZShmcmFjdGlvbikge1xuICAgIHRoaXMuY2FsbFBsYXllcihcInNldFZvbHVtZVwiLCBmcmFjdGlvbik7XG4gIH1cbiAgZ2V0RHVyYXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuY2FsbFBsYXllcihcImdldER1cmF0aW9uXCIpO1xuICB9XG4gIGdldEN1cnJlbnRUaW1lKCkge1xuICAgIHJldHVybiB0aGlzLmNhbGxQbGF5ZXIoXCJnZXRDdXJyZW50UG9zaXRpb25cIik7XG4gIH1cbiAgZ2V0U2Vjb25kc0xvYWRlZCgpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBhdHRyaWJ1dGVzIH0gPSB0aGlzLnByb3BzLmNvbmZpZztcbiAgICBjb25zdCBzdHlsZSA9IHtcbiAgICAgIHdpZHRoOiBcIjEwMCVcIixcbiAgICAgIGhlaWdodDogXCIxMDAlXCJcbiAgICB9O1xuICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8gaW1wb3J0X3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgIFwiZGl2XCIsXG4gICAgICB7XG4gICAgICAgIHN0eWxlLFxuICAgICAgICBpZDogdGhpcy5wbGF5ZXJJRCxcbiAgICAgICAgY2xhc3NOYW1lOiBcImZiLXZpZGVvXCIsXG4gICAgICAgIFwiZGF0YS1ocmVmXCI6IHRoaXMucHJvcHMudXJsLFxuICAgICAgICBcImRhdGEtYXV0b3BsYXlcIjogdGhpcy5wcm9wcy5wbGF5aW5nID8gXCJ0cnVlXCIgOiBcImZhbHNlXCIsXG4gICAgICAgIFwiZGF0YS1hbGxvd2Z1bGxzY3JlZW5cIjogXCJ0cnVlXCIsXG4gICAgICAgIFwiZGF0YS1jb250cm9sc1wiOiB0aGlzLnByb3BzLmNvbnRyb2xzID8gXCJ0cnVlXCIgOiBcImZhbHNlXCIsXG4gICAgICAgIC4uLmF0dHJpYnV0ZXNcbiAgICAgIH1cbiAgICApO1xuICB9XG59XG5fX3B1YmxpY0ZpZWxkKEZhY2Vib29rLCBcImRpc3BsYXlOYW1lXCIsIFwiRmFjZWJvb2tcIik7XG5fX3B1YmxpY0ZpZWxkKEZhY2Vib29rLCBcImNhblBsYXlcIiwgaW1wb3J0X3BhdHRlcm5zLmNhblBsYXkuZmFjZWJvb2spO1xuX19wdWJsaWNGaWVsZChGYWNlYm9vaywgXCJsb29wT25FbmRlZFwiLCB0cnVlKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==