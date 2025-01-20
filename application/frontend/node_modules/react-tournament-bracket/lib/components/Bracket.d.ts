/// <reference types="react" />
import * as React from 'react';
import { Game } from './model';
export interface LineInfo {
    yOffset: number;
    separation: number;
    homeVisitorSpread: number;
}
export interface GameComponentProps {
    game: Game;
    x: number;
    y: number;
    homeOnTop: boolean;
}
export declare type GameComponent = React.ComponentType<GameComponentProps>;
export interface BracketProps {
    game: Game;
    GameComponent?: GameComponent;
    homeOnTop?: boolean;
    gameDimensions?: {
        height: number;
        width: number;
    };
    svgPadding?: number;
    roundSeparatorWidth?: number;
    lineInfo?: LineInfo;
}
/**
 * Displays the bracket that culminates in a particular finals game
 */
export default class Bracket extends React.Component<BracketProps> {
    static defaultProps: Partial<BracketProps>;
    render(): JSX.Element;
}
