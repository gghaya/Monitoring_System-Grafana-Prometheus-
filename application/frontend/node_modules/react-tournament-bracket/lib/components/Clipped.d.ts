/// <reference types="react" />
import * as React from 'react';
export interface ClippedProps {
    path: JSX.Element | Array<JSX.Element>;
}
export default class Clipped extends React.PureComponent<ClippedProps> {
    _id: string;
    render(): JSX.Element;
}
export interface RectClippedProps {
    x: number;
    y: number;
    width: number;
    height: number;
}
export declare class RectClipped extends React.PureComponent<RectClippedProps> {
    render(): JSX.Element;
}
