"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("underscore");
function winningPathLength(game, visited) {
    if (visited === void 0) { visited = {}; }
    if (visited[game.id]) {
        return 0;
    }
    visited[game.id] = true;
    return (1 + (_.keys(game.sides).length > 0 ?
        Math.max.apply(Math, _.map(game.sides, function (_a) {
            var seed = _a.seed;
            return (seed && seed.sourceGame && seed.rank == 1) ?
                winningPathLength(seed.sourceGame, visited) : 0;
        })) :
        0));
}
exports.default = winningPathLength;
;
