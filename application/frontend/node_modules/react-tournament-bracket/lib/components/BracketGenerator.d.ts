/// <reference types="react" />
import * as React from 'react';
import { CSSProperties } from 'react';
import { BracketProps } from './Bracket';
import { Game } from './model';
/**
 * The default title component used for each bracket, receives the game and the height of the bracket
 */
export declare class BracketTitle extends React.PureComponent<{
    game: Game;
    height: number;
}> {
    render(): JSX.Element;
}
export declare type Diff<T extends string, U extends string> = ({
    [P in T]: P;
} & {
    [P in U]: never;
} & {
    [x: string]: never;
})[T];
export declare type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;
export interface BracketGeneratorProps extends Omit<BracketProps, 'game'> {
    games: Game[];
    titleComponent?: React.ComponentClass<{
        game: Game;
        height: number;
    }>;
    style?: CSSProperties;
}
/**
 * Displays the brackets for some set of games sorted by bracket height
 */
export default class BracketGenerator extends React.Component<BracketGeneratorProps, {
    finals: Array<{
        game: Game;
        height: number;
    }>;
}> {
    static defaultProps: {
        titleComponent: typeof BracketTitle;
    };
    state: {
        finals: {
            game: Game;
            height: number;
        }[];
    };
    componentWillReceiveProps({games}: BracketGeneratorProps): void;
    render(): JSX.Element;
}
