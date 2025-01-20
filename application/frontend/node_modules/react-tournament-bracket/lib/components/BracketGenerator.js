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
var Bracket_1 = require("./Bracket");
var winningPathLength_1 = require("../util/winningPathLength");
var makeFinals = function (_a) {
    var games = _a.games;
    var isInGroup = (function () {
        var gameIdHash = _.reduce(games, function (_a, memo) {
            var id = _a.id;
            return (__assign({}, memo, (_b = {}, _b[id] = true, _b)));
            var _b;
        }, {});
        return function (id) { return (gameIdHash[id] === true); };
    })();
    var gamesFeedInto = _.map(games, function (game) { return (__assign({}, game, { feedsInto: _.filter(games, function (_a) {
            var id = _a.id, sides = _a.sides;
            return (isInGroup(id) &&
                _.any(sides, function (_a) {
                    var seed = _a.seed;
                    return seed !== null && seed.sourceGame !== null && seed.rank === 1 && seed.sourceGame.id === game.id;
                }));
        }) })); });
    return _.chain(gamesFeedInto)
        // get the games that don't feed into anything else in the group, i.e. finals for this game group
        .filter(function (_a) {
        var feedsInto = _a.feedsInto;
        return feedsInto.length === 0;
    })
        .map(
    // get their heights
    function (game) { return ({
        game: game,
        height: winningPathLength_1.default(game)
    }); })
        // render the tallest bracket first
        .sortBy(function (_a) {
        var height = _a.height;
        return height * -1;
    })
        .value();
};
/**
 * The default title component used for each bracket, receives the game and the height of the bracket
 */
var BracketTitle = /** @class */ (function (_super) {
    __extends(BracketTitle, _super);
    function BracketTitle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BracketTitle.prototype.render = function () {
        var _a = this.props, game = _a.game, height = _a.height;
        return (React.createElement("h3", { style: { textAlign: 'center' } },
            game.bracketLabel || game.name,
            " (",
            height,
            " ",
            height === 1 ? 'round' : 'rounds',
            ")"));
    };
    return BracketTitle;
}(React.PureComponent));
exports.BracketTitle = BracketTitle;
/**
 * Displays the brackets for some set of games sorted by bracket height
 */
var BracketGenerator = /** @class */ (function (_super) {
    __extends(BracketGenerator, _super);
    function BracketGenerator() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            finals: makeFinals({ games: _this.props.games })
        };
        return _this;
    }
    BracketGenerator.prototype.componentWillReceiveProps = function (_a) {
        var games = _a.games;
        if (games !== this.props.games) {
            this.setState({ finals: makeFinals({ games: games }) });
        }
    };
    BracketGenerator.prototype.render = function () {
        var _a = this.props, games = _a.games, TitleComponent = _a.titleComponent, style = _a.style, rest = __rest(_a, ["games", "titleComponent", "style"]);
        var finals = this.state.finals;
        return (React.createElement("div", { style: __assign({ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }, style) }, _.map(finals, function (_a) {
            var game = _a.game, height = _a.height;
            return (React.createElement("div", { key: game.id, style: { textAlign: 'center', flexGrow: 1, maxWidth: '100%' } },
                React.createElement(TitleComponent, { game: game, height: height }),
                React.createElement("div", { style: { maxWidth: '100%', overflow: 'auto', WebkitOverflowScrolling: 'touch' } },
                    React.createElement(Bracket_1.default, __assign({ game: game }, rest)))));
        })));
    };
    BracketGenerator.defaultProps = {
        titleComponent: BracketTitle
    };
    return BracketGenerator;
}(React.Component));
exports.default = BracketGenerator;
