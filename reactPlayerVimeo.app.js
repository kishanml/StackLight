(global["webpackChunkelectron_app"] = global["webpackChunkelectron_app"] || []).push([["reactPlayerVimeo"],{

/***/ "./node_modules/react-player/lib/players/Vimeo.js":
/*!********************************************************!*\
  !*** ./node_modules/react-player/lib/players/Vimeo.js ***!
  \********************************************************/
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
var Vimeo_exports = {};
__export(Vimeo_exports, {
  default: () => Vimeo
});
module.exports = __toCommonJS(Vimeo_exports);
var import_react = __toESM(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var import_utils = __webpack_require__(/*! ../utils */ "./node_modules/react-player/lib/utils.js");
var import_patterns = __webpack_require__(/*! ../patterns */ "./node_modules/react-player/lib/patterns.js");
const SDK_URL = "https://player.vimeo.com/api/player.js";
const SDK_GLOBAL = "Vimeo";
const cleanUrl = (url) => {
  return url.replace("/manage/videos", "");
};
class Vimeo extends import_react.Component {
  constructor() {
    super(...arguments);
    // Prevent checking isLoading when URL changes
    __publicField(this, "callPlayer", import_utils.callPlayer);
    __publicField(this, "duration", null);
    __publicField(this, "currentTime", null);
    __publicField(this, "secondsLoaded", null);
    __publicField(this, "mute", () => {
      this.setMuted(true);
    });
    __publicField(this, "unmute", () => {
      this.setMuted(false);
    });
    __publicField(this, "ref", (container) => {
      this.container = container;
    });
  }
  componentDidMount() {
    this.props.onMount && this.props.onMount(this);
  }
  load(url) {
    this.duration = null;
    (0, import_utils.getSDK)(SDK_URL, SDK_GLOBAL).then((Vimeo2) => {
      if (!this.container)
        return;
      const { playerOptions, title } = this.props.config;
      this.player = new Vimeo2.Player(this.container, {
        url: cleanUrl(url),
        autoplay: this.props.playing,
        muted: this.props.muted,
        loop: this.props.loop,
        playsinline: this.props.playsinline,
        controls: this.props.controls,
        ...playerOptions
      });
      this.player.ready().then(() => {
        const iframe = this.container.querySelector("iframe");
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        if (title) {
          iframe.title = title;
        }
      }).catch(this.props.onError);
      this.player.on("loaded", () => {
        this.props.onReady();
        this.refreshDuration();
      });
      this.player.on("play", () => {
        this.props.onPlay();
        this.refreshDuration();
      });
      this.player.on("pause", this.props.onPause);
      this.player.on("seeked", (e) => this.props.onSeek(e.seconds));
      this.player.on("ended", this.props.onEnded);
      this.player.on("error", this.props.onError);
      this.player.on("timeupdate", ({ seconds }) => {
        this.currentTime = seconds;
      });
      this.player.on("progress", ({ seconds }) => {
        this.secondsLoaded = seconds;
      });
      this.player.on("bufferstart", this.props.onBuffer);
      this.player.on("bufferend", this.props.onBufferEnd);
      this.player.on("playbackratechange", (e) => this.props.onPlaybackRateChange(e.playbackRate));
    }, this.props.onError);
  }
  refreshDuration() {
    this.player.getDuration().then((duration) => {
      this.duration = duration;
    });
  }
  play() {
    const promise = this.callPlayer("play");
    if (promise) {
      promise.catch(this.props.onError);
    }
  }
  pause() {
    this.callPlayer("pause");
  }
  stop() {
    this.callPlayer("unload");
  }
  seekTo(seconds, keepPlaying = true) {
    this.callPlayer("setCurrentTime", seconds);
    if (!keepPlaying) {
      this.pause();
    }
  }
  setVolume(fraction) {
    this.callPlayer("setVolume", fraction);
  }
  setMuted(muted) {
    this.callPlayer("setMuted", muted);
  }
  setLoop(loop) {
    this.callPlayer("setLoop", loop);
  }
  setPlaybackRate(rate) {
    this.callPlayer("setPlaybackRate", rate);
  }
  getDuration() {
    return this.duration;
  }
  getCurrentTime() {
    return this.currentTime;
  }
  getSecondsLoaded() {
    return this.secondsLoaded;
  }
  render() {
    const { display } = this.props;
    const style = {
      width: "100%",
      height: "100%",
      overflow: "hidden",
      display
    };
    return /* @__PURE__ */ import_react.default.createElement(
      "div",
      {
        key: this.props.url,
        ref: this.ref,
        style
      }
    );
  }
}
__publicField(Vimeo, "displayName", "Vimeo");
__publicField(Vimeo, "canPlay", import_patterns.canPlay.vimeo);
__publicField(Vimeo, "forceLoad", true);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhY3RQbGF5ZXJWaW1lby5hcHAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4RUFBOEUsNkRBQTZEO0FBQzNJO0FBQ0E7QUFDQSw4QkFBOEIsa0NBQWtDO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsNEZBQTRGO0FBQ3pIO0FBQ0E7QUFDQTtBQUNBLG1HQUFtRztBQUNuRztBQUNBO0FBQ0E7QUFDQTtBQUNBLHlFQUF5RSw4QkFBOEI7QUFDdkc7QUFDQTtBQUNBLG9EQUFvRCxrQkFBa0IsYUFBYTtBQUNuRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLDJCQUEyQixtQkFBTyxDQUFDLDRDQUFPO0FBQzFDLG1CQUFtQixtQkFBTyxDQUFDLDBEQUFVO0FBQ3JDLHNCQUFzQixtQkFBTyxDQUFDLGdFQUFhO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyx1QkFBdUI7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLFNBQVM7QUFDL0M7QUFDQSxPQUFPO0FBQ1Asb0NBQW9DLFNBQVM7QUFDN0M7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFVBQVU7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lbGVjdHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvcmVhY3QtcGxheWVyL2xpYi9wbGF5ZXJzL1ZpbWVvLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBfX2NyZWF0ZSA9IE9iamVjdC5jcmVhdGU7XG52YXIgX19kZWZQcm9wID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xudmFyIF9fZ2V0T3duUHJvcERlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xudmFyIF9fZ2V0T3duUHJvcE5hbWVzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXM7XG52YXIgX19nZXRQcm90b09mID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xudmFyIF9faGFzT3duUHJvcCA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgX19kZWZOb3JtYWxQcm9wID0gKG9iaiwga2V5LCB2YWx1ZSkgPT4ga2V5IGluIG9iaiA/IF9fZGVmUHJvcChvYmosIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlLCB2YWx1ZSB9KSA6IG9ialtrZXldID0gdmFsdWU7XG52YXIgX19leHBvcnQgPSAodGFyZ2V0LCBhbGwpID0+IHtcbiAgZm9yICh2YXIgbmFtZSBpbiBhbGwpXG4gICAgX19kZWZQcm9wKHRhcmdldCwgbmFtZSwgeyBnZXQ6IGFsbFtuYW1lXSwgZW51bWVyYWJsZTogdHJ1ZSB9KTtcbn07XG52YXIgX19jb3B5UHJvcHMgPSAodG8sIGZyb20sIGV4Y2VwdCwgZGVzYykgPT4ge1xuICBpZiAoZnJvbSAmJiB0eXBlb2YgZnJvbSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgZnJvbSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgZm9yIChsZXQga2V5IG9mIF9fZ2V0T3duUHJvcE5hbWVzKGZyb20pKVxuICAgICAgaWYgKCFfX2hhc093blByb3AuY2FsbCh0bywga2V5KSAmJiBrZXkgIT09IGV4Y2VwdClcbiAgICAgICAgX19kZWZQcm9wKHRvLCBrZXksIHsgZ2V0OiAoKSA9PiBmcm9tW2tleV0sIGVudW1lcmFibGU6ICEoZGVzYyA9IF9fZ2V0T3duUHJvcERlc2MoZnJvbSwga2V5KSkgfHwgZGVzYy5lbnVtZXJhYmxlIH0pO1xuICB9XG4gIHJldHVybiB0bztcbn07XG52YXIgX190b0VTTSA9IChtb2QsIGlzTm9kZU1vZGUsIHRhcmdldCkgPT4gKHRhcmdldCA9IG1vZCAhPSBudWxsID8gX19jcmVhdGUoX19nZXRQcm90b09mKG1vZCkpIDoge30sIF9fY29weVByb3BzKFxuICAvLyBJZiB0aGUgaW1wb3J0ZXIgaXMgaW4gbm9kZSBjb21wYXRpYmlsaXR5IG1vZGUgb3IgdGhpcyBpcyBub3QgYW4gRVNNXG4gIC8vIGZpbGUgdGhhdCBoYXMgYmVlbiBjb252ZXJ0ZWQgdG8gYSBDb21tb25KUyBmaWxlIHVzaW5nIGEgQmFiZWwtXG4gIC8vIGNvbXBhdGlibGUgdHJhbnNmb3JtIChpLmUuIFwiX19lc01vZHVsZVwiIGhhcyBub3QgYmVlbiBzZXQpLCB0aGVuIHNldFxuICAvLyBcImRlZmF1bHRcIiB0byB0aGUgQ29tbW9uSlMgXCJtb2R1bGUuZXhwb3J0c1wiIGZvciBub2RlIGNvbXBhdGliaWxpdHkuXG4gIGlzTm9kZU1vZGUgfHwgIW1vZCB8fCAhbW9kLl9fZXNNb2R1bGUgPyBfX2RlZlByb3AodGFyZ2V0LCBcImRlZmF1bHRcIiwgeyB2YWx1ZTogbW9kLCBlbnVtZXJhYmxlOiB0cnVlIH0pIDogdGFyZ2V0LFxuICBtb2RcbikpO1xudmFyIF9fdG9Db21tb25KUyA9IChtb2QpID0+IF9fY29weVByb3BzKF9fZGVmUHJvcCh7fSwgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSksIG1vZCk7XG52YXIgX19wdWJsaWNGaWVsZCA9IChvYmosIGtleSwgdmFsdWUpID0+IHtcbiAgX19kZWZOb3JtYWxQcm9wKG9iaiwgdHlwZW9mIGtleSAhPT0gXCJzeW1ib2xcIiA/IGtleSArIFwiXCIgOiBrZXksIHZhbHVlKTtcbiAgcmV0dXJuIHZhbHVlO1xufTtcbnZhciBWaW1lb19leHBvcnRzID0ge307XG5fX2V4cG9ydChWaW1lb19leHBvcnRzLCB7XG4gIGRlZmF1bHQ6ICgpID0+IFZpbWVvXG59KTtcbm1vZHVsZS5leHBvcnRzID0gX190b0NvbW1vbkpTKFZpbWVvX2V4cG9ydHMpO1xudmFyIGltcG9ydF9yZWFjdCA9IF9fdG9FU00ocmVxdWlyZShcInJlYWN0XCIpKTtcbnZhciBpbXBvcnRfdXRpbHMgPSByZXF1aXJlKFwiLi4vdXRpbHNcIik7XG52YXIgaW1wb3J0X3BhdHRlcm5zID0gcmVxdWlyZShcIi4uL3BhdHRlcm5zXCIpO1xuY29uc3QgU0RLX1VSTCA9IFwiaHR0cHM6Ly9wbGF5ZXIudmltZW8uY29tL2FwaS9wbGF5ZXIuanNcIjtcbmNvbnN0IFNES19HTE9CQUwgPSBcIlZpbWVvXCI7XG5jb25zdCBjbGVhblVybCA9ICh1cmwpID0+IHtcbiAgcmV0dXJuIHVybC5yZXBsYWNlKFwiL21hbmFnZS92aWRlb3NcIiwgXCJcIik7XG59O1xuY2xhc3MgVmltZW8gZXh0ZW5kcyBpbXBvcnRfcmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICAvLyBQcmV2ZW50IGNoZWNraW5nIGlzTG9hZGluZyB3aGVuIFVSTCBjaGFuZ2VzXG4gICAgX19wdWJsaWNGaWVsZCh0aGlzLCBcImNhbGxQbGF5ZXJcIiwgaW1wb3J0X3V0aWxzLmNhbGxQbGF5ZXIpO1xuICAgIF9fcHVibGljRmllbGQodGhpcywgXCJkdXJhdGlvblwiLCBudWxsKTtcbiAgICBfX3B1YmxpY0ZpZWxkKHRoaXMsIFwiY3VycmVudFRpbWVcIiwgbnVsbCk7XG4gICAgX19wdWJsaWNGaWVsZCh0aGlzLCBcInNlY29uZHNMb2FkZWRcIiwgbnVsbCk7XG4gICAgX19wdWJsaWNGaWVsZCh0aGlzLCBcIm11dGVcIiwgKCkgPT4ge1xuICAgICAgdGhpcy5zZXRNdXRlZCh0cnVlKTtcbiAgICB9KTtcbiAgICBfX3B1YmxpY0ZpZWxkKHRoaXMsIFwidW5tdXRlXCIsICgpID0+IHtcbiAgICAgIHRoaXMuc2V0TXV0ZWQoZmFsc2UpO1xuICAgIH0pO1xuICAgIF9fcHVibGljRmllbGQodGhpcywgXCJyZWZcIiwgKGNvbnRhaW5lcikgPT4ge1xuICAgICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG4gICAgfSk7XG4gIH1cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5wcm9wcy5vbk1vdW50ICYmIHRoaXMucHJvcHMub25Nb3VudCh0aGlzKTtcbiAgfVxuICBsb2FkKHVybCkge1xuICAgIHRoaXMuZHVyYXRpb24gPSBudWxsO1xuICAgICgwLCBpbXBvcnRfdXRpbHMuZ2V0U0RLKShTREtfVVJMLCBTREtfR0xPQkFMKS50aGVuKChWaW1lbzIpID0+IHtcbiAgICAgIGlmICghdGhpcy5jb250YWluZXIpXG4gICAgICAgIHJldHVybjtcbiAgICAgIGNvbnN0IHsgcGxheWVyT3B0aW9ucywgdGl0bGUgfSA9IHRoaXMucHJvcHMuY29uZmlnO1xuICAgICAgdGhpcy5wbGF5ZXIgPSBuZXcgVmltZW8yLlBsYXllcih0aGlzLmNvbnRhaW5lciwge1xuICAgICAgICB1cmw6IGNsZWFuVXJsKHVybCksXG4gICAgICAgIGF1dG9wbGF5OiB0aGlzLnByb3BzLnBsYXlpbmcsXG4gICAgICAgIG11dGVkOiB0aGlzLnByb3BzLm11dGVkLFxuICAgICAgICBsb29wOiB0aGlzLnByb3BzLmxvb3AsXG4gICAgICAgIHBsYXlzaW5saW5lOiB0aGlzLnByb3BzLnBsYXlzaW5saW5lLFxuICAgICAgICBjb250cm9sczogdGhpcy5wcm9wcy5jb250cm9scyxcbiAgICAgICAgLi4ucGxheWVyT3B0aW9uc1xuICAgICAgfSk7XG4gICAgICB0aGlzLnBsYXllci5yZWFkeSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICBjb25zdCBpZnJhbWUgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiaWZyYW1lXCIpO1xuICAgICAgICBpZnJhbWUuc3R5bGUud2lkdGggPSBcIjEwMCVcIjtcbiAgICAgICAgaWZyYW1lLnN0eWxlLmhlaWdodCA9IFwiMTAwJVwiO1xuICAgICAgICBpZiAodGl0bGUpIHtcbiAgICAgICAgICBpZnJhbWUudGl0bGUgPSB0aXRsZTtcbiAgICAgICAgfVxuICAgICAgfSkuY2F0Y2godGhpcy5wcm9wcy5vbkVycm9yKTtcbiAgICAgIHRoaXMucGxheWVyLm9uKFwibG9hZGVkXCIsICgpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblJlYWR5KCk7XG4gICAgICAgIHRoaXMucmVmcmVzaER1cmF0aW9uKCk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMucGxheWVyLm9uKFwicGxheVwiLCAoKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMub25QbGF5KCk7XG4gICAgICAgIHRoaXMucmVmcmVzaER1cmF0aW9uKCk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMucGxheWVyLm9uKFwicGF1c2VcIiwgdGhpcy5wcm9wcy5vblBhdXNlKTtcbiAgICAgIHRoaXMucGxheWVyLm9uKFwic2Vla2VkXCIsIChlKSA9PiB0aGlzLnByb3BzLm9uU2VlayhlLnNlY29uZHMpKTtcbiAgICAgIHRoaXMucGxheWVyLm9uKFwiZW5kZWRcIiwgdGhpcy5wcm9wcy5vbkVuZGVkKTtcbiAgICAgIHRoaXMucGxheWVyLm9uKFwiZXJyb3JcIiwgdGhpcy5wcm9wcy5vbkVycm9yKTtcbiAgICAgIHRoaXMucGxheWVyLm9uKFwidGltZXVwZGF0ZVwiLCAoeyBzZWNvbmRzIH0pID0+IHtcbiAgICAgICAgdGhpcy5jdXJyZW50VGltZSA9IHNlY29uZHM7XG4gICAgICB9KTtcbiAgICAgIHRoaXMucGxheWVyLm9uKFwicHJvZ3Jlc3NcIiwgKHsgc2Vjb25kcyB9KSA9PiB7XG4gICAgICAgIHRoaXMuc2Vjb25kc0xvYWRlZCA9IHNlY29uZHM7XG4gICAgICB9KTtcbiAgICAgIHRoaXMucGxheWVyLm9uKFwiYnVmZmVyc3RhcnRcIiwgdGhpcy5wcm9wcy5vbkJ1ZmZlcik7XG4gICAgICB0aGlzLnBsYXllci5vbihcImJ1ZmZlcmVuZFwiLCB0aGlzLnByb3BzLm9uQnVmZmVyRW5kKTtcbiAgICAgIHRoaXMucGxheWVyLm9uKFwicGxheWJhY2tyYXRlY2hhbmdlXCIsIChlKSA9PiB0aGlzLnByb3BzLm9uUGxheWJhY2tSYXRlQ2hhbmdlKGUucGxheWJhY2tSYXRlKSk7XG4gICAgfSwgdGhpcy5wcm9wcy5vbkVycm9yKTtcbiAgfVxuICByZWZyZXNoRHVyYXRpb24oKSB7XG4gICAgdGhpcy5wbGF5ZXIuZ2V0RHVyYXRpb24oKS50aGVuKChkdXJhdGlvbikgPT4ge1xuICAgICAgdGhpcy5kdXJhdGlvbiA9IGR1cmF0aW9uO1xuICAgIH0pO1xuICB9XG4gIHBsYXkoKSB7XG4gICAgY29uc3QgcHJvbWlzZSA9IHRoaXMuY2FsbFBsYXllcihcInBsYXlcIik7XG4gICAgaWYgKHByb21pc2UpIHtcbiAgICAgIHByb21pc2UuY2F0Y2godGhpcy5wcm9wcy5vbkVycm9yKTtcbiAgICB9XG4gIH1cbiAgcGF1c2UoKSB7XG4gICAgdGhpcy5jYWxsUGxheWVyKFwicGF1c2VcIik7XG4gIH1cbiAgc3RvcCgpIHtcbiAgICB0aGlzLmNhbGxQbGF5ZXIoXCJ1bmxvYWRcIik7XG4gIH1cbiAgc2Vla1RvKHNlY29uZHMsIGtlZXBQbGF5aW5nID0gdHJ1ZSkge1xuICAgIHRoaXMuY2FsbFBsYXllcihcInNldEN1cnJlbnRUaW1lXCIsIHNlY29uZHMpO1xuICAgIGlmICgha2VlcFBsYXlpbmcpIHtcbiAgICAgIHRoaXMucGF1c2UoKTtcbiAgICB9XG4gIH1cbiAgc2V0Vm9sdW1lKGZyYWN0aW9uKSB7XG4gICAgdGhpcy5jYWxsUGxheWVyKFwic2V0Vm9sdW1lXCIsIGZyYWN0aW9uKTtcbiAgfVxuICBzZXRNdXRlZChtdXRlZCkge1xuICAgIHRoaXMuY2FsbFBsYXllcihcInNldE11dGVkXCIsIG11dGVkKTtcbiAgfVxuICBzZXRMb29wKGxvb3ApIHtcbiAgICB0aGlzLmNhbGxQbGF5ZXIoXCJzZXRMb29wXCIsIGxvb3ApO1xuICB9XG4gIHNldFBsYXliYWNrUmF0ZShyYXRlKSB7XG4gICAgdGhpcy5jYWxsUGxheWVyKFwic2V0UGxheWJhY2tSYXRlXCIsIHJhdGUpO1xuICB9XG4gIGdldER1cmF0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmR1cmF0aW9uO1xuICB9XG4gIGdldEN1cnJlbnRUaW1lKCkge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRUaW1lO1xuICB9XG4gIGdldFNlY29uZHNMb2FkZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2Vjb25kc0xvYWRlZDtcbiAgfVxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBkaXNwbGF5IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHN0eWxlID0ge1xuICAgICAgd2lkdGg6IFwiMTAwJVwiLFxuICAgICAgaGVpZ2h0OiBcIjEwMCVcIixcbiAgICAgIG92ZXJmbG93OiBcImhpZGRlblwiLFxuICAgICAgZGlzcGxheVxuICAgIH07XG4gICAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBpbXBvcnRfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgXCJkaXZcIixcbiAgICAgIHtcbiAgICAgICAga2V5OiB0aGlzLnByb3BzLnVybCxcbiAgICAgICAgcmVmOiB0aGlzLnJlZixcbiAgICAgICAgc3R5bGVcbiAgICAgIH1cbiAgICApO1xuICB9XG59XG5fX3B1YmxpY0ZpZWxkKFZpbWVvLCBcImRpc3BsYXlOYW1lXCIsIFwiVmltZW9cIik7XG5fX3B1YmxpY0ZpZWxkKFZpbWVvLCBcImNhblBsYXlcIiwgaW1wb3J0X3BhdHRlcm5zLmNhblBsYXkudmltZW8pO1xuX19wdWJsaWNGaWVsZChWaW1lbywgXCJmb3JjZUxvYWRcIiwgdHJ1ZSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=