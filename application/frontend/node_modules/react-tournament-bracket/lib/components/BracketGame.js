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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Clipped_1 = require("./Clipped");
var model_1 = require("./model");
var controllable = require("react-controllables");
var _ = require("underscore");
var BracketGame = /** @class */ (function (_super) {
    __extends(BracketGame, _super);
    function BracketGame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BracketGame.prototype.render = function () {
        var _a = this.props, game = _a.game, hoveredTeamId = _a.hoveredTeamId, onHoveredTeamIdChange = _a.onHoveredTeamIdChange, _b = _a.styles, backgroundColor = _b.backgroundColor, hoverBackgroundColor = _b.hoverBackgroundColor, scoreBackground = _b.scoreBackground, winningScoreBackground = _b.winningScoreBackground, teamNameStyle = _b.teamNameStyle, teamScoreStyle = _b.teamScoreStyle, gameNameStyle = _b.gameNameStyle, gameTimeStyle = _b.gameTimeStyle, teamSeparatorStyle = _b.teamSeparatorStyle, homeOnTop = _a.homeOnTop, topText = _a.topText, bottomText = _a.bottomText, rest = __rest(_a, ["game", "hoveredTeamId", "onHoveredTeamIdChange", "styles", "homeOnTop", "topText", "bottomText"]);
        var sides = game.sides;
        var top = sides[homeOnTop ? model_1.Side.HOME : model_1.Side.VISITOR];
        var bottom = sides[homeOnTop ? model_1.Side.VISITOR : model_1.Side.HOME];
        var winnerBackground = (top && bottom && top.score && bottom.score && top.score.score !== bottom.score.score) ?
            (top.score.score > bottom.score.score ?
                React.createElement("rect", { x: "170", y: "12", width: "30", height: "22.5", style: { fill: winningScoreBackground }, rx: "3", ry: "3" }) :
                React.createElement("rect", { x: "170", y: "34.5", width: "30", height: "22.5", style: { fill: winningScoreBackground }, rx: "3", ry: "3" })) :
            null;
        var SideComponent = function (_a) {
            var x = _a.x, y = _a.y, side = _a.side, onHover = _a.onHover;
            var tooltip = side.seed && side.team ? React.createElement("title", null, side.seed.displayName) : null;
            return (React.createElement("g", { onMouseEnter: function () { return onHover(side && side.team ? side.team.id : null); }, onMouseLeave: function () { return onHover(null); } },
                React.createElement("rect", { x: x, y: y, height: 22.5, width: 200, fillOpacity: 0 }, tooltip),
                React.createElement(Clipped_1.RectClipped, { x: x, y: y, height: 22.5, width: 165 },
                    React.createElement("text", { x: x + 5, y: y + 16, style: __assign({}, teamNameStyle, { fontStyle: side.seed && side.seed.sourcePool ? 'italic' : null }) },
                        tooltip,
                        side.team ? side.team.name : (side.seed ? side.seed.displayName : null))),
                React.createElement("text", { x: x + 185, y: y + 16, style: teamScoreStyle, textAnchor: "middle" }, side.score ? side.score.score : null)));
        };
        var topHovered = (top && top.team && top.team.id === hoveredTeamId), bottomHovered = (bottom && bottom.team && bottom.team.id === hoveredTeamId);
        return (React.createElement("svg", __assign({ width: "200", height: "82", viewBox: "0 0 200 82" }, rest),
            React.createElement("text", { x: "100", y: "8", textAnchor: "middle", style: gameTimeStyle }, topText(game)),
            React.createElement("rect", { x: "0", y: "12", width: "200", height: "45", fill: backgroundColor, rx: "3", ry: "3" }),
            React.createElement("rect", { x: "0", y: "12", width: "200", height: "22.5", fill: topHovered ? hoverBackgroundColor : backgroundColor, rx: "3", ry: "3" }),
            React.createElement("rect", { x: "0", y: "34.5", width: "200", height: "22.5", fill: bottomHovered ? hoverBackgroundColor : backgroundColor, rx: "3", ry: "3" }),
            React.createElement("rect", { x: "170", y: "12", width: "30", height: "45", fill: scoreBackground, rx: "3", ry: "3" }),
            winnerBackground,
            top ? (React.createElement(SideComponent, { x: 0, y: 12, side: top, onHover: onHoveredTeamIdChange })) : null,
            bottom ? (React.createElement(SideComponent, { x: 0, y: 34.5, side: bottom, onHover: onHoveredTeamIdChange })) : null,
            React.createElement("line", { x1: "0", y1: "34.5", x2: "200", y2: "34.5", style: teamSeparatorStyle }),
            React.createElement("text", { x: "100", y: "68", textAnchor: "middle", style: gameNameStyle }, bottomText(game))));
    };
    BracketGame.defaultProps = {
        homeOnTop: true,
        hoveredTeamId: null,
        styles: {
            backgroundColor: '#58595e',
            hoverBackgroundColor: '#222',
            scoreBackground: '#787a80',
            winningScoreBackground: '#ff7324',
            teamNameStyle: { fill: '#fff', fontSize: 12, textShadow: '1px 1px 1px #222' },
            teamScoreStyle: { fill: '#23252d', fontSize: 12 },
            gameNameStyle: { fill: '#999', fontSize: 10 },
            gameTimeStyle: { fill: '#999', fontSize: 10 },
            teamSeparatorStyle: { stroke: '#444549', strokeWidth: 1 }
        },
        topText: function (_a) {
            var scheduled = _a.scheduled;
            return new Date(scheduled).toLocaleDateString();
        },
        bottomText: function (_a) {
            var name = _a.name, bracketLabel = _a.bracketLabel;
            return _.compact([name, bracketLabel]).join(' - ');
        }
    };
    return BracketGame;
}(React.PureComponent));
exports.default = controllable(BracketGame, ['hoveredTeamId']);
