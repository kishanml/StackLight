(global["webpackChunkelectron_app"] = global["webpackChunkelectron_app"] || []).push([["reactPlayerWistia"],{

/***/ "./node_modules/react-player/lib/players/Wistia.js":
/*!*********************************************************!*\
  !*** ./node_modules/react-player/lib/players/Wistia.js ***!
  \*********************************************************/
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
var Wistia_exports = {};
__export(Wistia_exports, {
  default: () => Wistia
});
module.exports = __toCommonJS(Wistia_exports);
var import_react = __toESM(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var import_utils = __webpack_require__(/*! ../utils */ "./node_modules/react-player/lib/utils.js");
var import_patterns = __webpack_require__(/*! ../patterns */ "./node_modules/react-player/lib/patterns.js");
const SDK_URL = "https://fast.wistia.com/assets/external/E-v1.js";
const SDK_GLOBAL = "Wistia";
const PLAYER_ID_PREFIX = "wistia-player-";
class Wistia extends import_react.Component {
  constructor() {
    super(...arguments);
    __publicField(this, "callPlayer", import_utils.callPlayer);
    __publicField(this, "playerID", this.props.config.playerId || `${PLAYER_ID_PREFIX}${(0, import_utils.randomString)()}`);
    // Proxy methods to prevent listener leaks
    __publicField(this, "onPlay", (...args) => this.props.onPlay(...args));
    __publicField(this, "onPause", (...args) => this.props.onPause(...args));
    __publicField(this, "onSeek", (...args) => this.props.onSeek(...args));
    __publicField(this, "onEnded", (...args) => this.props.onEnded(...args));
    __publicField(this, "onPlaybackRateChange", (...args) => this.props.onPlaybackRateChange(...args));
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
  load(url) {
    const { playing, muted, controls, onReady, config, onError } = this.props;
    (0, import_utils.getSDK)(SDK_URL, SDK_GLOBAL).then((Wistia2) => {
      if (config.customControls) {
        config.customControls.forEach((control) => Wistia2.defineControl(control));
      }
      window._wq = window._wq || [];
      window._wq.push({
        id: this.playerID,
        options: {
          autoPlay: playing,
          silentAutoPlay: "allow",
          muted,
          controlsVisibleOnLoad: controls,
          fullscreenButton: controls,
          playbar: controls,
          playbackRateControl: controls,
          qualityControl: controls,
          volumeControl: controls,
          settingsControl: controls,
          smallPlayButton: controls,
          ...config.options
        },
        onReady: (player) => {
          this.player = player;
          this.unbind();
          this.player.bind("play", this.onPlay);
          this.player.bind("pause", this.onPause);
          this.player.bind("seek", this.onSeek);
          this.player.bind("end", this.onEnded);
          this.player.bind("playbackratechange", this.onPlaybackRateChange);
          onReady();
        }
      });
    }, onError);
  }
  unbind() {
    this.player.unbind("play", this.onPlay);
    this.player.unbind("pause", this.onPause);
    this.player.unbind("seek", this.onSeek);
    this.player.unbind("end", this.onEnded);
    this.player.unbind("playbackratechange", this.onPlaybackRateChange);
  }
  play() {
    this.callPlayer("play");
  }
  pause() {
    this.callPlayer("pause");
  }
  stop() {
    this.unbind();
    this.callPlayer("remove");
  }
  seekTo(seconds, keepPlaying = true) {
    this.callPlayer("time", seconds);
    if (!keepPlaying) {
      this.pause();
    }
  }
  setVolume(fraction) {
    this.callPlayer("volume", fraction);
  }
  setPlaybackRate(rate) {
    this.callPlayer("playbackRate", rate);
  }
  getDuration() {
    return this.callPlayer("duration");
  }
  getCurrentTime() {
    return this.callPlayer("time");
  }
  getSecondsLoaded() {
    return null;
  }
  render() {
    const { url } = this.props;
    const videoID = url && url.match(import_patterns.MATCH_URL_WISTIA)[1];
    const className = `wistia_embed wistia_async_${videoID}`;
    const style = {
      width: "100%",
      height: "100%"
    };
    return /* @__PURE__ */ import_react.default.createElement("div", { id: this.playerID, key: videoID, className, style });
  }
}
__publicField(Wistia, "displayName", "Wistia");
__publicField(Wistia, "canPlay", import_patterns.canPlay.wistia);
__publicField(Wistia, "loopOnEnded", true);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhY3RQbGF5ZXJXaXN0aWEuYXBwLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEVBQThFLDZEQUE2RDtBQUMzSTtBQUNBO0FBQ0EsOEJBQThCLGtDQUFrQztBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLDRGQUE0RjtBQUN6SDtBQUNBO0FBQ0E7QUFDQSxtR0FBbUc7QUFDbkc7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5RUFBeUUsOEJBQThCO0FBQ3ZHO0FBQ0E7QUFDQSxvREFBb0Qsa0JBQWtCLGFBQWE7QUFDbkY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSwyQkFBMkIsbUJBQU8sQ0FBQyw0Q0FBTztBQUMxQyxtQkFBbUIsbUJBQU8sQ0FBQywwREFBVTtBQUNyQyxzQkFBc0IsbUJBQU8sQ0FBQyxnRUFBYTtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFFQUFxRSxpQkFBaUIsRUFBRSxpQ0FBaUM7QUFDekg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLHFEQUFxRDtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksTUFBTTtBQUNsQjtBQUNBLG1EQUFtRCxRQUFRO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUVBQXVFLG1EQUFtRDtBQUMxSDtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZWxlY3Ryb24tYXBwLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXBsYXllci9saWIvcGxheWVycy9XaXN0aWEuanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fY3JlYXRlID0gT2JqZWN0LmNyZWF0ZTtcbnZhciBfX2RlZlByb3AgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG52YXIgX19nZXRPd25Qcm9wRGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG52YXIgX19nZXRPd25Qcm9wTmFtZXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcztcbnZhciBfX2dldFByb3RvT2YgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG52YXIgX19oYXNPd25Qcm9wID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBfX2RlZk5vcm1hbFByb3AgPSAob2JqLCBrZXksIHZhbHVlKSA9PiBrZXkgaW4gb2JqID8gX19kZWZQcm9wKG9iaiwga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUsIHZhbHVlIH0pIDogb2JqW2tleV0gPSB2YWx1ZTtcbnZhciBfX2V4cG9ydCA9ICh0YXJnZXQsIGFsbCkgPT4ge1xuICBmb3IgKHZhciBuYW1lIGluIGFsbClcbiAgICBfX2RlZlByb3AodGFyZ2V0LCBuYW1lLCB7IGdldDogYWxsW25hbWVdLCBlbnVtZXJhYmxlOiB0cnVlIH0pO1xufTtcbnZhciBfX2NvcHlQcm9wcyA9ICh0bywgZnJvbSwgZXhjZXB0LCBkZXNjKSA9PiB7XG4gIGlmIChmcm9tICYmIHR5cGVvZiBmcm9tID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBmcm9tID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBmb3IgKGxldCBrZXkgb2YgX19nZXRPd25Qcm9wTmFtZXMoZnJvbSkpXG4gICAgICBpZiAoIV9faGFzT3duUHJvcC5jYWxsKHRvLCBrZXkpICYmIGtleSAhPT0gZXhjZXB0KVxuICAgICAgICBfX2RlZlByb3AodG8sIGtleSwgeyBnZXQ6ICgpID0+IGZyb21ba2V5XSwgZW51bWVyYWJsZTogIShkZXNjID0gX19nZXRPd25Qcm9wRGVzYyhmcm9tLCBrZXkpKSB8fCBkZXNjLmVudW1lcmFibGUgfSk7XG4gIH1cbiAgcmV0dXJuIHRvO1xufTtcbnZhciBfX3RvRVNNID0gKG1vZCwgaXNOb2RlTW9kZSwgdGFyZ2V0KSA9PiAodGFyZ2V0ID0gbW9kICE9IG51bGwgPyBfX2NyZWF0ZShfX2dldFByb3RvT2YobW9kKSkgOiB7fSwgX19jb3B5UHJvcHMoXG4gIC8vIElmIHRoZSBpbXBvcnRlciBpcyBpbiBub2RlIGNvbXBhdGliaWxpdHkgbW9kZSBvciB0aGlzIGlzIG5vdCBhbiBFU01cbiAgLy8gZmlsZSB0aGF0IGhhcyBiZWVuIGNvbnZlcnRlZCB0byBhIENvbW1vbkpTIGZpbGUgdXNpbmcgYSBCYWJlbC1cbiAgLy8gY29tcGF0aWJsZSB0cmFuc2Zvcm0gKGkuZS4gXCJfX2VzTW9kdWxlXCIgaGFzIG5vdCBiZWVuIHNldCksIHRoZW4gc2V0XG4gIC8vIFwiZGVmYXVsdFwiIHRvIHRoZSBDb21tb25KUyBcIm1vZHVsZS5leHBvcnRzXCIgZm9yIG5vZGUgY29tcGF0aWJpbGl0eS5cbiAgaXNOb2RlTW9kZSB8fCAhbW9kIHx8ICFtb2QuX19lc01vZHVsZSA/IF9fZGVmUHJvcCh0YXJnZXQsIFwiZGVmYXVsdFwiLCB7IHZhbHVlOiBtb2QsIGVudW1lcmFibGU6IHRydWUgfSkgOiB0YXJnZXQsXG4gIG1vZFxuKSk7XG52YXIgX190b0NvbW1vbkpTID0gKG1vZCkgPT4gX19jb3B5UHJvcHMoX19kZWZQcm9wKHt9LCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KSwgbW9kKTtcbnZhciBfX3B1YmxpY0ZpZWxkID0gKG9iaiwga2V5LCB2YWx1ZSkgPT4ge1xuICBfX2RlZk5vcm1hbFByb3Aob2JqLCB0eXBlb2Yga2V5ICE9PSBcInN5bWJvbFwiID8ga2V5ICsgXCJcIiA6IGtleSwgdmFsdWUpO1xuICByZXR1cm4gdmFsdWU7XG59O1xudmFyIFdpc3RpYV9leHBvcnRzID0ge307XG5fX2V4cG9ydChXaXN0aWFfZXhwb3J0cywge1xuICBkZWZhdWx0OiAoKSA9PiBXaXN0aWFcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBfX3RvQ29tbW9uSlMoV2lzdGlhX2V4cG9ydHMpO1xudmFyIGltcG9ydF9yZWFjdCA9IF9fdG9FU00ocmVxdWlyZShcInJlYWN0XCIpKTtcbnZhciBpbXBvcnRfdXRpbHMgPSByZXF1aXJlKFwiLi4vdXRpbHNcIik7XG52YXIgaW1wb3J0X3BhdHRlcm5zID0gcmVxdWlyZShcIi4uL3BhdHRlcm5zXCIpO1xuY29uc3QgU0RLX1VSTCA9IFwiaHR0cHM6Ly9mYXN0Lndpc3RpYS5jb20vYXNzZXRzL2V4dGVybmFsL0UtdjEuanNcIjtcbmNvbnN0IFNES19HTE9CQUwgPSBcIldpc3RpYVwiO1xuY29uc3QgUExBWUVSX0lEX1BSRUZJWCA9IFwid2lzdGlhLXBsYXllci1cIjtcbmNsYXNzIFdpc3RpYSBleHRlbmRzIGltcG9ydF9yZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgIF9fcHVibGljRmllbGQodGhpcywgXCJjYWxsUGxheWVyXCIsIGltcG9ydF91dGlscy5jYWxsUGxheWVyKTtcbiAgICBfX3B1YmxpY0ZpZWxkKHRoaXMsIFwicGxheWVySURcIiwgdGhpcy5wcm9wcy5jb25maWcucGxheWVySWQgfHwgYCR7UExBWUVSX0lEX1BSRUZJWH0keygwLCBpbXBvcnRfdXRpbHMucmFuZG9tU3RyaW5nKSgpfWApO1xuICAgIC8vIFByb3h5IG1ldGhvZHMgdG8gcHJldmVudCBsaXN0ZW5lciBsZWFrc1xuICAgIF9fcHVibGljRmllbGQodGhpcywgXCJvblBsYXlcIiwgKC4uLmFyZ3MpID0+IHRoaXMucHJvcHMub25QbGF5KC4uLmFyZ3MpKTtcbiAgICBfX3B1YmxpY0ZpZWxkKHRoaXMsIFwib25QYXVzZVwiLCAoLi4uYXJncykgPT4gdGhpcy5wcm9wcy5vblBhdXNlKC4uLmFyZ3MpKTtcbiAgICBfX3B1YmxpY0ZpZWxkKHRoaXMsIFwib25TZWVrXCIsICguLi5hcmdzKSA9PiB0aGlzLnByb3BzLm9uU2VlayguLi5hcmdzKSk7XG4gICAgX19wdWJsaWNGaWVsZCh0aGlzLCBcIm9uRW5kZWRcIiwgKC4uLmFyZ3MpID0+IHRoaXMucHJvcHMub25FbmRlZCguLi5hcmdzKSk7XG4gICAgX19wdWJsaWNGaWVsZCh0aGlzLCBcIm9uUGxheWJhY2tSYXRlQ2hhbmdlXCIsICguLi5hcmdzKSA9PiB0aGlzLnByb3BzLm9uUGxheWJhY2tSYXRlQ2hhbmdlKC4uLmFyZ3MpKTtcbiAgICBfX3B1YmxpY0ZpZWxkKHRoaXMsIFwibXV0ZVwiLCAoKSA9PiB7XG4gICAgICB0aGlzLmNhbGxQbGF5ZXIoXCJtdXRlXCIpO1xuICAgIH0pO1xuICAgIF9fcHVibGljRmllbGQodGhpcywgXCJ1bm11dGVcIiwgKCkgPT4ge1xuICAgICAgdGhpcy5jYWxsUGxheWVyKFwidW5tdXRlXCIpO1xuICAgIH0pO1xuICB9XG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMucHJvcHMub25Nb3VudCAmJiB0aGlzLnByb3BzLm9uTW91bnQodGhpcyk7XG4gIH1cbiAgbG9hZCh1cmwpIHtcbiAgICBjb25zdCB7IHBsYXlpbmcsIG11dGVkLCBjb250cm9scywgb25SZWFkeSwgY29uZmlnLCBvbkVycm9yIH0gPSB0aGlzLnByb3BzO1xuICAgICgwLCBpbXBvcnRfdXRpbHMuZ2V0U0RLKShTREtfVVJMLCBTREtfR0xPQkFMKS50aGVuKChXaXN0aWEyKSA9PiB7XG4gICAgICBpZiAoY29uZmlnLmN1c3RvbUNvbnRyb2xzKSB7XG4gICAgICAgIGNvbmZpZy5jdXN0b21Db250cm9scy5mb3JFYWNoKChjb250cm9sKSA9PiBXaXN0aWEyLmRlZmluZUNvbnRyb2woY29udHJvbCkpO1xuICAgICAgfVxuICAgICAgd2luZG93Ll93cSA9IHdpbmRvdy5fd3EgfHwgW107XG4gICAgICB3aW5kb3cuX3dxLnB1c2goe1xuICAgICAgICBpZDogdGhpcy5wbGF5ZXJJRCxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIGF1dG9QbGF5OiBwbGF5aW5nLFxuICAgICAgICAgIHNpbGVudEF1dG9QbGF5OiBcImFsbG93XCIsXG4gICAgICAgICAgbXV0ZWQsXG4gICAgICAgICAgY29udHJvbHNWaXNpYmxlT25Mb2FkOiBjb250cm9scyxcbiAgICAgICAgICBmdWxsc2NyZWVuQnV0dG9uOiBjb250cm9scyxcbiAgICAgICAgICBwbGF5YmFyOiBjb250cm9scyxcbiAgICAgICAgICBwbGF5YmFja1JhdGVDb250cm9sOiBjb250cm9scyxcbiAgICAgICAgICBxdWFsaXR5Q29udHJvbDogY29udHJvbHMsXG4gICAgICAgICAgdm9sdW1lQ29udHJvbDogY29udHJvbHMsXG4gICAgICAgICAgc2V0dGluZ3NDb250cm9sOiBjb250cm9scyxcbiAgICAgICAgICBzbWFsbFBsYXlCdXR0b246IGNvbnRyb2xzLFxuICAgICAgICAgIC4uLmNvbmZpZy5vcHRpb25zXG4gICAgICAgIH0sXG4gICAgICAgIG9uUmVhZHk6IChwbGF5ZXIpID0+IHtcbiAgICAgICAgICB0aGlzLnBsYXllciA9IHBsYXllcjtcbiAgICAgICAgICB0aGlzLnVuYmluZCgpO1xuICAgICAgICAgIHRoaXMucGxheWVyLmJpbmQoXCJwbGF5XCIsIHRoaXMub25QbGF5KTtcbiAgICAgICAgICB0aGlzLnBsYXllci5iaW5kKFwicGF1c2VcIiwgdGhpcy5vblBhdXNlKTtcbiAgICAgICAgICB0aGlzLnBsYXllci5iaW5kKFwic2Vla1wiLCB0aGlzLm9uU2Vlayk7XG4gICAgICAgICAgdGhpcy5wbGF5ZXIuYmluZChcImVuZFwiLCB0aGlzLm9uRW5kZWQpO1xuICAgICAgICAgIHRoaXMucGxheWVyLmJpbmQoXCJwbGF5YmFja3JhdGVjaGFuZ2VcIiwgdGhpcy5vblBsYXliYWNrUmF0ZUNoYW5nZSk7XG4gICAgICAgICAgb25SZWFkeSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LCBvbkVycm9yKTtcbiAgfVxuICB1bmJpbmQoKSB7XG4gICAgdGhpcy5wbGF5ZXIudW5iaW5kKFwicGxheVwiLCB0aGlzLm9uUGxheSk7XG4gICAgdGhpcy5wbGF5ZXIudW5iaW5kKFwicGF1c2VcIiwgdGhpcy5vblBhdXNlKTtcbiAgICB0aGlzLnBsYXllci51bmJpbmQoXCJzZWVrXCIsIHRoaXMub25TZWVrKTtcbiAgICB0aGlzLnBsYXllci51bmJpbmQoXCJlbmRcIiwgdGhpcy5vbkVuZGVkKTtcbiAgICB0aGlzLnBsYXllci51bmJpbmQoXCJwbGF5YmFja3JhdGVjaGFuZ2VcIiwgdGhpcy5vblBsYXliYWNrUmF0ZUNoYW5nZSk7XG4gIH1cbiAgcGxheSgpIHtcbiAgICB0aGlzLmNhbGxQbGF5ZXIoXCJwbGF5XCIpO1xuICB9XG4gIHBhdXNlKCkge1xuICAgIHRoaXMuY2FsbFBsYXllcihcInBhdXNlXCIpO1xuICB9XG4gIHN0b3AoKSB7XG4gICAgdGhpcy51bmJpbmQoKTtcbiAgICB0aGlzLmNhbGxQbGF5ZXIoXCJyZW1vdmVcIik7XG4gIH1cbiAgc2Vla1RvKHNlY29uZHMsIGtlZXBQbGF5aW5nID0gdHJ1ZSkge1xuICAgIHRoaXMuY2FsbFBsYXllcihcInRpbWVcIiwgc2Vjb25kcyk7XG4gICAgaWYgKCFrZWVwUGxheWluZykge1xuICAgICAgdGhpcy5wYXVzZSgpO1xuICAgIH1cbiAgfVxuICBzZXRWb2x1bWUoZnJhY3Rpb24pIHtcbiAgICB0aGlzLmNhbGxQbGF5ZXIoXCJ2b2x1bWVcIiwgZnJhY3Rpb24pO1xuICB9XG4gIHNldFBsYXliYWNrUmF0ZShyYXRlKSB7XG4gICAgdGhpcy5jYWxsUGxheWVyKFwicGxheWJhY2tSYXRlXCIsIHJhdGUpO1xuICB9XG4gIGdldER1cmF0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmNhbGxQbGF5ZXIoXCJkdXJhdGlvblwiKTtcbiAgfVxuICBnZXRDdXJyZW50VGltZSgpIHtcbiAgICByZXR1cm4gdGhpcy5jYWxsUGxheWVyKFwidGltZVwiKTtcbiAgfVxuICBnZXRTZWNvbmRzTG9hZGVkKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHVybCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB2aWRlb0lEID0gdXJsICYmIHVybC5tYXRjaChpbXBvcnRfcGF0dGVybnMuTUFUQ0hfVVJMX1dJU1RJQSlbMV07XG4gICAgY29uc3QgY2xhc3NOYW1lID0gYHdpc3RpYV9lbWJlZCB3aXN0aWFfYXN5bmNfJHt2aWRlb0lEfWA7XG4gICAgY29uc3Qgc3R5bGUgPSB7XG4gICAgICB3aWR0aDogXCIxMDAlXCIsXG4gICAgICBoZWlnaHQ6IFwiMTAwJVwiXG4gICAgfTtcbiAgICByZXR1cm4gLyogQF9fUFVSRV9fICovIGltcG9ydF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBpZDogdGhpcy5wbGF5ZXJJRCwga2V5OiB2aWRlb0lELCBjbGFzc05hbWUsIHN0eWxlIH0pO1xuICB9XG59XG5fX3B1YmxpY0ZpZWxkKFdpc3RpYSwgXCJkaXNwbGF5TmFtZVwiLCBcIldpc3RpYVwiKTtcbl9fcHVibGljRmllbGQoV2lzdGlhLCBcImNhblBsYXlcIiwgaW1wb3J0X3BhdHRlcm5zLmNhblBsYXkud2lzdGlhKTtcbl9fcHVibGljRmllbGQoV2lzdGlhLCBcImxvb3BPbkVuZGVkXCIsIHRydWUpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9