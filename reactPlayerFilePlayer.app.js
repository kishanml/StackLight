(global["webpackChunkelectron_app"] = global["webpackChunkelectron_app"] || []).push([["reactPlayerFilePlayer"],{

/***/ "./node_modules/react-player/lib/players/FilePlayer.js":
/*!*************************************************************!*\
  !*** ./node_modules/react-player/lib/players/FilePlayer.js ***!
  \*************************************************************/
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
var FilePlayer_exports = {};
__export(FilePlayer_exports, {
  default: () => FilePlayer
});
module.exports = __toCommonJS(FilePlayer_exports);
var import_react = __toESM(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var import_utils = __webpack_require__(/*! ../utils */ "./node_modules/react-player/lib/utils.js");
var import_patterns = __webpack_require__(/*! ../patterns */ "./node_modules/react-player/lib/patterns.js");
const HAS_NAVIGATOR = typeof navigator !== "undefined";
const IS_IPAD_PRO = HAS_NAVIGATOR && navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
const IS_IOS = HAS_NAVIGATOR && (/iPad|iPhone|iPod/.test(navigator.userAgent) || IS_IPAD_PRO) && !window.MSStream;
const IS_SAFARI = HAS_NAVIGATOR && /^((?!chrome|android).)*safari/i.test(navigator.userAgent) && !window.MSStream;
const HLS_SDK_URL = "https://cdn.jsdelivr.net/npm/hls.js@VERSION/dist/hls.min.js";
const HLS_GLOBAL = "Hls";
const DASH_SDK_URL = "https://cdnjs.cloudflare.com/ajax/libs/dashjs/VERSION/dash.all.min.js";
const DASH_GLOBAL = "dashjs";
const FLV_SDK_URL = "https://cdn.jsdelivr.net/npm/flv.js@VERSION/dist/flv.min.js";
const FLV_GLOBAL = "flvjs";
const MATCH_DROPBOX_URL = /www\.dropbox\.com\/.+/;
const MATCH_CLOUDFLARE_STREAM = /https:\/\/watch\.cloudflarestream\.com\/([a-z0-9]+)/;
const REPLACE_CLOUDFLARE_STREAM = "https://videodelivery.net/{id}/manifest/video.m3u8";
class FilePlayer extends import_react.Component {
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
    __publicField(this, "onDisablePIP", (e) => {
      const { onDisablePIP, playing } = this.props;
      onDisablePIP(e);
      if (playing) {
        this.play();
      }
    });
    __publicField(this, "onPresentationModeChange", (e) => {
      if (this.player && (0, import_utils.supportsWebKitPresentationMode)(this.player)) {
        const { webkitPresentationMode } = this.player;
        if (webkitPresentationMode === "picture-in-picture") {
          this.onEnablePIP(e);
        } else if (webkitPresentationMode === "inline") {
          this.onDisablePIP(e);
        }
      }
    });
    __publicField(this, "onSeek", (e) => {
      this.props.onSeek(e.target.currentTime);
    });
    __publicField(this, "mute", () => {
      this.player.muted = true;
    });
    __publicField(this, "unmute", () => {
      this.player.muted = false;
    });
    __publicField(this, "renderSourceElement", (source, index) => {
      if (typeof source === "string") {
        return /* @__PURE__ */ import_react.default.createElement("source", { key: index, src: source });
      }
      return /* @__PURE__ */ import_react.default.createElement("source", { key: index, ...source });
    });
    __publicField(this, "renderTrack", (track, index) => {
      return /* @__PURE__ */ import_react.default.createElement("track", { key: index, ...track });
    });
    __publicField(this, "ref", (player) => {
      if (this.player) {
        this.prevPlayer = this.player;
      }
      this.player = player;
    });
  }
  componentDidMount() {
    this.props.onMount && this.props.onMount(this);
    this.addListeners(this.player);
    const src = this.getSource(this.props.url);
    if (src) {
      this.player.src = src;
    }
    if (IS_IOS || this.props.config.forceDisableHls) {
      this.player.load();
    }
  }
  componentDidUpdate(prevProps) {
    if (this.shouldUseAudio(this.props) !== this.shouldUseAudio(prevProps)) {
      this.removeListeners(this.prevPlayer, prevProps.url);
      this.addListeners(this.player);
    }
    if (this.props.url !== prevProps.url && !(0, import_utils.isMediaStream)(this.props.url) && !(this.props.url instanceof Array)) {
      this.player.srcObject = null;
    }
  }
  componentWillUnmount() {
    this.player.removeAttribute("src");
    this.removeListeners(this.player);
    if (this.hls) {
      this.hls.destroy();
    }
  }
  addListeners(player) {
    const { url, playsinline } = this.props;
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
    if (!this.shouldUseHLS(url)) {
      player.addEventListener("canplay", this.onReady);
    }
    if (playsinline) {
      player.setAttribute("playsinline", "");
      player.setAttribute("webkit-playsinline", "");
      player.setAttribute("x5-playsinline", "");
    }
  }
  removeListeners(player, url) {
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
    player.removeEventListener("webkitpresentationmodechanged", this.onPresentationModeChange);
    if (!this.shouldUseHLS(url)) {
      player.removeEventListener("canplay", this.onReady);
    }
  }
  shouldUseAudio(props) {
    if (props.config.forceVideo) {
      return false;
    }
    if (props.config.attributes.poster) {
      return false;
    }
    return import_patterns.AUDIO_EXTENSIONS.test(props.url) || props.config.forceAudio;
  }
  shouldUseHLS(url) {
    if (IS_SAFARI && this.props.config.forceSafariHLS || this.props.config.forceHLS) {
      return true;
    }
    if (IS_IOS || this.props.config.forceDisableHls) {
      return false;
    }
    return import_patterns.HLS_EXTENSIONS.test(url) || MATCH_CLOUDFLARE_STREAM.test(url);
  }
  shouldUseDASH(url) {
    return import_patterns.DASH_EXTENSIONS.test(url) || this.props.config.forceDASH;
  }
  shouldUseFLV(url) {
    return import_patterns.FLV_EXTENSIONS.test(url) || this.props.config.forceFLV;
  }
  load(url) {
    const { hlsVersion, hlsOptions, dashVersion, flvVersion } = this.props.config;
    if (this.hls) {
      this.hls.destroy();
    }
    if (this.dash) {
      this.dash.reset();
    }
    if (this.shouldUseHLS(url)) {
      (0, import_utils.getSDK)(HLS_SDK_URL.replace("VERSION", hlsVersion), HLS_GLOBAL).then((Hls) => {
        this.hls = new Hls(hlsOptions);
        this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
          this.props.onReady();
        });
        this.hls.on(Hls.Events.ERROR, (e, data) => {
          this.props.onError(e, data, this.hls, Hls);
        });
        if (MATCH_CLOUDFLARE_STREAM.test(url)) {
          const id = url.match(MATCH_CLOUDFLARE_STREAM)[1];
          this.hls.loadSource(REPLACE_CLOUDFLARE_STREAM.replace("{id}", id));
        } else {
          this.hls.loadSource(url);
        }
        this.hls.attachMedia(this.player);
        this.props.onLoaded();
      });
    }
    if (this.shouldUseDASH(url)) {
      (0, import_utils.getSDK)(DASH_SDK_URL.replace("VERSION", dashVersion), DASH_GLOBAL).then((dashjs) => {
        this.dash = dashjs.MediaPlayer().create();
        this.dash.initialize(this.player, url, this.props.playing);
        this.dash.on("error", this.props.onError);
        if (parseInt(dashVersion) < 3) {
          this.dash.getDebug().setLogToBrowserConsole(false);
        } else {
          this.dash.updateSettings({ debug: { logLevel: dashjs.Debug.LOG_LEVEL_NONE } });
        }
        this.props.onLoaded();
      });
    }
    if (this.shouldUseFLV(url)) {
      (0, import_utils.getSDK)(FLV_SDK_URL.replace("VERSION", flvVersion), FLV_GLOBAL).then((flvjs) => {
        this.flv = flvjs.createPlayer({ type: "flv", url });
        this.flv.attachMediaElement(this.player);
        this.flv.on(flvjs.Events.ERROR, (e, data) => {
          this.props.onError(e, data, this.flv, flvjs);
        });
        this.flv.load();
        this.props.onLoaded();
      });
    }
    if (url instanceof Array) {
      this.player.load();
    } else if ((0, import_utils.isMediaStream)(url)) {
      try {
        this.player.srcObject = url;
      } catch (e) {
        this.player.src = window.URL.createObjectURL(url);
      }
    }
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
    this.player.removeAttribute("src");
    if (this.dash) {
      this.dash.reset();
    }
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
    } else if ((0, import_utils.supportsWebKitPresentationMode)(this.player) && this.player.webkitPresentationMode !== "picture-in-picture") {
      this.player.webkitSetPresentationMode("picture-in-picture");
    }
  }
  disablePIP() {
    if (document.exitPictureInPicture && document.pictureInPictureElement === this.player) {
      document.exitPictureInPicture();
    } else if ((0, import_utils.supportsWebKitPresentationMode)(this.player) && this.player.webkitPresentationMode !== "inline") {
      this.player.webkitSetPresentationMode("inline");
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
  getSource(url) {
    const useHLS = this.shouldUseHLS(url);
    const useDASH = this.shouldUseDASH(url);
    const useFLV = this.shouldUseFLV(url);
    if (url instanceof Array || (0, import_utils.isMediaStream)(url) || useHLS || useDASH || useFLV) {
      return void 0;
    }
    if (MATCH_DROPBOX_URL.test(url)) {
      return url.replace("www.dropbox.com", "dl.dropboxusercontent.com");
    }
    return url;
  }
  render() {
    const { url, playing, loop, controls, muted, config, width, height } = this.props;
    const useAudio = this.shouldUseAudio(this.props);
    const Element = useAudio ? "audio" : "video";
    const style = {
      width: width === "auto" ? width : "100%",
      height: height === "auto" ? height : "100%"
    };
    return /* @__PURE__ */ import_react.default.createElement(
      Element,
      {
        ref: this.ref,
        src: this.getSource(url),
        style,
        preload: "auto",
        autoPlay: playing || void 0,
        controls,
        muted,
        loop,
        ...config.attributes
      },
      url instanceof Array && url.map(this.renderSourceElement),
      config.tracks.map(this.renderTrack)
    );
  }
}
__publicField(FilePlayer, "displayName", "FilePlayer");
__publicField(FilePlayer, "canPlay", import_patterns.canPlay.file);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxxQkFBcUI7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFdBQVc7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksNkRBQTZEO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2VsZWN0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9yZWFjdC1wbGF5ZXIvbGliL3BsYXllcnMvRmlsZVBsYXllci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19jcmVhdGUgPSBPYmplY3QuY3JlYXRlO1xudmFyIF9fZGVmUHJvcCA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcbnZhciBfX2dldE93blByb3BEZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbnZhciBfX2dldE93blByb3BOYW1lcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzO1xudmFyIF9fZ2V0UHJvdG9PZiA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcbnZhciBfX2hhc093blByb3AgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIF9fZGVmTm9ybWFsUHJvcCA9IChvYmosIGtleSwgdmFsdWUpID0+IGtleSBpbiBvYmogPyBfX2RlZlByb3Aob2JqLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSwgdmFsdWUgfSkgOiBvYmpba2V5XSA9IHZhbHVlO1xudmFyIF9fZXhwb3J0ID0gKHRhcmdldCwgYWxsKSA9PiB7XG4gIGZvciAodmFyIG5hbWUgaW4gYWxsKVxuICAgIF9fZGVmUHJvcCh0YXJnZXQsIG5hbWUsIHsgZ2V0OiBhbGxbbmFtZV0sIGVudW1lcmFibGU6IHRydWUgfSk7XG59O1xudmFyIF9fY29weVByb3BzID0gKHRvLCBmcm9tLCBleGNlcHQsIGRlc2MpID0+IHtcbiAgaWYgKGZyb20gJiYgdHlwZW9mIGZyb20gPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGZyb20gPT09IFwiZnVuY3Rpb25cIikge1xuICAgIGZvciAobGV0IGtleSBvZiBfX2dldE93blByb3BOYW1lcyhmcm9tKSlcbiAgICAgIGlmICghX19oYXNPd25Qcm9wLmNhbGwodG8sIGtleSkgJiYga2V5ICE9PSBleGNlcHQpXG4gICAgICAgIF9fZGVmUHJvcCh0bywga2V5LCB7IGdldDogKCkgPT4gZnJvbVtrZXldLCBlbnVtZXJhYmxlOiAhKGRlc2MgPSBfX2dldE93blByb3BEZXNjKGZyb20sIGtleSkpIHx8IGRlc2MuZW51bWVyYWJsZSB9KTtcbiAgfVxuICByZXR1cm4gdG87XG59O1xudmFyIF9fdG9FU00gPSAobW9kLCBpc05vZGVNb2RlLCB0YXJnZXQpID0+ICh0YXJnZXQgPSBtb2QgIT0gbnVsbCA/IF9fY3JlYXRlKF9fZ2V0UHJvdG9PZihtb2QpKSA6IHt9LCBfX2NvcHlQcm9wcyhcbiAgLy8gSWYgdGhlIGltcG9ydGVyIGlzIGluIG5vZGUgY29tcGF0aWJpbGl0eSBtb2RlIG9yIHRoaXMgaXMgbm90IGFuIEVTTVxuICAvLyBmaWxlIHRoYXQgaGFzIGJlZW4gY29udmVydGVkIHRvIGEgQ29tbW9uSlMgZmlsZSB1c2luZyBhIEJhYmVsLVxuICAvLyBjb21wYXRpYmxlIHRyYW5zZm9ybSAoaS5lLiBcIl9fZXNNb2R1bGVcIiBoYXMgbm90IGJlZW4gc2V0KSwgdGhlbiBzZXRcbiAgLy8gXCJkZWZhdWx0XCIgdG8gdGhlIENvbW1vbkpTIFwibW9kdWxlLmV4cG9ydHNcIiBmb3Igbm9kZSBjb21wYXRpYmlsaXR5LlxuICBpc05vZGVNb2RlIHx8ICFtb2QgfHwgIW1vZC5fX2VzTW9kdWxlID8gX19kZWZQcm9wKHRhcmdldCwgXCJkZWZhdWx0XCIsIHsgdmFsdWU6IG1vZCwgZW51bWVyYWJsZTogdHJ1ZSB9KSA6IHRhcmdldCxcbiAgbW9kXG4pKTtcbnZhciBfX3RvQ29tbW9uSlMgPSAobW9kKSA9PiBfX2NvcHlQcm9wcyhfX2RlZlByb3Aoe30sIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pLCBtb2QpO1xudmFyIF9fcHVibGljRmllbGQgPSAob2JqLCBrZXksIHZhbHVlKSA9PiB7XG4gIF9fZGVmTm9ybWFsUHJvcChvYmosIHR5cGVvZiBrZXkgIT09IFwic3ltYm9sXCIgPyBrZXkgKyBcIlwiIDoga2V5LCB2YWx1ZSk7XG4gIHJldHVybiB2YWx1ZTtcbn07XG52YXIgRmlsZVBsYXllcl9leHBvcnRzID0ge307XG5fX2V4cG9ydChGaWxlUGxheWVyX2V4cG9ydHMsIHtcbiAgZGVmYXVsdDogKCkgPT4gRmlsZVBsYXllclxufSk7XG5tb2R1bGUuZXhwb3J0cyA9IF9fdG9Db21tb25KUyhGaWxlUGxheWVyX2V4cG9ydHMpO1xudmFyIGltcG9ydF9yZWFjdCA9IF9fdG9FU00ocmVxdWlyZShcInJlYWN0XCIpKTtcbnZhciBpbXBvcnRfdXRpbHMgPSByZXF1aXJlKFwiLi4vdXRpbHNcIik7XG52YXIgaW1wb3J0X3BhdHRlcm5zID0gcmVxdWlyZShcIi4uL3BhdHRlcm5zXCIpO1xuY29uc3QgSEFTX05BVklHQVRPUiA9IHR5cGVvZiBuYXZpZ2F0b3IgIT09IFwidW5kZWZpbmVkXCI7XG5jb25zdCBJU19JUEFEX1BSTyA9IEhBU19OQVZJR0FUT1IgJiYgbmF2aWdhdG9yLnBsYXRmb3JtID09PSBcIk1hY0ludGVsXCIgJiYgbmF2aWdhdG9yLm1heFRvdWNoUG9pbnRzID4gMTtcbmNvbnN0IElTX0lPUyA9IEhBU19OQVZJR0FUT1IgJiYgKC9pUGFkfGlQaG9uZXxpUG9kLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpIHx8IElTX0lQQURfUFJPKSAmJiAhd2luZG93Lk1TU3RyZWFtO1xuY29uc3QgSVNfU0FGQVJJID0gSEFTX05BVklHQVRPUiAmJiAvXigoPyFjaHJvbWV8YW5kcm9pZCkuKSpzYWZhcmkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpICYmICF3aW5kb3cuTVNTdHJlYW07XG5jb25zdCBITFNfU0RLX1VSTCA9IFwiaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9obHMuanNAVkVSU0lPTi9kaXN0L2hscy5taW4uanNcIjtcbmNvbnN0IEhMU19HTE9CQUwgPSBcIkhsc1wiO1xuY29uc3QgREFTSF9TREtfVVJMID0gXCJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9kYXNoanMvVkVSU0lPTi9kYXNoLmFsbC5taW4uanNcIjtcbmNvbnN0IERBU0hfR0xPQkFMID0gXCJkYXNoanNcIjtcbmNvbnN0IEZMVl9TREtfVVJMID0gXCJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL2Zsdi5qc0BWRVJTSU9OL2Rpc3QvZmx2Lm1pbi5qc1wiO1xuY29uc3QgRkxWX0dMT0JBTCA9IFwiZmx2anNcIjtcbmNvbnN0IE1BVENIX0RST1BCT1hfVVJMID0gL3d3d1xcLmRyb3Bib3hcXC5jb21cXC8uKy87XG5jb25zdCBNQVRDSF9DTE9VREZMQVJFX1NUUkVBTSA9IC9odHRwczpcXC9cXC93YXRjaFxcLmNsb3VkZmxhcmVzdHJlYW1cXC5jb21cXC8oW2EtejAtOV0rKS87XG5jb25zdCBSRVBMQUNFX0NMT1VERkxBUkVfU1RSRUFNID0gXCJodHRwczovL3ZpZGVvZGVsaXZlcnkubmV0L3tpZH0vbWFuaWZlc3QvdmlkZW8ubTN1OFwiO1xuY2xhc3MgRmlsZVBsYXllciBleHRlbmRzIGltcG9ydF9yZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgIC8vIFByb3h5IG1ldGhvZHMgdG8gcHJldmVudCBsaXN0ZW5lciBsZWFrc1xuICAgIF9fcHVibGljRmllbGQodGhpcywgXCJvblJlYWR5XCIsICguLi5hcmdzKSA9PiB0aGlzLnByb3BzLm9uUmVhZHkoLi4uYXJncykpO1xuICAgIF9fcHVibGljRmllbGQodGhpcywgXCJvblBsYXlcIiwgKC4uLmFyZ3MpID0+IHRoaXMucHJvcHMub25QbGF5KC4uLmFyZ3MpKTtcbiAgICBfX3B1YmxpY0ZpZWxkKHRoaXMsIFwib25CdWZmZXJcIiwgKC4uLmFyZ3MpID0+IHRoaXMucHJvcHMub25CdWZmZXIoLi4uYXJncykpO1xuICAgIF9fcHVibGljRmllbGQodGhpcywgXCJvbkJ1ZmZlckVuZFwiLCAoLi4uYXJncykgPT4gdGhpcy5wcm9wcy5vbkJ1ZmZlckVuZCguLi5hcmdzKSk7XG4gICAgX19wdWJsaWNGaWVsZCh0aGlzLCBcIm9uUGF1c2VcIiwgKC4uLmFyZ3MpID0+IHRoaXMucHJvcHMub25QYXVzZSguLi5hcmdzKSk7XG4gICAgX19wdWJsaWNGaWVsZCh0aGlzLCBcIm9uRW5kZWRcIiwgKC4uLmFyZ3MpID0+IHRoaXMucHJvcHMub25FbmRlZCguLi5hcmdzKSk7XG4gICAgX19wdWJsaWNGaWVsZCh0aGlzLCBcIm9uRXJyb3JcIiwgKC4uLmFyZ3MpID0+IHRoaXMucHJvcHMub25FcnJvciguLi5hcmdzKSk7XG4gICAgX19wdWJsaWNGaWVsZCh0aGlzLCBcIm9uUGxheUJhY2tSYXRlQ2hhbmdlXCIsIChldmVudCkgPT4gdGhpcy5wcm9wcy5vblBsYXliYWNrUmF0ZUNoYW5nZShldmVudC50YXJnZXQucGxheWJhY2tSYXRlKSk7XG4gICAgX19wdWJsaWNGaWVsZCh0aGlzLCBcIm9uRW5hYmxlUElQXCIsICguLi5hcmdzKSA9PiB0aGlzLnByb3BzLm9uRW5hYmxlUElQKC4uLmFyZ3MpKTtcbiAgICBfX3B1YmxpY0ZpZWxkKHRoaXMsIFwib25EaXNhYmxlUElQXCIsIChlKSA9PiB7XG4gICAgICBjb25zdCB7IG9uRGlzYWJsZVBJUCwgcGxheWluZyB9ID0gdGhpcy5wcm9wcztcbiAgICAgIG9uRGlzYWJsZVBJUChlKTtcbiAgICAgIGlmIChwbGF5aW5nKSB7XG4gICAgICAgIHRoaXMucGxheSgpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIF9fcHVibGljRmllbGQodGhpcywgXCJvblByZXNlbnRhdGlvbk1vZGVDaGFuZ2VcIiwgKGUpID0+IHtcbiAgICAgIGlmICh0aGlzLnBsYXllciAmJiAoMCwgaW1wb3J0X3V0aWxzLnN1cHBvcnRzV2ViS2l0UHJlc2VudGF0aW9uTW9kZSkodGhpcy5wbGF5ZXIpKSB7XG4gICAgICAgIGNvbnN0IHsgd2Via2l0UHJlc2VudGF0aW9uTW9kZSB9ID0gdGhpcy5wbGF5ZXI7XG4gICAgICAgIGlmICh3ZWJraXRQcmVzZW50YXRpb25Nb2RlID09PSBcInBpY3R1cmUtaW4tcGljdHVyZVwiKSB7XG4gICAgICAgICAgdGhpcy5vbkVuYWJsZVBJUChlKTtcbiAgICAgICAgfSBlbHNlIGlmICh3ZWJraXRQcmVzZW50YXRpb25Nb2RlID09PSBcImlubGluZVwiKSB7XG4gICAgICAgICAgdGhpcy5vbkRpc2FibGVQSVAoZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICBfX3B1YmxpY0ZpZWxkKHRoaXMsIFwib25TZWVrXCIsIChlKSA9PiB7XG4gICAgICB0aGlzLnByb3BzLm9uU2VlayhlLnRhcmdldC5jdXJyZW50VGltZSk7XG4gICAgfSk7XG4gICAgX19wdWJsaWNGaWVsZCh0aGlzLCBcIm11dGVcIiwgKCkgPT4ge1xuICAgICAgdGhpcy5wbGF5ZXIubXV0ZWQgPSB0cnVlO1xuICAgIH0pO1xuICAgIF9fcHVibGljRmllbGQodGhpcywgXCJ1bm11dGVcIiwgKCkgPT4ge1xuICAgICAgdGhpcy5wbGF5ZXIubXV0ZWQgPSBmYWxzZTtcbiAgICB9KTtcbiAgICBfX3B1YmxpY0ZpZWxkKHRoaXMsIFwicmVuZGVyU291cmNlRWxlbWVudFwiLCAoc291cmNlLCBpbmRleCkgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBzb3VyY2UgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBpbXBvcnRfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic291cmNlXCIsIHsga2V5OiBpbmRleCwgc3JjOiBzb3VyY2UgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gLyogQF9fUFVSRV9fICovIGltcG9ydF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzb3VyY2VcIiwgeyBrZXk6IGluZGV4LCAuLi5zb3VyY2UgfSk7XG4gICAgfSk7XG4gICAgX19wdWJsaWNGaWVsZCh0aGlzLCBcInJlbmRlclRyYWNrXCIsICh0cmFjaywgaW5kZXgpID0+IHtcbiAgICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8gaW1wb3J0X3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInRyYWNrXCIsIHsga2V5OiBpbmRleCwgLi4udHJhY2sgfSk7XG4gICAgfSk7XG4gICAgX19wdWJsaWNGaWVsZCh0aGlzLCBcInJlZlwiLCAocGxheWVyKSA9PiB7XG4gICAgICBpZiAodGhpcy5wbGF5ZXIpIHtcbiAgICAgICAgdGhpcy5wcmV2UGxheWVyID0gdGhpcy5wbGF5ZXI7XG4gICAgICB9XG4gICAgICB0aGlzLnBsYXllciA9IHBsYXllcjtcbiAgICB9KTtcbiAgfVxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLnByb3BzLm9uTW91bnQgJiYgdGhpcy5wcm9wcy5vbk1vdW50KHRoaXMpO1xuICAgIHRoaXMuYWRkTGlzdGVuZXJzKHRoaXMucGxheWVyKTtcbiAgICBjb25zdCBzcmMgPSB0aGlzLmdldFNvdXJjZSh0aGlzLnByb3BzLnVybCk7XG4gICAgaWYgKHNyYykge1xuICAgICAgdGhpcy5wbGF5ZXIuc3JjID0gc3JjO1xuICAgIH1cbiAgICBpZiAoSVNfSU9TIHx8IHRoaXMucHJvcHMuY29uZmlnLmZvcmNlRGlzYWJsZUhscykge1xuICAgICAgdGhpcy5wbGF5ZXIubG9hZCgpO1xuICAgIH1cbiAgfVxuICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzKSB7XG4gICAgaWYgKHRoaXMuc2hvdWxkVXNlQXVkaW8odGhpcy5wcm9wcykgIT09IHRoaXMuc2hvdWxkVXNlQXVkaW8ocHJldlByb3BzKSkge1xuICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcnModGhpcy5wcmV2UGxheWVyLCBwcmV2UHJvcHMudXJsKTtcbiAgICAgIHRoaXMuYWRkTGlzdGVuZXJzKHRoaXMucGxheWVyKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMudXJsICE9PSBwcmV2UHJvcHMudXJsICYmICEoMCwgaW1wb3J0X3V0aWxzLmlzTWVkaWFTdHJlYW0pKHRoaXMucHJvcHMudXJsKSAmJiAhKHRoaXMucHJvcHMudXJsIGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgICB0aGlzLnBsYXllci5zcmNPYmplY3QgPSBudWxsO1xuICAgIH1cbiAgfVxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB0aGlzLnBsYXllci5yZW1vdmVBdHRyaWJ1dGUoXCJzcmNcIik7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcnModGhpcy5wbGF5ZXIpO1xuICAgIGlmICh0aGlzLmhscykge1xuICAgICAgdGhpcy5obHMuZGVzdHJveSgpO1xuICAgIH1cbiAgfVxuICBhZGRMaXN0ZW5lcnMocGxheWVyKSB7XG4gICAgY29uc3QgeyB1cmwsIHBsYXlzaW5saW5lIH0gPSB0aGlzLnByb3BzO1xuICAgIHBsYXllci5hZGRFdmVudExpc3RlbmVyKFwicGxheVwiLCB0aGlzLm9uUGxheSk7XG4gICAgcGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoXCJ3YWl0aW5nXCIsIHRoaXMub25CdWZmZXIpO1xuICAgIHBsYXllci5hZGRFdmVudExpc3RlbmVyKFwicGxheWluZ1wiLCB0aGlzLm9uQnVmZmVyRW5kKTtcbiAgICBwbGF5ZXIuYWRkRXZlbnRMaXN0ZW5lcihcInBhdXNlXCIsIHRoaXMub25QYXVzZSk7XG4gICAgcGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoXCJzZWVrZWRcIiwgdGhpcy5vblNlZWspO1xuICAgIHBsYXllci5hZGRFdmVudExpc3RlbmVyKFwiZW5kZWRcIiwgdGhpcy5vbkVuZGVkKTtcbiAgICBwbGF5ZXIuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIHRoaXMub25FcnJvcik7XG4gICAgcGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoXCJyYXRlY2hhbmdlXCIsIHRoaXMub25QbGF5QmFja1JhdGVDaGFuZ2UpO1xuICAgIHBsYXllci5hZGRFdmVudExpc3RlbmVyKFwiZW50ZXJwaWN0dXJlaW5waWN0dXJlXCIsIHRoaXMub25FbmFibGVQSVApO1xuICAgIHBsYXllci5hZGRFdmVudExpc3RlbmVyKFwibGVhdmVwaWN0dXJlaW5waWN0dXJlXCIsIHRoaXMub25EaXNhYmxlUElQKTtcbiAgICBwbGF5ZXIuYWRkRXZlbnRMaXN0ZW5lcihcIndlYmtpdHByZXNlbnRhdGlvbm1vZGVjaGFuZ2VkXCIsIHRoaXMub25QcmVzZW50YXRpb25Nb2RlQ2hhbmdlKTtcbiAgICBpZiAoIXRoaXMuc2hvdWxkVXNlSExTKHVybCkpIHtcbiAgICAgIHBsYXllci5hZGRFdmVudExpc3RlbmVyKFwiY2FucGxheVwiLCB0aGlzLm9uUmVhZHkpO1xuICAgIH1cbiAgICBpZiAocGxheXNpbmxpbmUpIHtcbiAgICAgIHBsYXllci5zZXRBdHRyaWJ1dGUoXCJwbGF5c2lubGluZVwiLCBcIlwiKTtcbiAgICAgIHBsYXllci5zZXRBdHRyaWJ1dGUoXCJ3ZWJraXQtcGxheXNpbmxpbmVcIiwgXCJcIik7XG4gICAgICBwbGF5ZXIuc2V0QXR0cmlidXRlKFwieDUtcGxheXNpbmxpbmVcIiwgXCJcIik7XG4gICAgfVxuICB9XG4gIHJlbW92ZUxpc3RlbmVycyhwbGF5ZXIsIHVybCkge1xuICAgIHBsYXllci5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2FucGxheVwiLCB0aGlzLm9uUmVhZHkpO1xuICAgIHBsYXllci5yZW1vdmVFdmVudExpc3RlbmVyKFwicGxheVwiLCB0aGlzLm9uUGxheSk7XG4gICAgcGxheWVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ3YWl0aW5nXCIsIHRoaXMub25CdWZmZXIpO1xuICAgIHBsYXllci5yZW1vdmVFdmVudExpc3RlbmVyKFwicGxheWluZ1wiLCB0aGlzLm9uQnVmZmVyRW5kKTtcbiAgICBwbGF5ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBhdXNlXCIsIHRoaXMub25QYXVzZSk7XG4gICAgcGxheWVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzZWVrZWRcIiwgdGhpcy5vblNlZWspO1xuICAgIHBsYXllci5yZW1vdmVFdmVudExpc3RlbmVyKFwiZW5kZWRcIiwgdGhpcy5vbkVuZGVkKTtcbiAgICBwbGF5ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIHRoaXMub25FcnJvcik7XG4gICAgcGxheWVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyYXRlY2hhbmdlXCIsIHRoaXMub25QbGF5QmFja1JhdGVDaGFuZ2UpO1xuICAgIHBsYXllci5yZW1vdmVFdmVudExpc3RlbmVyKFwiZW50ZXJwaWN0dXJlaW5waWN0dXJlXCIsIHRoaXMub25FbmFibGVQSVApO1xuICAgIHBsYXllci5yZW1vdmVFdmVudExpc3RlbmVyKFwibGVhdmVwaWN0dXJlaW5waWN0dXJlXCIsIHRoaXMub25EaXNhYmxlUElQKTtcbiAgICBwbGF5ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIndlYmtpdHByZXNlbnRhdGlvbm1vZGVjaGFuZ2VkXCIsIHRoaXMub25QcmVzZW50YXRpb25Nb2RlQ2hhbmdlKTtcbiAgICBpZiAoIXRoaXMuc2hvdWxkVXNlSExTKHVybCkpIHtcbiAgICAgIHBsYXllci5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2FucGxheVwiLCB0aGlzLm9uUmVhZHkpO1xuICAgIH1cbiAgfVxuICBzaG91bGRVc2VBdWRpbyhwcm9wcykge1xuICAgIGlmIChwcm9wcy5jb25maWcuZm9yY2VWaWRlbykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAocHJvcHMuY29uZmlnLmF0dHJpYnV0ZXMucG9zdGVyKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBpbXBvcnRfcGF0dGVybnMuQVVESU9fRVhURU5TSU9OUy50ZXN0KHByb3BzLnVybCkgfHwgcHJvcHMuY29uZmlnLmZvcmNlQXVkaW87XG4gIH1cbiAgc2hvdWxkVXNlSExTKHVybCkge1xuICAgIGlmIChJU19TQUZBUkkgJiYgdGhpcy5wcm9wcy5jb25maWcuZm9yY2VTYWZhcmlITFMgfHwgdGhpcy5wcm9wcy5jb25maWcuZm9yY2VITFMpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAoSVNfSU9TIHx8IHRoaXMucHJvcHMuY29uZmlnLmZvcmNlRGlzYWJsZUhscykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gaW1wb3J0X3BhdHRlcm5zLkhMU19FWFRFTlNJT05TLnRlc3QodXJsKSB8fCBNQVRDSF9DTE9VREZMQVJFX1NUUkVBTS50ZXN0KHVybCk7XG4gIH1cbiAgc2hvdWxkVXNlREFTSCh1cmwpIHtcbiAgICByZXR1cm4gaW1wb3J0X3BhdHRlcm5zLkRBU0hfRVhURU5TSU9OUy50ZXN0KHVybCkgfHwgdGhpcy5wcm9wcy5jb25maWcuZm9yY2VEQVNIO1xuICB9XG4gIHNob3VsZFVzZUZMVih1cmwpIHtcbiAgICByZXR1cm4gaW1wb3J0X3BhdHRlcm5zLkZMVl9FWFRFTlNJT05TLnRlc3QodXJsKSB8fCB0aGlzLnByb3BzLmNvbmZpZy5mb3JjZUZMVjtcbiAgfVxuICBsb2FkKHVybCkge1xuICAgIGNvbnN0IHsgaGxzVmVyc2lvbiwgaGxzT3B0aW9ucywgZGFzaFZlcnNpb24sIGZsdlZlcnNpb24gfSA9IHRoaXMucHJvcHMuY29uZmlnO1xuICAgIGlmICh0aGlzLmhscykge1xuICAgICAgdGhpcy5obHMuZGVzdHJveSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5kYXNoKSB7XG4gICAgICB0aGlzLmRhc2gucmVzZXQoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuc2hvdWxkVXNlSExTKHVybCkpIHtcbiAgICAgICgwLCBpbXBvcnRfdXRpbHMuZ2V0U0RLKShITFNfU0RLX1VSTC5yZXBsYWNlKFwiVkVSU0lPTlwiLCBobHNWZXJzaW9uKSwgSExTX0dMT0JBTCkudGhlbigoSGxzKSA9PiB7XG4gICAgICAgIHRoaXMuaGxzID0gbmV3IEhscyhobHNPcHRpb25zKTtcbiAgICAgICAgdGhpcy5obHMub24oSGxzLkV2ZW50cy5NQU5JRkVTVF9QQVJTRUQsICgpID0+IHtcbiAgICAgICAgICB0aGlzLnByb3BzLm9uUmVhZHkoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuaGxzLm9uKEhscy5FdmVudHMuRVJST1IsIChlLCBkYXRhKSA9PiB7XG4gICAgICAgICAgdGhpcy5wcm9wcy5vbkVycm9yKGUsIGRhdGEsIHRoaXMuaGxzLCBIbHMpO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKE1BVENIX0NMT1VERkxBUkVfU1RSRUFNLnRlc3QodXJsKSkge1xuICAgICAgICAgIGNvbnN0IGlkID0gdXJsLm1hdGNoKE1BVENIX0NMT1VERkxBUkVfU1RSRUFNKVsxXTtcbiAgICAgICAgICB0aGlzLmhscy5sb2FkU291cmNlKFJFUExBQ0VfQ0xPVURGTEFSRV9TVFJFQU0ucmVwbGFjZShcIntpZH1cIiwgaWQpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmhscy5sb2FkU291cmNlKHVybCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5obHMuYXR0YWNoTWVkaWEodGhpcy5wbGF5ZXIpO1xuICAgICAgICB0aGlzLnByb3BzLm9uTG9hZGVkKCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKHRoaXMuc2hvdWxkVXNlREFTSCh1cmwpKSB7XG4gICAgICAoMCwgaW1wb3J0X3V0aWxzLmdldFNESykoREFTSF9TREtfVVJMLnJlcGxhY2UoXCJWRVJTSU9OXCIsIGRhc2hWZXJzaW9uKSwgREFTSF9HTE9CQUwpLnRoZW4oKGRhc2hqcykgPT4ge1xuICAgICAgICB0aGlzLmRhc2ggPSBkYXNoanMuTWVkaWFQbGF5ZXIoKS5jcmVhdGUoKTtcbiAgICAgICAgdGhpcy5kYXNoLmluaXRpYWxpemUodGhpcy5wbGF5ZXIsIHVybCwgdGhpcy5wcm9wcy5wbGF5aW5nKTtcbiAgICAgICAgdGhpcy5kYXNoLm9uKFwiZXJyb3JcIiwgdGhpcy5wcm9wcy5vbkVycm9yKTtcbiAgICAgICAgaWYgKHBhcnNlSW50KGRhc2hWZXJzaW9uKSA8IDMpIHtcbiAgICAgICAgICB0aGlzLmRhc2guZ2V0RGVidWcoKS5zZXRMb2dUb0Jyb3dzZXJDb25zb2xlKGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmRhc2gudXBkYXRlU2V0dGluZ3MoeyBkZWJ1ZzogeyBsb2dMZXZlbDogZGFzaGpzLkRlYnVnLkxPR19MRVZFTF9OT05FIH0gfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcm9wcy5vbkxvYWRlZCgpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGlmICh0aGlzLnNob3VsZFVzZUZMVih1cmwpKSB7XG4gICAgICAoMCwgaW1wb3J0X3V0aWxzLmdldFNESykoRkxWX1NES19VUkwucmVwbGFjZShcIlZFUlNJT05cIiwgZmx2VmVyc2lvbiksIEZMVl9HTE9CQUwpLnRoZW4oKGZsdmpzKSA9PiB7XG4gICAgICAgIHRoaXMuZmx2ID0gZmx2anMuY3JlYXRlUGxheWVyKHsgdHlwZTogXCJmbHZcIiwgdXJsIH0pO1xuICAgICAgICB0aGlzLmZsdi5hdHRhY2hNZWRpYUVsZW1lbnQodGhpcy5wbGF5ZXIpO1xuICAgICAgICB0aGlzLmZsdi5vbihmbHZqcy5FdmVudHMuRVJST1IsIChlLCBkYXRhKSA9PiB7XG4gICAgICAgICAgdGhpcy5wcm9wcy5vbkVycm9yKGUsIGRhdGEsIHRoaXMuZmx2LCBmbHZqcyk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmZsdi5sb2FkKCk7XG4gICAgICAgIHRoaXMucHJvcHMub25Mb2FkZWQoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAodXJsIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIHRoaXMucGxheWVyLmxvYWQoKTtcbiAgICB9IGVsc2UgaWYgKCgwLCBpbXBvcnRfdXRpbHMuaXNNZWRpYVN0cmVhbSkodXJsKSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy5wbGF5ZXIuc3JjT2JqZWN0ID0gdXJsO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0aGlzLnBsYXllci5zcmMgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTCh1cmwpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBwbGF5KCkge1xuICAgIGNvbnN0IHByb21pc2UgPSB0aGlzLnBsYXllci5wbGF5KCk7XG4gICAgaWYgKHByb21pc2UpIHtcbiAgICAgIHByb21pc2UuY2F0Y2godGhpcy5wcm9wcy5vbkVycm9yKTtcbiAgICB9XG4gIH1cbiAgcGF1c2UoKSB7XG4gICAgdGhpcy5wbGF5ZXIucGF1c2UoKTtcbiAgfVxuICBzdG9wKCkge1xuICAgIHRoaXMucGxheWVyLnJlbW92ZUF0dHJpYnV0ZShcInNyY1wiKTtcbiAgICBpZiAodGhpcy5kYXNoKSB7XG4gICAgICB0aGlzLmRhc2gucmVzZXQoKTtcbiAgICB9XG4gIH1cbiAgc2Vla1RvKHNlY29uZHMsIGtlZXBQbGF5aW5nID0gdHJ1ZSkge1xuICAgIHRoaXMucGxheWVyLmN1cnJlbnRUaW1lID0gc2Vjb25kcztcbiAgICBpZiAoIWtlZXBQbGF5aW5nKSB7XG4gICAgICB0aGlzLnBhdXNlKCk7XG4gICAgfVxuICB9XG4gIHNldFZvbHVtZShmcmFjdGlvbikge1xuICAgIHRoaXMucGxheWVyLnZvbHVtZSA9IGZyYWN0aW9uO1xuICB9XG4gIGVuYWJsZVBJUCgpIHtcbiAgICBpZiAodGhpcy5wbGF5ZXIucmVxdWVzdFBpY3R1cmVJblBpY3R1cmUgJiYgZG9jdW1lbnQucGljdHVyZUluUGljdHVyZUVsZW1lbnQgIT09IHRoaXMucGxheWVyKSB7XG4gICAgICB0aGlzLnBsYXllci5yZXF1ZXN0UGljdHVyZUluUGljdHVyZSgpO1xuICAgIH0gZWxzZSBpZiAoKDAsIGltcG9ydF91dGlscy5zdXBwb3J0c1dlYktpdFByZXNlbnRhdGlvbk1vZGUpKHRoaXMucGxheWVyKSAmJiB0aGlzLnBsYXllci53ZWJraXRQcmVzZW50YXRpb25Nb2RlICE9PSBcInBpY3R1cmUtaW4tcGljdHVyZVwiKSB7XG4gICAgICB0aGlzLnBsYXllci53ZWJraXRTZXRQcmVzZW50YXRpb25Nb2RlKFwicGljdHVyZS1pbi1waWN0dXJlXCIpO1xuICAgIH1cbiAgfVxuICBkaXNhYmxlUElQKCkge1xuICAgIGlmIChkb2N1bWVudC5leGl0UGljdHVyZUluUGljdHVyZSAmJiBkb2N1bWVudC5waWN0dXJlSW5QaWN0dXJlRWxlbWVudCA9PT0gdGhpcy5wbGF5ZXIpIHtcbiAgICAgIGRvY3VtZW50LmV4aXRQaWN0dXJlSW5QaWN0dXJlKCk7XG4gICAgfSBlbHNlIGlmICgoMCwgaW1wb3J0X3V0aWxzLnN1cHBvcnRzV2ViS2l0UHJlc2VudGF0aW9uTW9kZSkodGhpcy5wbGF5ZXIpICYmIHRoaXMucGxheWVyLndlYmtpdFByZXNlbnRhdGlvbk1vZGUgIT09IFwiaW5saW5lXCIpIHtcbiAgICAgIHRoaXMucGxheWVyLndlYmtpdFNldFByZXNlbnRhdGlvbk1vZGUoXCJpbmxpbmVcIik7XG4gICAgfVxuICB9XG4gIHNldFBsYXliYWNrUmF0ZShyYXRlKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMucGxheWVyLnBsYXliYWNrUmF0ZSA9IHJhdGU7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRoaXMucHJvcHMub25FcnJvcihlcnJvcik7XG4gICAgfVxuICB9XG4gIGdldER1cmF0aW9uKCkge1xuICAgIGlmICghdGhpcy5wbGF5ZXIpXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICBjb25zdCB7IGR1cmF0aW9uLCBzZWVrYWJsZSB9ID0gdGhpcy5wbGF5ZXI7XG4gICAgaWYgKGR1cmF0aW9uID09PSBJbmZpbml0eSAmJiBzZWVrYWJsZS5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gc2Vla2FibGUuZW5kKHNlZWthYmxlLmxlbmd0aCAtIDEpO1xuICAgIH1cbiAgICByZXR1cm4gZHVyYXRpb247XG4gIH1cbiAgZ2V0Q3VycmVudFRpbWUoKSB7XG4gICAgaWYgKCF0aGlzLnBsYXllcilcbiAgICAgIHJldHVybiBudWxsO1xuICAgIHJldHVybiB0aGlzLnBsYXllci5jdXJyZW50VGltZTtcbiAgfVxuICBnZXRTZWNvbmRzTG9hZGVkKCkge1xuICAgIGlmICghdGhpcy5wbGF5ZXIpXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICBjb25zdCB7IGJ1ZmZlcmVkIH0gPSB0aGlzLnBsYXllcjtcbiAgICBpZiAoYnVmZmVyZWQubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgY29uc3QgZW5kID0gYnVmZmVyZWQuZW5kKGJ1ZmZlcmVkLmxlbmd0aCAtIDEpO1xuICAgIGNvbnN0IGR1cmF0aW9uID0gdGhpcy5nZXREdXJhdGlvbigpO1xuICAgIGlmIChlbmQgPiBkdXJhdGlvbikge1xuICAgICAgcmV0dXJuIGR1cmF0aW9uO1xuICAgIH1cbiAgICByZXR1cm4gZW5kO1xuICB9XG4gIGdldFNvdXJjZSh1cmwpIHtcbiAgICBjb25zdCB1c2VITFMgPSB0aGlzLnNob3VsZFVzZUhMUyh1cmwpO1xuICAgIGNvbnN0IHVzZURBU0ggPSB0aGlzLnNob3VsZFVzZURBU0godXJsKTtcbiAgICBjb25zdCB1c2VGTFYgPSB0aGlzLnNob3VsZFVzZUZMVih1cmwpO1xuICAgIGlmICh1cmwgaW5zdGFuY2VvZiBBcnJheSB8fCAoMCwgaW1wb3J0X3V0aWxzLmlzTWVkaWFTdHJlYW0pKHVybCkgfHwgdXNlSExTIHx8IHVzZURBU0ggfHwgdXNlRkxWKSB7XG4gICAgICByZXR1cm4gdm9pZCAwO1xuICAgIH1cbiAgICBpZiAoTUFUQ0hfRFJPUEJPWF9VUkwudGVzdCh1cmwpKSB7XG4gICAgICByZXR1cm4gdXJsLnJlcGxhY2UoXCJ3d3cuZHJvcGJveC5jb21cIiwgXCJkbC5kcm9wYm94dXNlcmNvbnRlbnQuY29tXCIpO1xuICAgIH1cbiAgICByZXR1cm4gdXJsO1xuICB9XG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHVybCwgcGxheWluZywgbG9vcCwgY29udHJvbHMsIG11dGVkLCBjb25maWcsIHdpZHRoLCBoZWlnaHQgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgdXNlQXVkaW8gPSB0aGlzLnNob3VsZFVzZUF1ZGlvKHRoaXMucHJvcHMpO1xuICAgIGNvbnN0IEVsZW1lbnQgPSB1c2VBdWRpbyA/IFwiYXVkaW9cIiA6IFwidmlkZW9cIjtcbiAgICBjb25zdCBzdHlsZSA9IHtcbiAgICAgIHdpZHRoOiB3aWR0aCA9PT0gXCJhdXRvXCIgPyB3aWR0aCA6IFwiMTAwJVwiLFxuICAgICAgaGVpZ2h0OiBoZWlnaHQgPT09IFwiYXV0b1wiID8gaGVpZ2h0IDogXCIxMDAlXCJcbiAgICB9O1xuICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8gaW1wb3J0X3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgIEVsZW1lbnQsXG4gICAgICB7XG4gICAgICAgIHJlZjogdGhpcy5yZWYsXG4gICAgICAgIHNyYzogdGhpcy5nZXRTb3VyY2UodXJsKSxcbiAgICAgICAgc3R5bGUsXG4gICAgICAgIHByZWxvYWQ6IFwiYXV0b1wiLFxuICAgICAgICBhdXRvUGxheTogcGxheWluZyB8fCB2b2lkIDAsXG4gICAgICAgIGNvbnRyb2xzLFxuICAgICAgICBtdXRlZCxcbiAgICAgICAgbG9vcCxcbiAgICAgICAgLi4uY29uZmlnLmF0dHJpYnV0ZXNcbiAgICAgIH0sXG4gICAgICB1cmwgaW5zdGFuY2VvZiBBcnJheSAmJiB1cmwubWFwKHRoaXMucmVuZGVyU291cmNlRWxlbWVudCksXG4gICAgICBjb25maWcudHJhY2tzLm1hcCh0aGlzLnJlbmRlclRyYWNrKVxuICAgICk7XG4gIH1cbn1cbl9fcHVibGljRmllbGQoRmlsZVBsYXllciwgXCJkaXNwbGF5TmFtZVwiLCBcIkZpbGVQbGF5ZXJcIik7XG5fX3B1YmxpY0ZpZWxkKEZpbGVQbGF5ZXIsIFwiY2FuUGxheVwiLCBpbXBvcnRfcGF0dGVybnMuY2FuUGxheS5maWxlKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==