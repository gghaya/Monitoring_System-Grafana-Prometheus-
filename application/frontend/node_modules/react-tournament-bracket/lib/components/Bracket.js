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
var _ = require("underscore");
var winningPathLength_1 = require("../util/winningPathLength");
var BracketGame_1 = require("./BracketGame");
var model_1 = require("./model");
var toBracketGames = function (_a) {
    var GameComponent = _a.GameComponent, game = _a.game, x = _a.x, y = _a.y, gameDimensions = _a.gameDimensions, roundSeparatorWidth = _a.roundSeparatorWidth, round = _a.round, lineInfo = _a.lineInfo, homeOnTop = _a.homeOnTop, rest = __rest(_a, ["GameComponent", "game", "x", "y", "gameDimensions", "roundSeparatorWidth", "round", "lineInfo", "homeOnTop"]);
    var gameWidth = gameDimensions.width, gameHeight = gameDimensions.height;
    var ySep = gameHeight * Math.pow(2, round - 2);
    return [
        React.createElement("g", { key: game.id + "-" + y },
            React.createElement(GameComponent, __assign({}, rest, gameDimensions, { key: game.id, homeOnTop: homeOnTop, game: game, x: x, y: y })))
    ].concat(_.chain(game.sides)
        .map(function (sideInfo, side) { return (__assign({}, sideInfo, { side: side })); })
        // filter to the teams that come from winning other games
        .filter(function (_a) {
        var seed = _a.seed;
        return seed && seed.sourceGame !== null && seed.rank === 1;
    })
        .map(function (_a) {
        var sourceGame = _a.seed.sourceGame, side = _a.side;
        // we put visitor teams on the bottom
        var isTop = side === model_1.Side.HOME ? homeOnTop : !homeOnTop;
        var multiplier = isTop ? -1 : 1;
        var pathInfo = [
            "M" + (x - lineInfo.separation) + " " + (y + gameHeight / 2 + lineInfo.yOffset + multiplier * lineInfo.homeVisitorSpread),
            "H" + (x - (roundSeparatorWidth / 2)),
            "V" + (y + gameHeight / 2 + lineInfo.yOffset + ((ySep / 2) * multiplier)),
            "H" + (x - roundSeparatorWidth + lineInfo.separation)
        ];
        return [
            React.createElement("path", { key: game.id + "-" + side + "-" + y + "-path", d: pathInfo.join(' '), fill: "transparent", stroke: "black" })
        ]
            .concat(toBracketGames(__assign({ GameComponent: GameComponent, game: sourceGame, homeOnTop: homeOnTop,
            lineInfo: lineInfo,
            gameDimensions: gameDimensions,
            roundSeparatorWidth: roundSeparatorWidth, x: x - gameWidth - roundSeparatorWidth, y: y + ((ySep / 2) * multiplier), round: round - 1 }, rest)));
    })
        .flatten(true)
        .value());
};
/**
 * Displays the bracket that culminates in a particular finals game
 */
var Bracket = /** @class */ (function (_super) {
    __extends(Bracket, _super);
    function Bracket() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Bracket.prototype.render = function () {
        var _a = this.props, GameComponent = _a.GameComponent, game = _a.game, gameDimensions = _a.gameDimensions, svgPadding = _a.svgPadding, roundSeparatorWidth = _a.roundSeparatorWidth, homeOnTop = _a.homeOnTop, lineInfo = _a.lineInfo, children = _a.children, rest = __rest(_a, ["GameComponent", "game", "gameDimensions", "svgPadding", "roundSeparatorWidth", "homeOnTop", "lineInfo", "children"]);
        var numRounds = winningPathLength_1.default(game);
        var svgDimensions = {
            height: (gameDimensions.height * Math.pow(2, numRounds - 1)) + svgPadding * 2,
            width: (numRounds * (gameDimensions.width + roundSeparatorWidth)) + svgPadding * 2
        };
        return (React.createElement("svg", __assign({}, svgDimensions),
            React.createElement("g", null, toBracketGames(__assign({ GameComponent: GameComponent,
                gameDimensions: gameDimensions,
                roundSeparatorWidth: roundSeparatorWidth,
                game: game, round: numRounds, homeOnTop: homeOnTop,
                lineInfo: lineInfo, 
                // svgPadding away from the right
                x: svgDimensions.width - svgPadding - gameDimensions.width, 
                // vertically centered first game
                y: (svgDimensions.height / 2) - gameDimensions.height / 2 }, rest)))));
    };
    Bracket.defaultProps = {
        GameComponent: BracketGame_1.default,
        homeOnTop: true,
        gameDimensions: {
            height: 80,
            width: 200
        },
        svgPadding: 20,
        roundSeparatorWidth: 24,
        lineInfo: {
            yOffset: -6,
            separation: 6,
            homeVisitorSpread: 11
        }
    };
    return Bracket;
}(React.Component));
exports.default = Bracket;
