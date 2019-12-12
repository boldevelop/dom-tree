import React from 'react';
import * as node from '../core/node';
import {NodeWrapper} from "./NodeWrapper";
import AddNode from "../components/AddNode";

export class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            nodes: null
        };
    }

    render() {
        const { nodes } = this.state;
        const attrs = [
            {
                name: 'class',
                value: 'container'
            }, {
                name: 'data-type',
                value: 'htmlNode'
            }];
        const aAtrs = [
            {
                name: 'href',
                value: '#'
            }];
        const tNode = node.singleNode('br', []);
        const aNode = node.htmlNode('a', aAtrs, ['this is a link']);
        const mainNode = node.htmlNode('div', attrs, ['some text', tNode, 'another text', aNode]);

        return (mainNode &&
            <main>
                <NodeWrapper node={mainNode}/>
            </main>
        || <AddNode/>);
    }
}
