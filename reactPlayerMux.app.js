(global["webpackChunkelectron_app"] = global["webpackChunkelectron_app"] || []).push([["reactPlayerMux"],{

/***/ "./node_modules/react-player/lib/players/Mux.js":
/*!******************************************************!*\
  !*** ./node_modules/react-player/lib/players/Mux.js ***!
  \******************************************************/
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
var Mux_exports = {};
__export(Mux_exports, {
  default: () => Mux
});
module.exports = __toCommonJS(Mux_exports);
var import_react = __toESM(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var import_patterns = __webpack_require__(/*! ../patterns */ "./node_modules/react-player/lib/patterns.js");
const SDK_URL = "https://cdn.jsdelivr.net/npm/@mux/mux-player@VERSION/dist/mux-player.mjs";
class Mux extends import_react.Component {
  constructor() {
    super(...arguments);
    // Proxy methods to prevent listener leaks
    __publicField(this, "onReady", (...args) => this.props.onReady(...args));
    __publicField(this, "onPlay", (...args) => this.props.onPlay(...args));
    __publicField(this, "onBuffer", (...args) => this.props.onBuffer(...args));
    __publicField(this, "onBufferEnd", (...args) => this.props.onBufferEnd(...args));
    __publicField(this, "onPause", (...args) => this.props.onPause(...args));
    __publicField(this, "onEnded", (...args) => this.props.onEnded(...args));
    __publicField(this, "onError", (...args) => this.props.onError(...args));
    __publicField(this, "onPlayBackRateChange", (event) => this.props.onPlaybackRateChange(event.target.playbackRate));
    __publicField(this, "onEnablePIP", (...args) => this.props.onEnablePIP(...args));
    __publicField(this, "onSeek", (e) => {
      this.props.onSeek(e.target.currentTime);
    });
    __publicField(this, "onDurationChange", () => {
      const duration = this.getDuration();
      this.props.onDuration(duration);
    });
    __publicField(this, "mute", () => {
      this.player.muted = true;
    });
    __publicField(this, "unmute", () => {
      this.player.muted = false;
    });
    __publicField(this, "ref", (player) => {
      this.player = player;
    });
  }
  componentDidMount() {
    this.props.onMount && this.props.onMount(this);
    this.addListeners(this.player);
    const playbackId = this.getPlaybackId(this.props.url);
    if (playbackId) {
      this.player.playbackId = playbackId;
    }
  }
  componentWillUnmount() {
    this.player.playbackId = null;
    this.removeListeners(this.player);
  }
  addListeners(player) {
    const { playsinline } = this.props;
    player.addEventListener("play", this.onPlay);
    player.addEventListener("waiting", this.onBuffer);
    player.addEventListener("playing", this.onBufferEnd);
    player.addEventListener("pause", this.onPause);
    player.addEventListener("seeked", this.onSeek);
    player.addEventListener("ended", this.onEnded);
    player.addEventListener("error", this.onError);
    player.addEventListener("ratechange", this.onPlayBackRateChange);
    player.addEventListener("enterpictureinpicture", this.onEnablePIP);
    player.addEventListener("leavepictureinpicture", this.onDisablePIP);
    player.addEventListener("webkitpresentationmodechanged", this.onPresentationModeChange);
    player.addEventListener("canplay", this.onReady);
    if (playsinline) {
      player.setAttribute("playsinline", "");
    }
  }
  removeListeners(player) {
    player.removeEventListener("canplay", this.onReady);
    player.removeEventListener("play", this.onPlay);
    player.removeEventListener("waiting", this.onBuffer);
    player.removeEventListener("playing", this.onBufferEnd);
    player.removeEventListener("pause", this.onPause);
    player.removeEventListener("seeked", this.onSeek);
    player.removeEventListener("ended", this.onEnded);
    player.removeEventListener("error", this.onError);
    player.removeEventListener("ratechange", this.onPlayBackRateChange);
    player.removeEventListener("enterpictureinpicture", this.onEnablePIP);
    player.removeEventListener("leavepictureinpicture", this.onDisablePIP);
    player.removeEventListener("canplay", this.onReady);
  }
  async load(url) {
    var _a;
    const { onError, config } = this.props;
    if (!((_a = globalThis.customElements) == null ? void 0 : _a.get("mux-player"))) {
      try {
        const sdkUrl = SDK_URL.replace("VERSION", config.version);
        await import(
          /* webpackIgnore: true */
          `${sdkUrl}`
        );
        this.props.onLoaded();
      } catch (error) {
        onError(error);
      }
    }
    const [, id] = url.match(import_patterns.MATCH_URL_MUX);
    this.player.playbackId = id;
  }
  play() {
    const promise = this.player.play();
    if (promise) {
      promise.catch(this.props.onError);
    }
  }
  pause() {
    this.player.pause();
  }
  stop() {
    this.player.playbackId = null;
  }
  seekTo(seconds, keepPlaying = true) {
    this.player.currentTime = seconds;
    if (!keepPlaying) {
      this.pause();
    }
  }
  setVolume(fraction) {
    this.player.volume = fraction;
  }
  enablePIP() {
    if (this.player.requestPictureInPicture && document.pictureInPictureElement !== this.player) {
      this.player.requestPictureInPicture();
    }
  }
  disablePIP() {
    if (document.exitPictureInPicture && document.pictureInPictureElement === this.player) {
      document.exitPictureInPicture();
    }
  }
  setPlaybackRate(rate) {
    try {
      this.player.playbackRate = rate;
    } catch (error) {
      this.props.onError(error);
    }
  }
  getDuration() {
    if (!this.player)
      return null;
    const { duration, seekable } = this.player;
    if (duration === Infinity && seekable.length > 0) {
      return seekable.end(seekable.length - 1);
    }
    return duration;
  }
  getCurrentTime() {
    if (!this.player)
      return null;
    return this.player.currentTime;
  }
  getSecondsLoaded() {
    if (!this.player)
      return null;
    const { buffered } = this.player;
    if (buffered.length === 0) {
      return 0;
    }
    const end = buffered.end(buffered.length - 1);
    const duration = this.getDuration();
    if (end > duration) {
      return duration;
    }
    return end;
  }
  getPlaybackId(url) {
    const [, id] = url.match(import_patterns.MATCH_URL_MUX);
    return id;
  }
  render() {
    const { url, playing, loop, controls, muted, config, width, height } = this.props;
    const style = {
      width: width === "auto" ? width : "100%",
      height: height === "auto" ? height : "100%"
    };
    if (controls === false) {
      style["--controls"] = "none";
    }
    return /* @__PURE__ */ import_react.default.createElement(
      "mux-player",
      {
        ref: this.ref,
        "playback-id": this.getPlaybackId(url),
        style,
        preload: "auto",
        autoPlay: playing || void 0,
        muted: muted ? "" : void 0,
        loop: loop ? "" : void 0,
        ...config.attributes
      }
    );
  }
}
__publicField(Mux, "displayName", "Mux");
__publicField(Mux, "canPlay", import_patterns.canPlay.mux);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhY3RQbGF5ZXJNdXguYXBwLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEVBQThFLDZEQUE2RDtBQUMzSTtBQUNBO0FBQ0EsOEJBQThCLGtDQUFrQztBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLDRGQUE0RjtBQUN6SDtBQUNBO0FBQ0E7QUFDQSxtR0FBbUc7QUFDbkc7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5RUFBeUUsOEJBQThCO0FBQ3ZHO0FBQ0E7QUFDQSxvREFBb0Qsa0JBQWtCLGFBQWE7QUFDbkY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSwyQkFBMkIsbUJBQU8sQ0FBQyw0Q0FBTztBQUMxQyxzQkFBc0IsbUJBQU8sQ0FBQyxnRUFBYTtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksY0FBYztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxrQkFBa0I7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVkscUJBQXFCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxXQUFXO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksNkRBQTZEO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2VsZWN0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9yZWFjdC1wbGF5ZXIvbGliL3BsYXllcnMvTXV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBfX2NyZWF0ZSA9IE9iamVjdC5jcmVhdGU7XG52YXIgX19kZWZQcm9wID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xudmFyIF9fZ2V0T3duUHJvcERlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xudmFyIF9fZ2V0T3duUHJvcE5hbWVzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXM7XG52YXIgX19nZXRQcm90b09mID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xudmFyIF9faGFzT3duUHJvcCA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgX19kZWZOb3JtYWxQcm9wID0gKG9iaiwga2V5LCB2YWx1ZSkgPT4ga2V5IGluIG9iaiA/IF9fZGVmUHJvcChvYmosIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlLCB2YWx1ZSB9KSA6IG9ialtrZXldID0gdmFsdWU7XG52YXIgX19leHBvcnQgPSAodGFyZ2V0LCBhbGwpID0+IHtcbiAgZm9yICh2YXIgbmFtZSBpbiBhbGwpXG4gICAgX19kZWZQcm9wKHRhcmdldCwgbmFtZSwgeyBnZXQ6IGFsbFtuYW1lXSwgZW51bWVyYWJsZTogdHJ1ZSB9KTtcbn07XG52YXIgX19jb3B5UHJvcHMgPSAodG8sIGZyb20sIGV4Y2VwdCwgZGVzYykgPT4ge1xuICBpZiAoZnJvbSAmJiB0eXBlb2YgZnJvbSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgZnJvbSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgZm9yIChsZXQga2V5IG9mIF9fZ2V0T3duUHJvcE5hbWVzKGZyb20pKVxuICAgICAgaWYgKCFfX2hhc093blByb3AuY2FsbCh0bywga2V5KSAmJiBrZXkgIT09IGV4Y2VwdClcbiAgICAgICAgX19kZWZQcm9wKHRvLCBrZXksIHsgZ2V0OiAoKSA9PiBmcm9tW2tleV0sIGVudW1lcmFibGU6ICEoZGVzYyA9IF9fZ2V0T3duUHJvcERlc2MoZnJvbSwga2V5KSkgfHwgZGVzYy5lbnVtZXJhYmxlIH0pO1xuICB9XG4gIHJldHVybiB0bztcbn07XG52YXIgX190b0VTTSA9IChtb2QsIGlzTm9kZU1vZGUsIHRhcmdldCkgPT4gKHRhcmdldCA9IG1vZCAhPSBudWxsID8gX19jcmVhdGUoX19nZXRQcm90b09mKG1vZCkpIDoge30sIF9fY29weVByb3BzKFxuICAvLyBJZiB0aGUgaW1wb3J0ZXIgaXMgaW4gbm9kZSBjb21wYXRpYmlsaXR5IG1vZGUgb3IgdGhpcyBpcyBub3QgYW4gRVNNXG4gIC8vIGZpbGUgdGhhdCBoYXMgYmVlbiBjb252ZXJ0ZWQgdG8gYSBDb21tb25KUyBmaWxlIHVzaW5nIGEgQmFiZWwtXG4gIC8vIGNvbXBhdGlibGUgdHJhbnNmb3JtIChpLmUuIFwiX19lc01vZHVsZVwiIGhhcyBub3QgYmVlbiBzZXQpLCB0aGVuIHNldFxuICAvLyBcImRlZmF1bHRcIiB0byB0aGUgQ29tbW9uSlMgXCJtb2R1bGUuZXhwb3J0c1wiIGZvciBub2RlIGNvbXBhdGliaWxpdHkuXG4gIGlzTm9kZU1vZGUgfHwgIW1vZCB8fCAhbW9kLl9fZXNNb2R1bGUgPyBfX2RlZlByb3AodGFyZ2V0LCBcImRlZmF1bHRcIiwgeyB2YWx1ZTogbW9kLCBlbnVtZXJhYmxlOiB0cnVlIH0pIDogdGFyZ2V0LFxuICBtb2RcbikpO1xudmFyIF9fdG9Db21tb25KUyA9IChtb2QpID0+IF9fY29weVByb3BzKF9fZGVmUHJvcCh7fSwgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSksIG1vZCk7XG52YXIgX19wdWJsaWNGaWVsZCA9IChvYmosIGtleSwgdmFsdWUpID0+IHtcbiAgX19kZWZOb3JtYWxQcm9wKG9iaiwgdHlwZW9mIGtleSAhPT0gXCJzeW1ib2xcIiA/IGtleSArIFwiXCIgOiBrZXksIHZhbHVlKTtcbiAgcmV0dXJuIHZhbHVlO1xufTtcbnZhciBNdXhfZXhwb3J0cyA9IHt9O1xuX19leHBvcnQoTXV4X2V4cG9ydHMsIHtcbiAgZGVmYXVsdDogKCkgPT4gTXV4XG59KTtcbm1vZHVsZS5leHBvcnRzID0gX190b0NvbW1vbkpTKE11eF9leHBvcnRzKTtcbnZhciBpbXBvcnRfcmVhY3QgPSBfX3RvRVNNKHJlcXVpcmUoXCJyZWFjdFwiKSk7XG52YXIgaW1wb3J0X3BhdHRlcm5zID0gcmVxdWlyZShcIi4uL3BhdHRlcm5zXCIpO1xuY29uc3QgU0RLX1VSTCA9IFwiaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9AbXV4L211eC1wbGF5ZXJAVkVSU0lPTi9kaXN0L211eC1wbGF5ZXIubWpzXCI7XG5jbGFzcyBNdXggZXh0ZW5kcyBpbXBvcnRfcmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICAvLyBQcm94eSBtZXRob2RzIHRvIHByZXZlbnQgbGlzdGVuZXIgbGVha3NcbiAgICBfX3B1YmxpY0ZpZWxkKHRoaXMsIFwib25SZWFkeVwiLCAoLi4uYXJncykgPT4gdGhpcy5wcm9wcy5vblJlYWR5KC4uLmFyZ3MpKTtcbiAgICBfX3B1YmxpY0ZpZWxkKHRoaXMsIFwib25QbGF5XCIsICguLi5hcmdzKSA9PiB0aGlzLnByb3BzLm9uUGxheSguLi5hcmdzKSk7XG4gICAgX19wdWJsaWNGaWVsZCh0aGlzLCBcIm9uQnVmZmVyXCIsICguLi5hcmdzKSA9PiB0aGlzLnByb3BzLm9uQnVmZmVyKC4uLmFyZ3MpKTtcbiAgICBfX3B1YmxpY0ZpZWxkKHRoaXMsIFwib25CdWZmZXJFbmRcIiwgKC4uLmFyZ3MpID0+IHRoaXMucHJvcHMub25CdWZmZXJFbmQoLi4uYXJncykpO1xuICAgIF9fcHVibGljRmllbGQodGhpcywgXCJvblBhdXNlXCIsICguLi5hcmdzKSA9PiB0aGlzLnByb3BzLm9uUGF1c2UoLi4uYXJncykpO1xuICAgIF9fcHVibGljRmllbGQodGhpcywgXCJvbkVuZGVkXCIsICguLi5hcmdzKSA9PiB0aGlzLnByb3BzLm9uRW5kZWQoLi4uYXJncykpO1xuICAgIF9fcHVibGljRmllbGQodGhpcywgXCJvbkVycm9yXCIsICguLi5hcmdzKSA9PiB0aGlzLnByb3BzLm9uRXJyb3IoLi4uYXJncykpO1xuICAgIF9fcHVibGljRmllbGQodGhpcywgXCJvblBsYXlCYWNrUmF0ZUNoYW5nZVwiLCAoZXZlbnQpID0+IHRoaXMucHJvcHMub25QbGF5YmFja1JhdGVDaGFuZ2UoZXZlbnQudGFyZ2V0LnBsYXliYWNrUmF0ZSkpO1xuICAgIF9fcHVibGljRmllbGQodGhpcywgXCJvbkVuYWJsZVBJUFwiLCAoLi4uYXJncykgPT4gdGhpcy5wcm9wcy5vbkVuYWJsZVBJUCguLi5hcmdzKSk7XG4gICAgX19wdWJsaWNGaWVsZCh0aGlzLCBcIm9uU2Vla1wiLCAoZSkgPT4ge1xuICAgICAgdGhpcy5wcm9wcy5vblNlZWsoZS50YXJnZXQuY3VycmVudFRpbWUpO1xuICAgIH0pO1xuICAgIF9fcHVibGljRmllbGQodGhpcywgXCJvbkR1cmF0aW9uQ2hhbmdlXCIsICgpID0+IHtcbiAgICAgIGNvbnN0IGR1cmF0aW9uID0gdGhpcy5nZXREdXJhdGlvbigpO1xuICAgICAgdGhpcy5wcm9wcy5vbkR1cmF0aW9uKGR1cmF0aW9uKTtcbiAgICB9KTtcbiAgICBfX3B1YmxpY0ZpZWxkKHRoaXMsIFwibXV0ZVwiLCAoKSA9PiB7XG4gICAgICB0aGlzLnBsYXllci5tdXRlZCA9IHRydWU7XG4gICAgfSk7XG4gICAgX19wdWJsaWNGaWVsZCh0aGlzLCBcInVubXV0ZVwiLCAoKSA9PiB7XG4gICAgICB0aGlzLnBsYXllci5tdXRlZCA9IGZhbHNlO1xuICAgIH0pO1xuICAgIF9fcHVibGljRmllbGQodGhpcywgXCJyZWZcIiwgKHBsYXllcikgPT4ge1xuICAgICAgdGhpcy5wbGF5ZXIgPSBwbGF5ZXI7XG4gICAgfSk7XG4gIH1cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5wcm9wcy5vbk1vdW50ICYmIHRoaXMucHJvcHMub25Nb3VudCh0aGlzKTtcbiAgICB0aGlzLmFkZExpc3RlbmVycyh0aGlzLnBsYXllcik7XG4gICAgY29uc3QgcGxheWJhY2tJZCA9IHRoaXMuZ2V0UGxheWJhY2tJZCh0aGlzLnByb3BzLnVybCk7XG4gICAgaWYgKHBsYXliYWNrSWQpIHtcbiAgICAgIHRoaXMucGxheWVyLnBsYXliYWNrSWQgPSBwbGF5YmFja0lkO1xuICAgIH1cbiAgfVxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB0aGlzLnBsYXllci5wbGF5YmFja0lkID0gbnVsbDtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVycyh0aGlzLnBsYXllcik7XG4gIH1cbiAgYWRkTGlzdGVuZXJzKHBsYXllcikge1xuICAgIGNvbnN0IHsgcGxheXNpbmxpbmUgfSA9IHRoaXMucHJvcHM7XG4gICAgcGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoXCJwbGF5XCIsIHRoaXMub25QbGF5KTtcbiAgICBwbGF5ZXIuYWRkRXZlbnRMaXN0ZW5lcihcIndhaXRpbmdcIiwgdGhpcy5vbkJ1ZmZlcik7XG4gICAgcGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoXCJwbGF5aW5nXCIsIHRoaXMub25CdWZmZXJFbmQpO1xuICAgIHBsYXllci5hZGRFdmVudExpc3RlbmVyKFwicGF1c2VcIiwgdGhpcy5vblBhdXNlKTtcbiAgICBwbGF5ZXIuYWRkRXZlbnRMaXN0ZW5lcihcInNlZWtlZFwiLCB0aGlzLm9uU2Vlayk7XG4gICAgcGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoXCJlbmRlZFwiLCB0aGlzLm9uRW5kZWQpO1xuICAgIHBsYXllci5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgdGhpcy5vbkVycm9yKTtcbiAgICBwbGF5ZXIuYWRkRXZlbnRMaXN0ZW5lcihcInJhdGVjaGFuZ2VcIiwgdGhpcy5vblBsYXlCYWNrUmF0ZUNoYW5nZSk7XG4gICAgcGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoXCJlbnRlcnBpY3R1cmVpbnBpY3R1cmVcIiwgdGhpcy5vbkVuYWJsZVBJUCk7XG4gICAgcGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoXCJsZWF2ZXBpY3R1cmVpbnBpY3R1cmVcIiwgdGhpcy5vbkRpc2FibGVQSVApO1xuICAgIHBsYXllci5hZGRFdmVudExpc3RlbmVyKFwid2Via2l0cHJlc2VudGF0aW9ubW9kZWNoYW5nZWRcIiwgdGhpcy5vblByZXNlbnRhdGlvbk1vZGVDaGFuZ2UpO1xuICAgIHBsYXllci5hZGRFdmVudExpc3RlbmVyKFwiY2FucGxheVwiLCB0aGlzLm9uUmVhZHkpO1xuICAgIGlmIChwbGF5c2lubGluZSkge1xuICAgICAgcGxheWVyLnNldEF0dHJpYnV0ZShcInBsYXlzaW5saW5lXCIsIFwiXCIpO1xuICAgIH1cbiAgfVxuICByZW1vdmVMaXN0ZW5lcnMocGxheWVyKSB7XG4gICAgcGxheWVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjYW5wbGF5XCIsIHRoaXMub25SZWFkeSk7XG4gICAgcGxheWVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwbGF5XCIsIHRoaXMub25QbGF5KTtcbiAgICBwbGF5ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIndhaXRpbmdcIiwgdGhpcy5vbkJ1ZmZlcik7XG4gICAgcGxheWVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwbGF5aW5nXCIsIHRoaXMub25CdWZmZXJFbmQpO1xuICAgIHBsYXllci5yZW1vdmVFdmVudExpc3RlbmVyKFwicGF1c2VcIiwgdGhpcy5vblBhdXNlKTtcbiAgICBwbGF5ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNlZWtlZFwiLCB0aGlzLm9uU2Vlayk7XG4gICAgcGxheWVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJlbmRlZFwiLCB0aGlzLm9uRW5kZWQpO1xuICAgIHBsYXllci5yZW1vdmVFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgdGhpcy5vbkVycm9yKTtcbiAgICBwbGF5ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJhdGVjaGFuZ2VcIiwgdGhpcy5vblBsYXlCYWNrUmF0ZUNoYW5nZSk7XG4gICAgcGxheWVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJlbnRlcnBpY3R1cmVpbnBpY3R1cmVcIiwgdGhpcy5vbkVuYWJsZVBJUCk7XG4gICAgcGxheWVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJsZWF2ZXBpY3R1cmVpbnBpY3R1cmVcIiwgdGhpcy5vbkRpc2FibGVQSVApO1xuICAgIHBsYXllci5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2FucGxheVwiLCB0aGlzLm9uUmVhZHkpO1xuICB9XG4gIGFzeW5jIGxvYWQodXJsKSB7XG4gICAgdmFyIF9hO1xuICAgIGNvbnN0IHsgb25FcnJvciwgY29uZmlnIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghKChfYSA9IGdsb2JhbFRoaXMuY3VzdG9tRWxlbWVudHMpID09IG51bGwgPyB2b2lkIDAgOiBfYS5nZXQoXCJtdXgtcGxheWVyXCIpKSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3Qgc2RrVXJsID0gU0RLX1VSTC5yZXBsYWNlKFwiVkVSU0lPTlwiLCBjb25maWcudmVyc2lvbik7XG4gICAgICAgIGF3YWl0IGltcG9ydChcbiAgICAgICAgICAvKiB3ZWJwYWNrSWdub3JlOiB0cnVlICovXG4gICAgICAgICAgYCR7c2RrVXJsfWBcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkxvYWRlZCgpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgb25FcnJvcihlcnJvcik7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IFssIGlkXSA9IHVybC5tYXRjaChpbXBvcnRfcGF0dGVybnMuTUFUQ0hfVVJMX01VWCk7XG4gICAgdGhpcy5wbGF5ZXIucGxheWJhY2tJZCA9IGlkO1xuICB9XG4gIHBsYXkoKSB7XG4gICAgY29uc3QgcHJvbWlzZSA9IHRoaXMucGxheWVyLnBsYXkoKTtcbiAgICBpZiAocHJvbWlzZSkge1xuICAgICAgcHJvbWlzZS5jYXRjaCh0aGlzLnByb3BzLm9uRXJyb3IpO1xuICAgIH1cbiAgfVxuICBwYXVzZSgpIHtcbiAgICB0aGlzLnBsYXllci5wYXVzZSgpO1xuICB9XG4gIHN0b3AoKSB7XG4gICAgdGhpcy5wbGF5ZXIucGxheWJhY2tJZCA9IG51bGw7XG4gIH1cbiAgc2Vla1RvKHNlY29uZHMsIGtlZXBQbGF5aW5nID0gdHJ1ZSkge1xuICAgIHRoaXMucGxheWVyLmN1cnJlbnRUaW1lID0gc2Vjb25kcztcbiAgICBpZiAoIWtlZXBQbGF5aW5nKSB7XG4gICAgICB0aGlzLnBhdXNlKCk7XG4gICAgfVxuICB9XG4gIHNldFZvbHVtZShmcmFjdGlvbikge1xuICAgIHRoaXMucGxheWVyLnZvbHVtZSA9IGZyYWN0aW9uO1xuICB9XG4gIGVuYWJsZVBJUCgpIHtcbiAgICBpZiAodGhpcy5wbGF5ZXIucmVxdWVzdFBpY3R1cmVJblBpY3R1cmUgJiYgZG9jdW1lbnQucGljdHVyZUluUGljdHVyZUVsZW1lbnQgIT09IHRoaXMucGxheWVyKSB7XG4gICAgICB0aGlzLnBsYXllci5yZXF1ZXN0UGljdHVyZUluUGljdHVyZSgpO1xuICAgIH1cbiAgfVxuICBkaXNhYmxlUElQKCkge1xuICAgIGlmIChkb2N1bWVudC5leGl0UGljdHVyZUluUGljdHVyZSAmJiBkb2N1bWVudC5waWN0dXJlSW5QaWN0dXJlRWxlbWVudCA9PT0gdGhpcy5wbGF5ZXIpIHtcbiAgICAgIGRvY3VtZW50LmV4aXRQaWN0dXJlSW5QaWN0dXJlKCk7XG4gICAgfVxuICB9XG4gIHNldFBsYXliYWNrUmF0ZShyYXRlKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMucGxheWVyLnBsYXliYWNrUmF0ZSA9IHJhdGU7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRoaXMucHJvcHMub25FcnJvcihlcnJvcik7XG4gICAgfVxuICB9XG4gIGdldER1cmF0aW9uKCkge1xuICAgIGlmICghdGhpcy5wbGF5ZXIpXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICBjb25zdCB7IGR1cmF0aW9uLCBzZWVrYWJsZSB9ID0gdGhpcy5wbGF5ZXI7XG4gICAgaWYgKGR1cmF0aW9uID09PSBJbmZpbml0eSAmJiBzZWVrYWJsZS5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gc2Vla2FibGUuZW5kKHNlZWthYmxlLmxlbmd0aCAtIDEpO1xuICAgIH1cbiAgICByZXR1cm4gZHVyYXRpb247XG4gIH1cbiAgZ2V0Q3VycmVudFRpbWUoKSB7XG4gICAgaWYgKCF0aGlzLnBsYXllcilcbiAgICAgIHJldHVybiBudWxsO1xuICAgIHJldHVybiB0aGlzLnBsYXllci5jdXJyZW50VGltZTtcbiAgfVxuICBnZXRTZWNvbmRzTG9hZGVkKCkge1xuICAgIGlmICghdGhpcy5wbGF5ZXIpXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICBjb25zdCB7IGJ1ZmZlcmVkIH0gPSB0aGlzLnBsYXllcjtcbiAgICBpZiAoYnVmZmVyZWQubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgY29uc3QgZW5kID0gYnVmZmVyZWQuZW5kKGJ1ZmZlcmVkLmxlbmd0aCAtIDEpO1xuICAgIGNvbnN0IGR1cmF0aW9uID0gdGhpcy5nZXREdXJhdGlvbigpO1xuICAgIGlmIChlbmQgPiBkdXJhdGlvbikge1xuICAgICAgcmV0dXJuIGR1cmF0aW9uO1xuICAgIH1cbiAgICByZXR1cm4gZW5kO1xuICB9XG4gIGdldFBsYXliYWNrSWQodXJsKSB7XG4gICAgY29uc3QgWywgaWRdID0gdXJsLm1hdGNoKGltcG9ydF9wYXR0ZXJucy5NQVRDSF9VUkxfTVVYKTtcbiAgICByZXR1cm4gaWQ7XG4gIH1cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgdXJsLCBwbGF5aW5nLCBsb29wLCBjb250cm9scywgbXV0ZWQsIGNvbmZpZywgd2lkdGgsIGhlaWdodCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzdHlsZSA9IHtcbiAgICAgIHdpZHRoOiB3aWR0aCA9PT0gXCJhdXRvXCIgPyB3aWR0aCA6IFwiMTAwJVwiLFxuICAgICAgaGVpZ2h0OiBoZWlnaHQgPT09IFwiYXV0b1wiID8gaGVpZ2h0IDogXCIxMDAlXCJcbiAgICB9O1xuICAgIGlmIChjb250cm9scyA9PT0gZmFsc2UpIHtcbiAgICAgIHN0eWxlW1wiLS1jb250cm9sc1wiXSA9IFwibm9uZVwiO1xuICAgIH1cbiAgICByZXR1cm4gLyogQF9fUFVSRV9fICovIGltcG9ydF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICBcIm11eC1wbGF5ZXJcIixcbiAgICAgIHtcbiAgICAgICAgcmVmOiB0aGlzLnJlZixcbiAgICAgICAgXCJwbGF5YmFjay1pZFwiOiB0aGlzLmdldFBsYXliYWNrSWQodXJsKSxcbiAgICAgICAgc3R5bGUsXG4gICAgICAgIHByZWxvYWQ6IFwiYXV0b1wiLFxuICAgICAgICBhdXRvUGxheTogcGxheWluZyB8fCB2b2lkIDAsXG4gICAgICAgIG11dGVkOiBtdXRlZCA/IFwiXCIgOiB2b2lkIDAsXG4gICAgICAgIGxvb3A6IGxvb3AgPyBcIlwiIDogdm9pZCAwLFxuICAgICAgICAuLi5jb25maWcuYXR0cmlidXRlc1xuICAgICAgfVxuICAgICk7XG4gIH1cbn1cbl9fcHVibGljRmllbGQoTXV4LCBcImRpc3BsYXlOYW1lXCIsIFwiTXV4XCIpO1xuX19wdWJsaWNGaWVsZChNdXgsIFwiY2FuUGxheVwiLCBpbXBvcnRfcGF0dGVybnMuY2FuUGxheS5tdXgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9