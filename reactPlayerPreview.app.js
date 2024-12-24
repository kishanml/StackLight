(global["webpackChunkelectron_app"] = global["webpackChunkelectron_app"] || []).push([["reactPlayerPreview"],{

/***/ "./node_modules/react-player/lib/Preview.js":
/*!**************************************************!*\
  !*** ./node_modules/react-player/lib/Preview.js ***!
  \**************************************************/
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
var Preview_exports = {};
__export(Preview_exports, {
  default: () => Preview
});
module.exports = __toCommonJS(Preview_exports);
var import_react = __toESM(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const ICON_SIZE = "64px";
const cache = {};
class Preview extends import_react.Component {
  constructor() {
    super(...arguments);
    __publicField(this, "mounted", false);
    __publicField(this, "state", {
      image: null
    });
    __publicField(this, "handleKeyPress", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        this.props.onClick();
      }
    });
  }
  componentDidMount() {
    this.mounted = true;
    this.fetchImage(this.props);
  }
  componentDidUpdate(prevProps) {
    const { url, light } = this.props;
    if (prevProps.url !== url || prevProps.light !== light) {
      this.fetchImage(this.props);
    }
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  fetchImage({ url, light, oEmbedUrl }) {
    if (import_react.default.isValidElement(light)) {
      return;
    }
    if (typeof light === "string") {
      this.setState({ image: light });
      return;
    }
    if (cache[url]) {
      this.setState({ image: cache[url] });
      return;
    }
    this.setState({ image: null });
    return window.fetch(oEmbedUrl.replace("{url}", url)).then((response) => response.json()).then((data) => {
      if (data.thumbnail_url && this.mounted) {
        const image = data.thumbnail_url.replace("height=100", "height=480").replace("-d_295x166", "-d_640");
        this.setState({ image });
        cache[url] = image;
      }
    });
  }
  render() {
    const { light, onClick, playIcon, previewTabIndex, previewAriaLabel } = this.props;
    const { image } = this.state;
    const isElement = import_react.default.isValidElement(light);
    const flexCenter = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    };
    const styles = {
      preview: {
        width: "100%",
        height: "100%",
        backgroundImage: image && !isElement ? `url(${image})` : void 0,
        backgroundSize: "cover",
        backgroundPosition: "center",
        cursor: "pointer",
        ...flexCenter
      },
      shadow: {
        background: "radial-gradient(rgb(0, 0, 0, 0.3), rgba(0, 0, 0, 0) 60%)",
        borderRadius: ICON_SIZE,
        width: ICON_SIZE,
        height: ICON_SIZE,
        position: isElement ? "absolute" : void 0,
        ...flexCenter
      },
      playIcon: {
        borderStyle: "solid",
        borderWidth: "16px 0 16px 26px",
        borderColor: "transparent transparent transparent white",
        marginLeft: "7px"
      }
    };
    const defaultPlayIcon = /* @__PURE__ */ import_react.default.createElement("div", { style: styles.shadow, className: "react-player__shadow" }, /* @__PURE__ */ import_react.default.createElement("div", { style: styles.playIcon, className: "react-player__play-icon" }));
    return /* @__PURE__ */ import_react.default.createElement(
      "div",
      {
        style: styles.preview,
        className: "react-player__preview",
        onClick,
        tabIndex: previewTabIndex,
        onKeyPress: this.handleKeyPress,
        ...previewAriaLabel ? { "aria-label": previewAriaLabel } : {}
      },
      isElement ? light : null,
      playIcon || defaultPlayIcon
    );
  }
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhY3RQbGF5ZXJQcmV2aWV3LmFwcC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhFQUE4RSw2REFBNkQ7QUFDM0k7QUFDQTtBQUNBLDhCQUE4QixrQ0FBa0M7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2Qiw0RkFBNEY7QUFDekg7QUFDQTtBQUNBO0FBQ0EsbUdBQW1HO0FBQ25HO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUVBQXlFLDhCQUE4QjtBQUN2RztBQUNBO0FBQ0Esb0RBQW9ELGtCQUFrQixhQUFhO0FBQ25GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsMkJBQTJCLG1CQUFPLENBQUMsNENBQU87QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLGFBQWE7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLHVCQUF1QjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixjQUFjO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixtQkFBbUI7QUFDekM7QUFDQTtBQUNBLG9CQUFvQixhQUFhO0FBQ2pDLDRDQUE0QyxJQUFJO0FBQ2hEO0FBQ0E7QUFDQSx3QkFBd0IsT0FBTztBQUMvQjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZLDhEQUE4RDtBQUMxRSxZQUFZLFFBQVE7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzREFBc0QsTUFBTTtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdGQUF3Rix5REFBeUQsOERBQThELDhEQUE4RDtBQUM3UTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLGlDQUFpQztBQUNqRSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2VsZWN0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9yZWFjdC1wbGF5ZXIvbGliL1ByZXZpZXcuanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fY3JlYXRlID0gT2JqZWN0LmNyZWF0ZTtcbnZhciBfX2RlZlByb3AgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG52YXIgX19nZXRPd25Qcm9wRGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG52YXIgX19nZXRPd25Qcm9wTmFtZXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcztcbnZhciBfX2dldFByb3RvT2YgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG52YXIgX19oYXNPd25Qcm9wID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBfX2RlZk5vcm1hbFByb3AgPSAob2JqLCBrZXksIHZhbHVlKSA9PiBrZXkgaW4gb2JqID8gX19kZWZQcm9wKG9iaiwga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUsIHZhbHVlIH0pIDogb2JqW2tleV0gPSB2YWx1ZTtcbnZhciBfX2V4cG9ydCA9ICh0YXJnZXQsIGFsbCkgPT4ge1xuICBmb3IgKHZhciBuYW1lIGluIGFsbClcbiAgICBfX2RlZlByb3AodGFyZ2V0LCBuYW1lLCB7IGdldDogYWxsW25hbWVdLCBlbnVtZXJhYmxlOiB0cnVlIH0pO1xufTtcbnZhciBfX2NvcHlQcm9wcyA9ICh0bywgZnJvbSwgZXhjZXB0LCBkZXNjKSA9PiB7XG4gIGlmIChmcm9tICYmIHR5cGVvZiBmcm9tID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBmcm9tID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBmb3IgKGxldCBrZXkgb2YgX19nZXRPd25Qcm9wTmFtZXMoZnJvbSkpXG4gICAgICBpZiAoIV9faGFzT3duUHJvcC5jYWxsKHRvLCBrZXkpICYmIGtleSAhPT0gZXhjZXB0KVxuICAgICAgICBfX2RlZlByb3AodG8sIGtleSwgeyBnZXQ6ICgpID0+IGZyb21ba2V5XSwgZW51bWVyYWJsZTogIShkZXNjID0gX19nZXRPd25Qcm9wRGVzYyhmcm9tLCBrZXkpKSB8fCBkZXNjLmVudW1lcmFibGUgfSk7XG4gIH1cbiAgcmV0dXJuIHRvO1xufTtcbnZhciBfX3RvRVNNID0gKG1vZCwgaXNOb2RlTW9kZSwgdGFyZ2V0KSA9PiAodGFyZ2V0ID0gbW9kICE9IG51bGwgPyBfX2NyZWF0ZShfX2dldFByb3RvT2YobW9kKSkgOiB7fSwgX19jb3B5UHJvcHMoXG4gIC8vIElmIHRoZSBpbXBvcnRlciBpcyBpbiBub2RlIGNvbXBhdGliaWxpdHkgbW9kZSBvciB0aGlzIGlzIG5vdCBhbiBFU01cbiAgLy8gZmlsZSB0aGF0IGhhcyBiZWVuIGNvbnZlcnRlZCB0byBhIENvbW1vbkpTIGZpbGUgdXNpbmcgYSBCYWJlbC1cbiAgLy8gY29tcGF0aWJsZSB0cmFuc2Zvcm0gKGkuZS4gXCJfX2VzTW9kdWxlXCIgaGFzIG5vdCBiZWVuIHNldCksIHRoZW4gc2V0XG4gIC8vIFwiZGVmYXVsdFwiIHRvIHRoZSBDb21tb25KUyBcIm1vZHVsZS5leHBvcnRzXCIgZm9yIG5vZGUgY29tcGF0aWJpbGl0eS5cbiAgaXNOb2RlTW9kZSB8fCAhbW9kIHx8ICFtb2QuX19lc01vZHVsZSA/IF9fZGVmUHJvcCh0YXJnZXQsIFwiZGVmYXVsdFwiLCB7IHZhbHVlOiBtb2QsIGVudW1lcmFibGU6IHRydWUgfSkgOiB0YXJnZXQsXG4gIG1vZFxuKSk7XG52YXIgX190b0NvbW1vbkpTID0gKG1vZCkgPT4gX19jb3B5UHJvcHMoX19kZWZQcm9wKHt9LCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KSwgbW9kKTtcbnZhciBfX3B1YmxpY0ZpZWxkID0gKG9iaiwga2V5LCB2YWx1ZSkgPT4ge1xuICBfX2RlZk5vcm1hbFByb3Aob2JqLCB0eXBlb2Yga2V5ICE9PSBcInN5bWJvbFwiID8ga2V5ICsgXCJcIiA6IGtleSwgdmFsdWUpO1xuICByZXR1cm4gdmFsdWU7XG59O1xudmFyIFByZXZpZXdfZXhwb3J0cyA9IHt9O1xuX19leHBvcnQoUHJldmlld19leHBvcnRzLCB7XG4gIGRlZmF1bHQ6ICgpID0+IFByZXZpZXdcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBfX3RvQ29tbW9uSlMoUHJldmlld19leHBvcnRzKTtcbnZhciBpbXBvcnRfcmVhY3QgPSBfX3RvRVNNKHJlcXVpcmUoXCJyZWFjdFwiKSk7XG5jb25zdCBJQ09OX1NJWkUgPSBcIjY0cHhcIjtcbmNvbnN0IGNhY2hlID0ge307XG5jbGFzcyBQcmV2aWV3IGV4dGVuZHMgaW1wb3J0X3JlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgX19wdWJsaWNGaWVsZCh0aGlzLCBcIm1vdW50ZWRcIiwgZmFsc2UpO1xuICAgIF9fcHVibGljRmllbGQodGhpcywgXCJzdGF0ZVwiLCB7XG4gICAgICBpbWFnZTogbnVsbFxuICAgIH0pO1xuICAgIF9fcHVibGljRmllbGQodGhpcywgXCJoYW5kbGVLZXlQcmVzc1wiLCAoZSkgPT4ge1xuICAgICAgaWYgKGUua2V5ID09PSBcIkVudGVyXCIgfHwgZS5rZXkgPT09IFwiIFwiKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25DbGljaygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMubW91bnRlZCA9IHRydWU7XG4gICAgdGhpcy5mZXRjaEltYWdlKHRoaXMucHJvcHMpO1xuICB9XG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICBjb25zdCB7IHVybCwgbGlnaHQgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKHByZXZQcm9wcy51cmwgIT09IHVybCB8fCBwcmV2UHJvcHMubGlnaHQgIT09IGxpZ2h0KSB7XG4gICAgICB0aGlzLmZldGNoSW1hZ2UodGhpcy5wcm9wcyk7XG4gICAgfVxuICB9XG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHRoaXMubW91bnRlZCA9IGZhbHNlO1xuICB9XG4gIGZldGNoSW1hZ2UoeyB1cmwsIGxpZ2h0LCBvRW1iZWRVcmwgfSkge1xuICAgIGlmIChpbXBvcnRfcmVhY3QuZGVmYXVsdC5pc1ZhbGlkRWxlbWVudChsaWdodCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBsaWdodCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGltYWdlOiBsaWdodCB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGNhY2hlW3VybF0pIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBpbWFnZTogY2FjaGVbdXJsXSB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGltYWdlOiBudWxsIH0pO1xuICAgIHJldHVybiB3aW5kb3cuZmV0Y2gob0VtYmVkVXJsLnJlcGxhY2UoXCJ7dXJsfVwiLCB1cmwpKS50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICBpZiAoZGF0YS50aHVtYm5haWxfdXJsICYmIHRoaXMubW91bnRlZCkge1xuICAgICAgICBjb25zdCBpbWFnZSA9IGRhdGEudGh1bWJuYWlsX3VybC5yZXBsYWNlKFwiaGVpZ2h0PTEwMFwiLCBcImhlaWdodD00ODBcIikucmVwbGFjZShcIi1kXzI5NXgxNjZcIiwgXCItZF82NDBcIik7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBpbWFnZSB9KTtcbiAgICAgICAgY2FjaGVbdXJsXSA9IGltYWdlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGxpZ2h0LCBvbkNsaWNrLCBwbGF5SWNvbiwgcHJldmlld1RhYkluZGV4LCBwcmV2aWV3QXJpYUxhYmVsIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgaW1hZ2UgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgaXNFbGVtZW50ID0gaW1wb3J0X3JlYWN0LmRlZmF1bHQuaXNWYWxpZEVsZW1lbnQobGlnaHQpO1xuICAgIGNvbnN0IGZsZXhDZW50ZXIgPSB7XG4gICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgIGFsaWduSXRlbXM6IFwiY2VudGVyXCIsXG4gICAgICBqdXN0aWZ5Q29udGVudDogXCJjZW50ZXJcIlxuICAgIH07XG4gICAgY29uc3Qgc3R5bGVzID0ge1xuICAgICAgcHJldmlldzoge1xuICAgICAgICB3aWR0aDogXCIxMDAlXCIsXG4gICAgICAgIGhlaWdodDogXCIxMDAlXCIsXG4gICAgICAgIGJhY2tncm91bmRJbWFnZTogaW1hZ2UgJiYgIWlzRWxlbWVudCA/IGB1cmwoJHtpbWFnZX0pYCA6IHZvaWQgMCxcbiAgICAgICAgYmFja2dyb3VuZFNpemU6IFwiY292ZXJcIixcbiAgICAgICAgYmFja2dyb3VuZFBvc2l0aW9uOiBcImNlbnRlclwiLFxuICAgICAgICBjdXJzb3I6IFwicG9pbnRlclwiLFxuICAgICAgICAuLi5mbGV4Q2VudGVyXG4gICAgICB9LFxuICAgICAgc2hhZG93OiB7XG4gICAgICAgIGJhY2tncm91bmQ6IFwicmFkaWFsLWdyYWRpZW50KHJnYigwLCAwLCAwLCAwLjMpLCByZ2JhKDAsIDAsIDAsIDApIDYwJSlcIixcbiAgICAgICAgYm9yZGVyUmFkaXVzOiBJQ09OX1NJWkUsXG4gICAgICAgIHdpZHRoOiBJQ09OX1NJWkUsXG4gICAgICAgIGhlaWdodDogSUNPTl9TSVpFLFxuICAgICAgICBwb3NpdGlvbjogaXNFbGVtZW50ID8gXCJhYnNvbHV0ZVwiIDogdm9pZCAwLFxuICAgICAgICAuLi5mbGV4Q2VudGVyXG4gICAgICB9LFxuICAgICAgcGxheUljb246IHtcbiAgICAgICAgYm9yZGVyU3R5bGU6IFwic29saWRcIixcbiAgICAgICAgYm9yZGVyV2lkdGg6IFwiMTZweCAwIDE2cHggMjZweFwiLFxuICAgICAgICBib3JkZXJDb2xvcjogXCJ0cmFuc3BhcmVudCB0cmFuc3BhcmVudCB0cmFuc3BhcmVudCB3aGl0ZVwiLFxuICAgICAgICBtYXJnaW5MZWZ0OiBcIjdweFwiXG4gICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBkZWZhdWx0UGxheUljb24gPSAvKiBAX19QVVJFX18gKi8gaW1wb3J0X3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiBzdHlsZXMuc2hhZG93LCBjbGFzc05hbWU6IFwicmVhY3QtcGxheWVyX19zaGFkb3dcIiB9LCAvKiBAX19QVVJFX18gKi8gaW1wb3J0X3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiBzdHlsZXMucGxheUljb24sIGNsYXNzTmFtZTogXCJyZWFjdC1wbGF5ZXJfX3BsYXktaWNvblwiIH0pKTtcbiAgICByZXR1cm4gLyogQF9fUFVSRV9fICovIGltcG9ydF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICBcImRpdlwiLFxuICAgICAge1xuICAgICAgICBzdHlsZTogc3R5bGVzLnByZXZpZXcsXG4gICAgICAgIGNsYXNzTmFtZTogXCJyZWFjdC1wbGF5ZXJfX3ByZXZpZXdcIixcbiAgICAgICAgb25DbGljayxcbiAgICAgICAgdGFiSW5kZXg6IHByZXZpZXdUYWJJbmRleCxcbiAgICAgICAgb25LZXlQcmVzczogdGhpcy5oYW5kbGVLZXlQcmVzcyxcbiAgICAgICAgLi4ucHJldmlld0FyaWFMYWJlbCA/IHsgXCJhcmlhLWxhYmVsXCI6IHByZXZpZXdBcmlhTGFiZWwgfSA6IHt9XG4gICAgICB9LFxuICAgICAgaXNFbGVtZW50ID8gbGlnaHQgOiBudWxsLFxuICAgICAgcGxheUljb24gfHwgZGVmYXVsdFBsYXlJY29uXG4gICAgKTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9