export declare enum Side {
    HOME = "home",
    VISITOR = "visitor",
}
export declare type ID = string;
export interface SideInfo {
    score?: {
        score: number;
    };
    seed?: {
        displayName: string;
        rank: number;
        sourceGame: Game;
        sourcePool: object;
    };
    team?: {
        id: ID;
        name: string;
    };
}
export interface Game {
    id: ID;
    name: string;
    bracketLabel?: string;
    scheduled: number;
    court?: {
        name: string;
        venue: {
            name: string;
        };
    };
    sides: {
        [side in Side]: SideInfo;
    };
}
