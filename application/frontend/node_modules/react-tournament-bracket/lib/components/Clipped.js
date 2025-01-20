"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var uuid_1 = require("uuid");
var Clipped = /** @class */ (function (_super) {
    __extends(Clipped, _super);
    function Clipped() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._id = uuid_1.v4();
        return _this;
    }
    Clipped.prototype.render = function () {
        var _id = this._id;
        var _a = this.props, path = _a.path, children = _a.children;
        return (React.createElement("g", null,
            React.createElement("defs", null,
                React.createElement("clipPath", { id: _id }, path)),
            React.createElement("g", { clipPath: "url(#" + _id + ")" }, children)));
    };
    return Clipped;
}(React.PureComponent));
exports.default = Clipped;
;
var RectClipped = /** @class */ (function (_super) {
    __extends(RectClipped, _super);
    function RectClipped() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RectClipped.prototype.render = function () {
        var _a = this.props, x = _a.x, y = _a.y, width = _a.width, height = _a.height, children = _a.children;
        return (React.createElement(Clipped, { path: React.createElement("rect", { x: x, y: y, width: width, height: height }) }, children));
    };
    return RectClipped;
}(React.PureComponent));
exports.RectClipped = RectClipped;
